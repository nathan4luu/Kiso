# EduCards

PostrgreSQL/Express.js/Reactjs/Nodejs app designed to create flashcards to study with.

### Running locally

The development server for the frontend (client) can be started with the following command:

```bash
    cd client
    npm start
```

The development server for the backend (server) can be started with the following command:

```bash
    cd client
    npm start
```

### Database

The app uses a Postgres database hosted on [supabase.com](https://supabase.com/). Edits to the database schema can be made in /server/prisma/schema.prisma. Additional info on Primsa syntax can be found [here](https://www.prisma.io/docs/orm/prisma-schema).

#### Setup

Initialize a .env file in the server directory with the required values.

#### General usage

If you need to run migrations, you can do so with the following command:

```bash
    cd server (if not currently in server directory)
    npm run db:migrate
```

If you need to inspect the databse, you can do so with the following command:

```bash
    cd server (if not currently in server directory)
    npm run db:studio
```

