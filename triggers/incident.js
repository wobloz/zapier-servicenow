/**
 * http://usejsdoc.org/
 */
const listIncidents = (z, bundle) => {
  z.console.log('hello from a console log!');
  const promise = z.request('https://{{bundle.authData.instance}}.service-now.com/api/now/table/incident');
  return promise.then((response) => response.json);
};

module.exports = {
  key: 'incident',
  noun: 'Incident',
  display: {
    label: 'New Incident',
    description: 'Trigger when a new incident is created.'
  },
  operation: {
    perform: listIncidents
  }
};