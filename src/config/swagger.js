const swaggerJsdoc = require("swagger-jsdoc");

const options = {
    definition: {
        info: {
            title: "Income-System",
            version: "1.0.0",
            description:
                "API de CRUD completos para el dearrollo de un Sistema Web de Renta de Productos",
            contact: {
                name: "Brandon Mojica Lopez",
                url: "https://github.com/BrannMojLop",
                email: "brandonmojica95@gmail.com"
            }
        },
        servers: [
            {
                url: "http://localhost:4000",
            },
        ],
    },
    apis: ["./src/documentation/*.yaml"]
};

const swaggerDoc = swaggerJsdoc(options);

export default swaggerDoc;