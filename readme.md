# Cricket API

Developed using **Express.js**, **TypeScript**, and **Firebase Firestore**, this RESTful API empowers you to manage cricket match data, player statistics, and team information. The API integrates Firebase Authentication with role-based authorization, supports comprehensive CRUD operations, rigorous input validation via Joi, and offers complete API documentation using Swagger (OpenAPI).

---

## Project Overview

- **Complete CRUD Functionality:**  
  Manage matches, players, and teams seamlessly.
  
- **Firebase Firestore Integration:**  
  Store and retrieve data using Firestore.
  
- **Firebase Authentication & JWT:**  
  Secure endpoints with Firebase ID tokens validated via JWT. Custom claims enforce role-based access (admin, editor, user).

- **Input Validation:**  
  Rigorous validation implemented with Joi to ensure data integrity.
  
- **Centralized Error Handling:**  
  Errors are managed via dedicated middleware for consistent responses.
  
- **Security Enhancements:**  
  - **CORS:** Configured to enable cross-origin resource sharing.
  - **Helmet:** Applied to secure HTTP headers.
  
- **Swagger/OpenAPI Documentation:**  
  Full API documentation is available through Swagger UI.
  
- **Advanced Filtering Capabilities:**  
  Supports filtering endpoints (e.g., filtering matches by category, players by team).

---

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/prabhkiransingh/Project_Cricket.git

### 2. Install Dependencies
```bash
npm install
```
### 3. Environment Setup
Create a `.env` file:
```
NODE_ENV=development
PORT=7000

FIREBASE_PROJECT_ID=cricket-c5810
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-fbsvc@cricket-c5810.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_CONTENT\n-----END PRIVATE KEY-----\n"

SWAGGER_SERVER_URL=http://localhost:7000/api/v1

```

## Accessing OpenAPI Locally
 
Once app is running, access Swagger UI at:
```
http://localhost:7000/api-docs
```
##  Install Dependencies

npm install

## Production Mode

npm run build
npm start

## Get All Matches
import axios from 'axios';

const getMatches = async () => {
  try {
    const response = await axios.get('http://localhost:7000/api/v1/matches');
    console.log(response.data);
  } catch (error) {
    console.error('Error fetching matches:', error);
  }
};

getMatches();

## Create a New Match
import axios from 'axios';

const createMatch = async () => {
  try {
    const newMatch = {
      team1: "India",
      team2: "Australia",
      date: new Date().toISOString(),
      venue: "Mumbai",
      status: "upcoming",
      score: { India: 0, Australia: 0 }
    };

    const response = await axios.post('http://localhost:7000/api/v1/matches', newMatch);
    console.log('Match created:', response.data);
  } catch (error) {
    console.error('Error creating match:', error);
  }
};

createMatch();

## Testing
npm test

## Project structure
.
├── .github/
│   └── workflows/              # GitHub Actions workflows
├── config/                     # Firebase Admin SDK and configuration files
├── docs/                       # Swagger/OpenAPI documentation and generated static files
├── node_modules/
├── src/
│   └── api/
│       └── v1/
│           ├── controllers/    # Business logic for matches, players, and teams
│           ├── middleware/     # Authentication, validation, and error handling
│           ├── models/         # API models and Swagger schemas
│           ├── repositories/   # Firestore data access logic
│           ├── routes/         # Express route definitions
│           │   ├── matchRoutes.ts
│           │   ├── playerRoutes.ts
│           │   └── teamRoutes.ts
│           ├── schemas/        # Joi validation schemas
│           ├── services/       # Business logic services (optional)
│           └── types/          # TypeScript interfaces and types
├── test/                       # Unit/integration tests
├── app.ts                      # Main Express app entry point
├── README.md                   # This file
├── package.json
├── tsconfig.json
└── .env                      # Environment variables (not committed)


## Endpoints Overview
- **Matches**
GET /api/v1/matches – Retrieve all matches (supports filtering by category).

GET /api/v1/matches/random – Retrieve a random match.

GET /api/v1/matches/:id – Retrieve details of a specific match.

POST /api/v1/matches – Create a new match (authorized: admin, user).

PUT /api/v1/matches/:id – Update match details (authorized: admin, user).

DELETE /api/v1/matches/:id – Delete a match (authorized: admin, user).

- **Players**
GET /api/v1/players – Retrieve all players (optionally filter by teamId).

GET /api/v1/players/:id – Retrieve details of a specific player.

POST /api/v1/players – Create a new player (authorized: admin, user).

PUT /api/v1/players/:id – Update player details (authorized: admin, user).

DELETE /api/v1/players/:id – Delete a player (authorized: admin, user).

- **Teams**
GET /api/v1/teams – Retrieve all teams.

GET /api/v1/teams/:id – Retrieve details of a specific team.

POST /api/v1/teams – Create a new team (authorized: admin, user).

PUT /api/v1/teams/:id – Update team details (authorized: admin, user).

DELETE /api/v1/teams/:id – Delete a team (authorized: admin, user).