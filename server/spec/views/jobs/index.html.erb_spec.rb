require 'spec_helper'

describe "jobs/index.html.erb" do
  before(:each) do
    assign(:jobs, [
      stub_model(Job,
        :pipeline => "",
        :status => "Status"
      ),
      stub_model(Job,
        :pipeline => "",
        :status => "Status"
      )
    ])
  end

  it "renders a list of jobs" do
    render
    rendered.should have_selector("tr>td", :content => "".to_s, :count => 2)
    rendered.should have_selector("tr>td", :content => "Status".to_s, :count => 2)
  end
end
