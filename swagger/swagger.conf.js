const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Llm Service',
            version: '1.0.0',
            description: 'Large Language Model Service. Questionaries and skills matchs'            
        },
        servers: [
            { url: '/api'}
        ]
    },

    apis: ['./routes/*.js'],
}

export default swaggerOptions;