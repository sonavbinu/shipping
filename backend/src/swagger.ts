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
        url: process.env.BASE_URI || 'https://shipping-4.onrender.com',
        description: 'API Server',
      },
    ],
  },
  apis: ['./dist/routes/*.js'], // Point to compiled JS files
};

export const swaggerSpec = swaggerJSDoc(options);
