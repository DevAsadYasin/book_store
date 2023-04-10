# Book Store App - Nest.js

This is a Book Store application built with Nest.js, Prisma, PostrgreSQL and RabbitMQ for logging messages.

## Installation

1. Clone this project

2. Install the dependencies:
```cd book-store```

```npm install```

3. Set Up the Docker:

   Make sure you have a docker installed in you system.
  
  Run command: ``` docker-compose up```

4. Migrate the Database:
``` npm run prisma:migrate ```

5. Add Seed data:
``` npm run prisma:seed ```

6. Start the server:
``` npm run start ```
