module.exports = {
    symptoms: {
    sid: 32133,
    cName: 'Abdominal Pain',
    desc: "Pain in the area of the abdomen",
    scale: {
        unit: 'relative',
        values: [0, 1, 2, 3, 4, 5]
    }
},
    mapdsm: {
        sid: {
            path: "sid",
            type: "number",
            editable: false
        },
        unit: {
            path: "scale.unit",
            type: "string",
            editable: true,
            validations: [{isValid:function(value){return value == "relative" || value == "absolute"}, msg: "unknown scale"}]
        }
    }
}