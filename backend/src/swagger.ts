import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Shipping & Delivery API',
      version: '1.0.0',
      description:
        'API for managing shipments, calculating rates, and tracking deliveries',
    },
    servers: [
      {
        url: 'http://localhost:4000',
        description: 'Development Server',
      },
    ],
  },
  apis: ['./dist/routes/*.js'], // Point to compiled JS files
};

export const swaggerSpec = swaggerJSDoc(options);
