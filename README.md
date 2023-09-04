# Business-loan-app

Welcome to the Business-loan-app!.
This project aims to develop a straightforward yet functional Business Loan Application System consisting of both frontend and backend components. The primary objective is to provide users with a seamless experience when applying for a business loan. The system integrates with third-party providers , specifically a Decision Engine and Accounting Software providers(Xero and MYOB), to facilitate the loan application process.

## Framework and Dependencies

- React.js
- TailwindCSS
- Node.js
- Express.js
- Prisma
- MySQL
- Docker
  
## API integration
- Xero
- MYOB (simulaiton)

## Auth workflow
Oauth2


## Instructions to Run the Code
1.First clone this repo:

```
https://github.com/habeeb-an/Business-loan-app.git
```

2. Install project dependencies:

```
npm install
```
Set XeroClient credentails 
```
  clientId: "###########################################",
  
  clientSecret: "############**********#################",
  
  redirectUris: ["http://localhost:3000/providers/xero/callback"],
```
  
Which can be created by these steps

1. Set Up a Xero Account:

If you don't already have a Xero account, sign up for one at Xero's website. https://developer.xero.com/

2. Create a Xero App:

 Log in to your Xero account and go to the Xero Developer Dashboard.
Create a new app to obtain API keys (OAuth 2.0 Client ID and Client Secret) that will allow your application to access Xero's API.

3. Develop or Configure Your Application:

If you're building a custom application, you'll need to develop it to communicate with Xero's API using the API keys you obtained earlier.
If you're using an integration platform, configure it to connect with Xero using the provided API keys.
at
```
api/lib/integrations/xero.js
```

3. to setup locally

Baceknd setup
```
cd api
npm start
```
Frontend setup

```
cd client
npm run dev
```

4. Build and run Docker containers
```
docker-compose up --build
```
or (according to you system setup)
```
docker compose up --build
```



## Contributing

welcome contributions from the community! If you'd like to contribute, please fork the repository, make your changes, and submit a pull request.




