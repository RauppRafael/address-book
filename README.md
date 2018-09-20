# Address Book


## Requirements
1. Node.js
2. Mongodb


## Running locally
1. Run npm install
2. Create database
3. Copy .env.example as .env
4. Set an `APP_SECRET`, `DB_URI` and `FIREBASE_API_KEY` at the .env file


## Deploying
To deploy you just need to make a commit to the master branch and the CI will deploy automatically


## API Endpoints

### Authentication
    
    POST /auth/register
    Creates a new account
    
    POST /auth/login
    Returns your access token
    
| field  |required|validations     |
|--------|--------|----------------|
| email  |yes     |email / unique  |
|password|yes     |at least 6 chars|

### Contacts
    
    POST /contacts
    Creates a new contact
    
|field  |required|validations|
|-------|--------|-----------|
|name   |yes     |string     |
|email  |no      |email      |
|phone  |no      |           |
|address|no      |           |
