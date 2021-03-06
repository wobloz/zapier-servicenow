'use strict';

const listIncidents = (z, bundle) => {
    const promise = z.request({
        url: 'https://{{bundle.authData.instance}}/api/now/table/incident',
        params: {
            sysparm_query: '{{bundle.inputData.query}}^ORDERBYDESCsys_created_on',
            sysparm_display_value: true,
            sysparm_exclude_reference_link: true,
            sysparm_limit: 100
        }
    });
    return promise.then((response) => {
        let body = response.json;
        let result = body.result;
        for (let record of result) {
            record.id = record['sys_id'];
        }
        return result;
    });
};

module.exports = {
    key: 'incident',
    noun: 'Incident',
    display: {
        label: 'New Incident',
        description: 'Trigger when a new incident is created.',
        order: 100,
    },
    operation: {
        inputFields: [
            {
                key: 'query',
                label: 'Encoded Query',
                helpText: 'Filter the incidents by using the query expression',
                type: 'string',
                required: false
            }
        ],
        perform: listIncidents,
    }
};