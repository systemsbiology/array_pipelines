// ==========================================================================
// Project:   Slimarray.LegendView
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Slimarray */

/** @class

  (Document Your View Here)

  @extends SC.View
*/
Slimarray.LegendView = SC.View.extend(SC.Border,
/** @scope Slimarray.LegendView.prototype */ {

  classNames: ['array-legend'],
  
  layout: { top: 10, left: 280, width: 400, height: 26 },
  
  childViews: 'affyIcon affyLabel agilentIcon agilentLabel exiqonIcon exiqonLabel'.w(),
  
  affyIcon: SC.ImageView.design({
  	layout: { top: 4, left: 24},
  	
	value: 'icon-affymetrix-16'
  }),
  
  affyLabel: SC.LabelView.design({
  	layout: { top: 4, left: 46 },
	value: 'Affymetrix'
  }),
  
  agilentIcon: SC.ImageView.design({
  	layout: { top: 4, left: 170},
  	
	value: 'icon-agilent-16'
  }),
  
  agilentLabel: SC.LabelView.design({
  	layout: { top: 4, left: 192 },
	value: 'Agilent'
  }),
  
  exiqonIcon: SC.ImageView.design({
  	layout: { top: 4, left: 320},
  	
	value: 'icon-exiqon-16'
  }),
  
  exiqonLabel: SC.LabelView.design({
  	layout: { top: 4, left: 342 },
	value: 'Exiqon'
  }),

});
