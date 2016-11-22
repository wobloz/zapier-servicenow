// We can roll up all our behaviors in an App.
const incident = require('./triggers/incident');
const record = require('./triggers/record');
const table = require('./resources/table');

const authentication = {
	type: 'basic',

	test: {
	    url: 'https://{{bundle.authData.instance}}/api/now/table/incident?sysparm_limit=1'
	},

    fields: [
        {
            key: 'instance',
            label: 'ServiceNow Instance Host',
            helpText: 'Enter a host name of your ServiceNow instance. E.g. acme.service-now.com',
            type: 'string',
            required: true
        },
        {
            key: 'username',
            label: 'Username',
            helpText: 'ServiceNow user account with sufficient privileges to read ServiceNow meta-data.',
            type: 'string',
            required: true
        },
        {
            key: 'password',
            label: 'Password',
            type: 'password',
            required: true
        }
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
      [table.key]: table
  },

  // If you want your trigger to show up, you better include it here!
  triggers: {
      [incident.key]: incident,
      [record.key]: record
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
