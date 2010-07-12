// ==========================================================================
// Project:   Slimarray.DataSource
// Copyright: ©2010 Institute for Systems Biology
// ==========================================================================
/*globals Slimarray */

/** @class

  Data source for SLIMarray back end

  @extends SC.DataSource
*/
Slimarray.DataSource = SC.DataSource.extend(
/** @scope Slimarray.DataSource.prototype */ {

  // ..........................................................
  // QUERY SUPPORT
  // 

  fetch: function(store, query) {

    if (query === Slimarray.SCHEMES_QUERY) {
	  SC.Request.getUrl('/slimarray/naming_schemes?with=project_ids&populated_only=yes').header({
		'Accept': 'application/json'
	  	}).json().notify(this, 'didFetchSchemes', store, query).send();
      return YES;
	} else if(query === Slimarray.LAB_GROUPS_QUERY) {
	  SC.Request.getUrl('/slimarray/lab_groups?with=project_ids&populated_only=yes')
	    .header({'Accept': 'application/json'}).json()
	  	.notify(this, 'didFetchLabGroups', store, query)
		.send();
	  return YES;	
	} else if(query === Slimarray.PROJECTS_QUERY) {
	  SC.Request.getUrl('/slimarray/projects').header({'Accept': 'application/json'}).json()
	  	.notify(this, 'didFetchProjects', store, query)
		.send();
	  return YES;
	} else if(query.recordType === Slimarray.Microarray) {
	  var parameters = query.get('parameters');

	  var url = '/slimarray/microarrays' + 
	    '?with=scheme,lab_group,project,chip_name,schemed_descriptors,raw_data_path,array_number'
	  if(parameters.scheme !== undefined) {
	  	if(parameters.scheme === null) url += '&naming_scheme_id=nil'
		else url += '&naming_scheme_id=' + parameters.scheme.get('id')
	  }
	  if(parameters.labGroup !== undefined) {
		url += '&lab_group_id=' + parameters.labGroup.get('id');
	  }
	  url += '&project_id=' + parameters.project.get('id');
				  
	  var scheme_id;	
	  if(parameters.scheme) scheme_id = parameters.scheme.get('id');
	  else scheme_id = 'nil';


	  SC.Request.getUrl(url).header({'Accept': 'application/json'}).json()
	  	.notify(this, 'didFetchMicroarrays', store, query)
		.send();
	  return YES;			
	}

    return NO ; // return YES if you handled the query
  },

  didFetchSchemes: function(response, store, query) {
  	if(SC.ok(response)) {
	  store.loadRecords(Slimarray.Scheme, response.get('body'));
	  store.dataSourceDidFetchQuery(query);
	  
	} else store.dataSourceDidErrorQuery(query, response);	
  },
  
  didFetchLabGroups: function(response, store, query) {
  	if(SC.ok(response)) {
	  store.loadRecords(Slimarray.LabGroup, response.get('body'));
	  store.dataSourceDidFetchQuery(query);
	  
	} else store.dataSourceDidErrorQuery(query, response);	
  },
  
  didFetchProjects: function(response, store, query) {
  	if(SC.ok(response)) {
	  store.loadRecords(Slimarray.Project, response.get('body'));
	  store.dataSourceDidFetchQuery(query);
	  
	} else store.dataSourceDidErrorQuery(query, response);	
  },
  
  didFetchMicroarrays: function(response, store, query) {
  	if(SC.ok(response)) {
	  store.loadRecords(Slimarray.Microarray, response.get('body'));
	  store.dataSourceDidFetchQuery(query);
	  
	} else store.dataSourceDidErrorQuery(query, response);	
  },
  
  // ..........................................................
  // RECORD SUPPORT
  // 
  
  retrieveRecord: function(store, storeKey) {
    
    // TODO: Add handlers to retrieve an individual record's contents
    // call store.dataSourceDidComplete(storeKey) when done.
    
    return NO ; // return YES if you handled the storeKey
  },
  
  createRecord: function(store, storeKey) {
    
    // TODO: Add handlers to submit new records to the data source.
    // call store.dataSourceDidComplete(storeKey) when done.
    
    return NO ; // return YES if you handled the storeKey
  },
  
  updateRecord: function(store, storeKey) {
    
    // TODO: Add handlers to submit modified record to the data source
    // call store.dataSourceDidComplete(storeKey) when done.

    return NO ; // return YES if you handled the storeKey
  },
  
  destroyRecord: function(store, storeKey) {
    
    // TODO: Add handlers to destroy records on the data source.
    // call store.dataSourceDidDestroy(storeKey) when done
    
    return NO ; // return YES if you handled the storeKey
  }
  
}) ;
