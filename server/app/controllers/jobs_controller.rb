require 'casclient/frameworks/rails/filter'

class JobsController < ApplicationController
  before_filter CASClient::Frameworks::Rails::Filter
  
  # GET /jobs/1
  # GET /jobs/1.xml
  # GET /jobs/1.json
  def show
    @job = Job.find(params[:id]).check_status

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @job }
      format.json  { render :json => @job.to_json(:only => :id, :methods => [:status, :output, :message]) }
    end
  end

  # POST /jobs
  # POST /jobs.xml
  # POST /jobs.json
  def create
    @job = Job.new( params[:job].merge({:user => session[:cas_user]}) )

    respond_to do |format|
      if @job.save
        format.html { redirect_to(@job, :notice => 'Job was successfully created.') }
        format.xml  { render :xml => @job, :status => :created, :location => @job }
        format.json  { render :json => @job.to_json(:only => :id), :status => :created, :location => @job }
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @job.errors, :status => :unprocessable_entity }
        format.json  { render :json => @job.errors, :status => :unprocessable_entity }
      end
    end
  end

end
