const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: "Mediconnect's Swagger UI",
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
          description: 'Enter JWT token in the format **Bearer <token>**',
        },
      },
      schemas: {
        // User Schema (Now First)
        User: {
          type: 'object',
          required: ['name', 'email', 'password'],
          properties: {
            id: {
              type: 'string',
              description: 'Unique identifier for the user.',
              example: '60d21b4967d0d8992e610c86',
            },
            name: {
              type: 'string',
              description: 'Name of the user.',
              example: 'Jane Doe',
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Email address of the user.',
              example: 'janedoe@example.com',
            },
            password: {
              type: 'string',
              format: 'password',
              description: 'Password for the user account.',
              example: 'StrongP@ssw0rd',
            },
            paymentMethod: {
              type: 'string',
              description: 'Reference ID to the payment method.',
              example: '60d21b4b67d0d8992e610c88',
            },
          },
          example: {
            id: '60d21b4967d0d8992e610c86',
            name: 'Jane Doe',
            email: 'janedoe@example.com',
            password: 'StrongP@ssw0rd',
            paymentMethod: '60d21b4b67d0d8992e610c88',
          },
        },

        // Ambulance Schema
        Ambulance: {
          type: 'object',
          required: ['licensePlate', 'make', 'model', 'location'],
          properties: {
            id: {
              type: 'string',
              description: 'Unique identifier for the ambulance.',
              example: '60d21b4667d0d8992e610c85',
            },
            licensePlate: {
              type: 'string',
              description: 'The license plate of the ambulance',
              example: 'RAB 123C',
            },
            make: {
              type: 'string',
              description: 'The make of the ambulance',
              example: 'Toyota',
            },
            model: {
              type: 'string',
              description: 'The model of the ambulance',
              example: 'Hiace',
            },
            location: {
              type: 'object',
              properties: {
                type: {
                  type: 'string',
                  enum: ['Point'],
                  description: 'The type of location point',
                },
                coordinates: {
                  type: 'array',
                  items: {
                    type: 'number',
                  },
                  description: 'Coordinates [longitude, latitude]',
                  example: [30.12345, -1.98765],
                },
              },
              required: ['type', 'coordinates'],
            },
          },
          example: {
            id: '60d21b4667d0d8992e610c85',
            licensePlate: 'RAB 123C',
            make: 'Toyota',
            model: 'Hiace',
            location: {
              type: 'Point',
              coordinates: [30.12345, -1.98765],
            },
          },
        },

        // Hospital Schema
        Hospital: {
          type: 'object',
          required: ['name', 'location'],
          properties: {
            id: {
              type: 'string',
              description: 'Unique identifier for the hospital.',
              example: '60d21b4967d0d8992e610c86',
            },
            name: {
              type: 'string',
              description: 'Name of the hospital',
              example: 'City Hospital',
            },
            location: {
              type: 'string',
              description: 'Location/address of the hospital',
              example: '123 Main St, Nairobi, Kenya',
            },
          },
          example: {
            id: '60d21b4967d0d8992e610c86',
            name: 'City Hospital',
            location: '123 Main St, Nairobi, Kenya',
          },
        },

        // Driver Schema
        Driver: {
          type: 'object',
          required: ['name', 'license'],
          properties: {
            id: {
              type: 'string',
              description: 'Unique identifier for the driver.',
              example: '60d21b4a67d0d8992e610c87',
            },
            name: {
              type: 'string',
              description: 'Name of the driver',
              example: 'John Doe',
            },
            license: {
              type: 'string',
              description: "Driver's license number",
              example: 'D1234567',
            },
            ambulance: {
              type: 'string',
              description: 'Reference ID to the assigned ambulance',
              example: '60d21b4667d0d8992e610c85',
            },
          },
          example: {
            id: '60d21b4a67d0d8992e610c87',
            name: 'John Doe',
            license: 'D1234567',
            ambulance: '60d21b4667d0d8992e610c85',
          },
        },

        // Appointment Schema
        Appointment: {
          type: 'object',
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
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
    tags: [
      {
        name: 'Ambulances',
        description: 'Ambulance management',
      },
      {
        name: 'Hospitals',
        description: 'Hospital management',
      },
      {
        name: 'Drivers',
        description: 'Driver management',
      },
      {
        name: 'Appointments',
        description: 'Appointment management',
      },
      {
        name: 'Authentication',
        description: 'User authentication and authorization',
      },
    ],
  },
  apis: [
    './routes/*.js',
    './controllers/*.js',
  ],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
