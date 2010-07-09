class UiController < ApplicationController
  before_filter CASClient::Frameworks::Rails::Filter

  def gene_data
    #logger.info "bounced: #{params.has_key?(:bounced) ? "Yes" : "No"}"
    #if params.has_key? :bounced
    #  render :file => [RAILS_ROOT, "public", "ui", "gene_data.html"].join("/")
    #else
    #  redirect_to "/slimarray/bounce?destination=#{request.request_uri}" 
    #end

    slimarray_refreshed = cookies[:slimarray_refreshed]
    logger.info "slimarray_refreshed: #{slimarray_refreshed}"
    if slimarray_refreshed && slimarray_refreshed == "Yes"
      cookies[:slimarray_refreshed] = "No"
      render :file => [RAILS_ROOT, "public", "ui", "gene_data.html"].join("/")
    else
      redirect_to "/slimarray/bounce?destination=#{request.request_uri}" 
    end
  end

end
