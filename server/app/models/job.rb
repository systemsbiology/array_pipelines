class Job < ActiveRecord::Base
  attr_accessor :pipeline, :microarrays, :status, :output, :message, :project_id, :login, :email

  def save
    begin
      submission_uri = [APP_CONFIG['script_execution_uri'], pipeline, "jobs"].join("/")

      script_resource = RestClient::Resource.new submission_uri,
        :headers => {'x-addama-apikey' => APP_CONFIG['api_key']}, :timeout => 20

      job_info = {
        :login => login,
        :email => email,
        :project_id => project_id,
        :microarrays => microarrays
      }

      logger.info "Sending #{job_info.to_json} to #{submission_uri} with API KEY #{APP_CONFIG['api_key']}"
      response = nil
      run_with_retries do
        response = script_resource.post job_info.to_json
      end

      parsed_response = JSON.parse(response)
      self.job_uri = parsed_response['uri']
    rescue RestClient::RequestFailed, RestClient::ResourceNotFound => e
      logger.error "Failed REST request: #{e.message}"

      return false
    end

    super
  end

  def check_status
    script_resource = RestClient::Resource.new APP_CONFIG['script_execution_host'] + job_uri,
      :headers => {'x-addama-apikey' => APP_CONFIG['api_key']}, :timeout => 20

    logger.info "Querying #{job_uri}"

    response = nil
    run_with_retries do
      response = script_resource.get
    end

    logger.info "Got: #{response}"

    parsed_response = JSON.parse(response)

    self.status = parsed_response['status']
    if status == "completed" && parsed_response['items']
      output_uris = parsed_response['items'].collect{|o| o['uri']}

      # use the first (presumably only) zip file in the outputs
      if zip_uri = output_uris.grep(/\.zip/i).first
        zip_uri = APP_CONFIG['script_execution_host'] + zip_uri
        self.output = get_directlink(zip_uri)
      end

      # lack of a zip file indicates failure
      self.status = "failed" unless zip_uri

      # get any messages left by the script
      self.message = get_message(output_uris)
    end

    return self
  end

  private

  def run_with_retries
    retries = 0

    begin
      yield
    rescue StandardError => e
      # retry closeout a couple of times
      if retries < 3
        retries += 1
        sleep 0.5
        retry
      else
        # after 3 tries, raise the exception
        raise e
      end
    end
  end

  def get_message(output_uris)
    if message_uri = output_uris.grep(/message.log/i).first
      message_resource = RestClient::Resource.new APP_CONFIG['script_execution_host'] + message_uri,
        :headers => {'x-addama-apikey' => APP_CONFIG['api_key']}, :timeout => 20
      return message_resource.get
    end
  end

  def get_directlink(zip_uri)
    directlink_resource = RestClient::Resource.new zip_uri + "/directlink",
      :headers => {'x-addama-apikey' => APP_CONFIG['api_key']}, :timeout => 20
    response = directlink_resource.get

    # quote the keys since the JSON parser likes that
    response.gsub!(/([\{|\,}])\s*([a-zA-Z]+):/, '\1 "\2":')

    return JSON.parse(response)["location"]
  end
end
