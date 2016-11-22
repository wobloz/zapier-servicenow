'use strict';

const listRecords = (z, bundle) => {
    const promise = z.request({
        url: 'https://{{bundle.authData.instance}}/api/now/table/{{bundle.inputData.table}}',
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
    key: 'record',
    noun: 'Record',
    display: {
        label: 'New Record',
        description: 'Triggers when a new record (in the table you choose) is created.',
        order: 10,
    },
    operation: {
        inputFields: [
            {
                key: 'table',
                label: 'ServiceNow Table',
                type: 'string',
                dynamic: 'table.name.label',
                required: true
            },
            {
                key: 'query',
                label: 'Encoded Query',
                helpText: 'Filter the incidents by using the query expression',
                type: 'string',
                required: false
            }
        ],
        perform: listRecords
    }
};