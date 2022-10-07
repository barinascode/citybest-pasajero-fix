export interface DocumentTypeEntity { 
    id:string;
    _id:string;
    name:string
    type:string;
    min_length:string;
    max_length:string;
    country_document?: string
}

/*
    Lista de tipos de documentos permitidos
*/
export const AppDocumentTypes:DocumentTypeEntity[] = [


    /* Colombia */
    {
        "id":"CC",
        "_id":"CC",
        "name":"C.C",
        "type":"number",
        "min_length":"5",
        "max_length":"20",
        "country_document":"CO"
    },
    {
        "id":"CE",
        "_id":"CE",
        "name":"C.E",
        "type":"number",
        "min_length":"5",
        "max_length":"20",
        "country_document":"CO"
    },
    {
        "id":"NIT",
        "_id":"NIT",
        "name":"NIT",
        "type":"number",
        "min_length":"5",
        "max_length":"20",
        "country_document":"CO"
    },


    /* Peru */
    {
        "id":"CC",
        "_id":"CC",
        "name":"DNI",
        "type":"number",
        "min_length":"5",
        "max_length":"20",
        "country_document":"PE"
    },


    /* Chile */
    {
        "id":"CC",
        "_id":"CC",
        "name":"RUN",
        "type":"number",
        "min_length":"5",
        "max_length":"20",
        "country_document":"CL"
    },


    /* Uruguay */
    {
        "id":"CC",
        "_id":"CC",
        "name":"D.N.I.C",
        "type":"number",
        "min_length":"5",
        "max_length":"20",
        "country_document":"UY"
    },


    /* Argentina */
    {
        "id":"CC",
        "_id":"CC",
        "name":"DNI",
        "type":"number",
        "min_length":"5",
        "max_length":"20",
        "country_document":"AR"
    },


    /* Mexico */
    {
        "id":"CC",
        "_id":"CC",
        "name":"CURP",
        "type":"number",
        "min_length":"5",
        "max_length":"20",
        "country_document":"MX"
    },

    /* Opcion para otro tipo de documento */
    {
    "id":"otro",
    "_id":"Otro",
    "name":"Otro",
    "type":"number",
    "min_length":"5",
    "max_length":"20",
    },
]