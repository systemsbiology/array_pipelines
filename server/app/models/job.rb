class Job < ActiveRecord::Base
  attr_accessor :pipeline, :microarrays, :status, :output, :message, :project_id, :login, :email

  def save
    begin
      submission_uri = [APP_CONFIG['script_execution_uri'], pipeline, "jobs"].join("/")

      script_resource = RestClient::Resource.new submission_uri,
        :headers => {'API_KEY' => APP_CONFIG['api_key']}, :timeout => 20

      job_info = {
        :login => login,
        :email => email,
        :project_id => project_id,
        :microarrays => microarrays
      }

      logger.info "Sending #{job_info.to_json} to #{submission_uri} with API KEY #{APP_CONFIG['api_key']}"
      response = script_resource.post job_info.to_json

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
      :headers => {'API_KEY' => APP_CONFIG['api_key']}, :timeout => 20

    logger.info "Querying #{job_uri}"
    response = script_resource.get
    logger.info "Got: #{response}"

    parsed_response = JSON.parse(response)

    self.status = parsed_response['status']
    if status == "completed" && parsed_response['items']
      output_uris = parsed_response['items'].collect{|o| o['uri']}

      # use the first (presumably only) zip file in the outputs
      if zip_uri = output_uris.grep(/\.zip/i).first
        self.output = APP_CONFIG['script_execution_host'] + zip_uri
      end

      # lack of a zip file indicates failure
      self.status = "failed" unless zip_uri

      # get any messages left by the script
      if message_uri = output_uris.grep(/message.log/i).first
        message_resource = RestClient::Resource.new APP_CONFIG['script_execution_host'] + message_uri,
          :headers => {'API_KEY' => APP_CONFIG['api_key']}, :timeout => 20
        self.message = message_resource.get
      end
    end

    return self
  end
end
