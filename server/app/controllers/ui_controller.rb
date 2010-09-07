class UiController < ApplicationController
  before_filter CASClient::Frameworks::Rails::Filter
  layout nil

  def gene_data
    slimarray_refreshed = cookies[:slimarray_refreshed]

    if slimarray_refreshed && slimarray_refreshed == "Yes"
      cookies[:slimarray_refreshed] = "No"
      render :file => [RAILS_ROOT, "public", "ui", "gene_data.html"].join("/")
    else
      redirect_to "/slimarray/bounce?destination=#{request.request_uri}" 
    end
  end

  def downloader
    slimarray_refreshed = cookies[:slimarray_refreshed]

    if slimarray_refreshed && slimarray_refreshed == "Yes"
      cookies[:slimarray_refreshed] = "No"
      render :file => [RAILS_ROOT, "public", "ui", "downloader.html"].join("/")
    else
      redirect_to "/slimarray/bounce?destination=#{request.request_uri}" 
    end
  end

  def vera_sam
    slimarray_refreshed = cookies[:slimarray_refreshed]

    if slimarray_refreshed && slimarray_refreshed == "Yes"
      cookies[:slimarray_refreshed] = "No"
      render :file => [RAILS_ROOT, "public", "ui", "vera_sam.html"].join("/")
    else
      redirect_to "/slimarray/bounce?destination=#{request.request_uri}" 
    end
  end

  def agilent_one
    slimarray_refreshed = cookies[:slimarray_refreshed]

    if slimarray_refreshed && slimarray_refreshed == "Yes"
      cookies[:slimarray_refreshed] = "No"
      render :file => [RAILS_ROOT, "public", "ui", "agilent_one.html"].join("/")
    else
      redirect_to "/slimarray/bounce?destination=#{request.request_uri}" 
    end
  end

  def chip_analytics 
    slimarray_refreshed = cookies[:slimarray_refreshed]

    if slimarray_refreshed && slimarray_refreshed == "Yes"
      cookies[:slimarray_refreshed] = "No"
      render :file => [RAILS_ROOT, "public", "ui", "chip_analytics.html"].join("/")
    else
      redirect_to "/slimarray/bounce?destination=#{request.request_uri}" 
    end
  end
end
