require 'spec_helper'

describe JobsController do

  def mock_job(stubs={})
    @mock_job ||= mock_model(Job, stubs).as_null_object
  end

  before(:each) do
    session[:cas_user] = "jsmith"
  end

  describe "GET show" do
    it "assigns the requested job as @job" do
      scoped_jobs = mock("Scoped jobs", :find => mock_job)
      Job.should_receive(:where).with(:user => "jsmith").and_return(scoped_jobs)
      get :show, :id => "37"
      assigns(:job).should be(mock_job)
    end
  end

  describe "POST create" do

    describe "with valid params" do
      it "assigns a newly created job as @job" do
        Job.stub(:new).with({'these' => 'params', "user" => "jsmith"}) { mock_job(:save => true) }
        post :create, :job => {'these' => 'params'}
        assigns(:job).should be(mock_job)
      end

      it "redirects to the created job" do
        Job.stub(:new) { mock_job(:save => true) }
        post :create, :job => {}
        response.should redirect_to(job_url(mock_job))
      end
    end

    describe "with invalid params" do
      it "assigns a newly created but unsaved job as @job" do
        Job.stub(:new).with({'these' => 'params', "user" => "jsmith"}) { mock_job(:save => false) }
        post :create, :job => {'these' => 'params'}
        assigns(:job).should be(mock_job)
      end

      it "re-renders the 'new' template" do
        Job.stub(:new) { mock_job(:save => false) }
        post :create, :job => {}
        response.should render_template("new")
      end
    end

  end

end
