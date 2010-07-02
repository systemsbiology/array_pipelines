// ==========================================================================
// Project:   GeneData.DataSource
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals GeneData */

/** @class

  (Document Your Data Source Here)

  @extends SC.DataSource
*/
GeneData.DataSource = SC.DataSource.extend(
/** @scope GeneData.DataSource.prototype */ {

  // ..........................................................
  // QUERY SUPPORT
  // 

  fetch: function(store, query) {

    if(query === GeneData.SCHEMES_QUERY) {
	  SC.Request.getUrl('/slimarray/naming_schemes').header({'Accept': 'application/json'}).json()
	  	.notify(this, 'didFetchSchemes', store, query)
		.send();
	  return YES;
	} else if(query === GeneData.PROJECTS_QUERY) {
	  SC.Request.getUrl('/slimarray/projects').header({'Accept': 'application/json'}).json()
	  	.notify(this, 'didFetchProjects', store, query)
		.send();
	  return YES;
	}

    return NO ; // return YES if you handled the query
  },

  didFetchSchemes: function(response, store, query) {
  	if(SC.ok(response)) {
	  store.loadRecords(GeneData.Scheme, response.get('body'));
	  store.dataSourceDidFetchQuery(query);
	  
	} else store.dataSourceDidErrorQuery(query, response);	
  },
  
  didFetchProjects: function(response, store, query) {
  	if(SC.ok(response)) {
	  store.loadRecords(GeneData.Project, response.get('body'));
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
