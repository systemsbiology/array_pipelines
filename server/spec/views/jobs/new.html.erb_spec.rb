require 'spec_helper'

describe "jobs/new.html.erb" do
  before(:each) do
    assign(:job, stub_model(Job,
      :new_record? => true,
      :pipeline => "",
      :status => "MyString"
    ))
  end

  it "renders new job form" do
    render

    rendered.should have_selector("form", :action => jobs_path, :method => "post") do |form|
      form.should have_selector("input#job_pipeline", :name => "job[pipeline]")
      form.should have_selector("input#job_status", :name => "job[status]")
    end
  end
end
