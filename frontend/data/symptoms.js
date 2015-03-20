
var symptoms = {
    /*
    * Tags are used to refer to associate symptoms into meaningful medical categories, such as
    * body regions.
     *
    * They are language specific such that for a selected language only appropriate tags
    * are scanned.
    * */
    tags:[
        {lang: "en", val:"abdomen", symptoms:[32133, 32134]},
        {lang: "en", val:"pain", symptoms:[32133]}
    ],

    synonyms:[
        {sid:32133, synonyms:[{lang: "de", words:"Bauchschmerzen"}]}

    ],

    entries:[
        {
            sid:32133,
            cName: 'Abdominal Pain',
            desc: "Pain in the area of the abdomen",
            scale: {
                unit: 'relative',
                values: [0, 1, 2, 3, 4, 5]
            }
        },
        {
            sid:32134,
            cName: 'Abdominal Irritation',
            scale: {
                unit: 'relative',
                values: [0, 1, 2, 3, 4, 5]
            }
        }
    ]
}

module.exports = symptoms;




