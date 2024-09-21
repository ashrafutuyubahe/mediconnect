

const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0', 
    info: {
      title: "Mediconnect's Swagger UI ", 
      version: '1.0.0', 
      description: 'API documentation for Mediconnect application',
    },
    servers: [
      {
        url: 'http://localhost:3000', 
        description: 'Local server',
      },
      
    ],
    components: {
      securitySchemes: {
        bearerAuth: { 
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Enter JWT token in the format **Bearer &lt;token&gt;**',
        },
      },
      schemas: {
        

        Appointment: {
          type: 'object',
          description: 'Represents an appointment between a user and a provider.',
          required: ['date', 'time', 'provider', 'user'],
          properties: {
            id: {
              type: 'string',
              description: 'Unique identifier for the appointment.',
              example: '60d21b4667d0d8992e610c85',
            },
            date: {
              type: 'string',
              format: 'date-time',
              description: 'The date and time of the appointment.',
              example: '2023-08-24T14:30:00Z',
            },
            time: {
              type: 'string',
              description: 'The time of the appointment.',
              example: '14:30',
            },
            provider: {
              type: 'string',
              description: 'Name of the service provider.',
              example: 'Dr. John Doe',
            },
            user: {
              type: 'string',
              description: 'The ID of the user who booked the appointment.',
              example: '60d21b4967d0d8992e610c86',
              // If you have a User schema defined, uncomment the line below to reference it
              // $ref: '#/components/schemas/User',
            },
          },
          example: {
            id: '60d21b4667d0d8992e610c85',
            date: '2023-08-24T14:30:00Z',
            time: '14:30',
            provider: 'Dr. John Doe',
            user: '60d21b4967d0d8992e610c86',
          },
        },

        // Example User schema (Uncomment and customize if needed)
        /*
        User: {
          type: 'object',
          description: 'Represents a user in the system.',
          required: ['username', 'email', 'password'],
          properties: {
            id: {
              type: 'string',
              description: 'Unique identifier for the user.',
              example: '60d21b4967d0d8992e610c86',
            },
            username: {
              type: 'string',
              description: 'Username of the user.',
              example: 'johndoe',
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Email address of the user.',
              example: 'johndoe@example.com',
            },
            password: {
              type: 'string',
              format: 'password',
              description: 'Password for the user account.',
              example: 'StrongP@ssw0rd',
            },
          },
          example: {
            id: '60d21b4967d0d8992e610c86',
            username: 'johndoe',
            email: 'johndoe@example.com',
            password: 'StrongP@ssw0rd',
          },
        },
        */

        
      },
    },
    security: [
      {
        bearerAuth: [], 
      },
    ],
  },
 
  apis: ['./routes/*.js', './controllers/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
