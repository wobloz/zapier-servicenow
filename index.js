// We can roll up all our behaviors in an App.
const incident = require('./triggers/incident');

const authentication = {
	type: 'basic',

	test: {
		url: 'https://{{bundle.authData.instance}}.service-now.com/api/now/table/incident?sysparm_limit=1'
	},
	
	fields: [
	    {key: 'instance', type: 'string', required: true, helpText: 'ServiceNow instance.'},
	]
};


const App = {
  // This is just shorthand to reference the installed dependencies you have.
	// Zapier will
  // need to know these before we can upload
  version: require('./package.json').version,
  platformVersion: require('zapier-platform-core').version,
  
  authentication: authentication,

  // beforeRequest & afterResponse are optional hooks into the provided HTTP
	// client
  beforeRequest: [
  ],

  afterResponse: [
  ],

  // If you want to define optional resources to simplify creation of
	// triggers, searches, creates - do that here!
  resources: {
  },

  // If you want your trigger to show up, you better include it here!
  triggers: {
	  [incident.key]: incident
  },

  // If you want your searches to show up, you better include it here!
  searches: {
  },

  // If you want your creates to show up, you better include it here!
  creates: {
  }
};

// Finally, export the app.
module.exports = App;
