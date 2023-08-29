# Business-loan-app

Welcome to the Business-loan-app!.

...

## Framework and Dependencies

- React.js
- TailwindCSS
- Node.js
- Express.js
- Prisma
- MySQL
- Docker

## Database Schema

The database schema consists of three main models: User, Data, and Profile.


## Instructions to Run the Code
1.First clone this repo:

```
https://github.com/habeeb-an/Business-loan-app.git
```

2. Navigate to the project directory:
   
```
cd business-loan-app

```

3. Install project dependencies:
   ```
npm install
   ```
4. Set up environment variables:

Create a `.env` file in the project root directory and add the following:
```
DATABASE_URL="mysql://newuser:password@mysql:3306/backendtest"
JWT_SECRET_KEY="your-secret-key"
```

5. Build and run Docker containers:
```
docker-compose up --build
```
or (according to you system setup)
```
docker compose up --build
```
6. In order to setup locally
```
npx nodemon index.js
```
```
npx prisma migrate dev --name init
```
7. Access the API:

The API will be available at `http://localhost:3000/api`.

## API Endpoints

- POST `/api/
- GET `/api/
- UPDATE `/api/
- DELETE `/api/

## Contributing

welcome contributions from the community! If you'd like to contribute, please fork the repository, make your changes, and submit a pull request.




