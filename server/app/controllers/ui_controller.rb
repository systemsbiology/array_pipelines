class UiController < ApplicationController
  before_filter CASClient::Frameworks::Rails::Filter
  layout nil

  APP_CONFIG["pipelines"].each do |pipeline|
    define_method pipeline do
      slimarray_refreshed = cookies[:slimarray_refreshed]

      if slimarray_refreshed && slimarray_refreshed == "Yes"
        cookies[:slimarray_refreshed] = "No"
        render :file => [RAILS_ROOT, "public", "ui", pipeline + ".html"].join("/")
      else
        redirect_to "/slimarray/bounce?destination=#{request.request_uri}" 
      end
    end
  end

end
