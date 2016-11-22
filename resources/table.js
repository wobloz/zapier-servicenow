'use strict';

// get a list of tables
const listTables = (z) => {
    const promise = z.request({
        url: 'https://{{bundle.authData.instance}}/api/now/table/sys_db_object',
        params: {
            sysparm_query: 'sys_update_nameISNOTEMPTY^ORDERBYname',
            sysparm_fields: 'sys_id,name,label',
        }
    });
    return promise.then((response) => {
        let body = response.json;
        let result = body.result;
        for (let record of result) {
            record.id = record['name'];
        }
        return result;
    });
};


module.exports = {
    key: 'table',
    noun: 'Table',
    list: {
        display: {
            label: 'Table List',
            description: 'Lists all ServiceNow tables.',
            hidden: true
        },
        operation: {
            perform: listTables
        }
    },
    sample: {
        'sys_id': '8ba5dfe20f0122005ebf09bce1050eae',
        'name': 'alm_asset',
        'label': 'Asset'
    }
};
