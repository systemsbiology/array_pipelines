require 'spec_helper'

describe "jobs/edit.html.erb" do
  before(:each) do
    @job = assign(:job, stub_model(Job,
      :new_record? => false,
      :pipeline => "",
      :status => "MyString"
    ))
  end

  it "renders the edit job form" do
    render

    rendered.should have_selector("form", :action => job_path(@job), :method => "post") do |form|
      form.should have_selector("input#job_pipeline", :name => "job[pipeline]")
      form.should have_selector("input#job_status", :name => "job[status]")
    end
  end
end
