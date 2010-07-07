class Job < ActiveRecord::Base
  state_machine :status, :initial => :received do
    event :submit do
      transition :received => :submitted
    end
    
    event :job_fail do
      transition any - :failed => :failed
    end

    before_transition :received => :submitted, :do => :record_start_time
    after_transition any - :complete => [:failed, :complete], :do => :record_end_time
  end
  
  def after_create
    begin
      script_resource = RestClient::Resource.new APP_CONFIG['script_execution_uri'],
        :headers => {'API_KEY' => APP_CONFIG['api_key']}, :timeout => 20
      logger.info "Sending #{@data.to_json} to #{APP_CONFIG['script_execution_uri']}"
      script_resource.post @data.to_json
      submit
    rescue RestClient::RequestFailed => e
      job_fail
    end
  end

  def record_start_time
    start_time = Time.now
  end

  def record_end_time
    end_time = Time.now
  end

  def microarrays=(microarrays)
    @data = Array.new

    microarrays.each do |array|
      @data << {
        'name' => array['name'],
        'chip_name' => array['chip_name'],
        'raw_data_path' => array['raw_data_path'],
        'array_number' => array['array_number'],
        'schemed_descriptors' => array['schemed_descriptors']
      }
    end
  end

end
