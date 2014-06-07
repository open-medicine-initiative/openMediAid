var jselect = require('JSONSelect');

var uimodel={
    types : [
        {element: "string", stereotype:"default", template: "<input type='text' />"}
    
    ],

    fields:[
        {
            jsid: "http://jsonschema.net/address/city",
            target: "#left"
        }
    ]
}

function query(id){
    return ':has(:root > .id:val("' + id + '"))';
}

var schema = {
    "type":"object",
    "$schema": "http://json-schema.org/draft-03/schema",
    "id": "http://jsonschema.net",
    "required":false,
    "properties":{
        "address": {
            "type":"object",
            "id": "http://jsonschema.net/address",
            "required":false,
            "properties":{
                "city": {
                    "type":"string",
                    "id": "http://jsonschema.net/address/city",
                    "required":false
                },
                "streetAddress": {
                    "type":"string",
                    "id": "http://jsonschema.net/address/streetAddress",
                    "required":false
                }
            }
        },
        "phoneNumber": {
            "type":"array",
            "id": "http://jsonschema.net/phoneNumber",
            "required":false,
            "items":
            {
                "type":"object",
                "id": "http://jsonschema.net/phoneNumber/0",
                "required":false,
                "properties":{
                    "number": {
                        "type":"string",
                        "id": "http://jsonschema.net/phoneNumber/0/number",
                        "required":false
                    },
                    "type": {
                        "type":"string",
                        "id": "http://jsonschema.net/phoneNumber/0/type",
                        "required":false
                    }
                }
            }


        }
    }
}

function merge(uimodel, jschema){
   var result={
       types: uimodel.types,
       fields:[]
   }

    for(var i=0; i < uimodel.fields.length; i++){
        var field = uimodel.fields[i];
        result.fields.push({ui: field, schema : jselect.match(query(field.jsid), jschema)});
    }

    return result;
}

var data  = {
    "address":{
        "streetAddress": "21 2nd Street",
        "city":"New York"
    },
    "phoneNumber":
        [
            {
                "type":"home",
                "number":"212 555-1234"
            }
        ]
}

module.exports = function(){return merge(uimodel, schema)};