[firebase-url]: https://firebase.com
[rfc-http-url]: https://www.ietf.org/rfc/rfc2616.txt
[jwt-url]: http://jwt.io

# Backend Test Project - Addressbook

Your task is to implement a simple AddressBook backend API. Detailed specifications for the test project are provided below. We estimate that you will not need more than a single weekend at relaxed coding speed to implement it.

## Project description

The addressbook backend will be used by your users to perform the following tasks:

- Register new account
- Manage their contacts

## Technical details

Your backend should be able to serve all kinds of clients (which you do not have to implement 😀) - both mobile apps and websites using a RESTful API. The following technical requirements are placed on your implementation:

### Deployment

- Deploy the application to either Heroku or AWS ECS or EC2
- Set up continuous integration (Travis-CI, Heroku-CI, Jenkins etc.)

### API

- Use Node.js
- Use one of these two well-known framework Express or Koa
- HTTP responses should follow best practices in the industry (especially with regard to status code definitions and request/response headers' usage - you may consult [RFC 2616][rfc-http-url] for more information)
- API should communicate with their clients using JSON data structures
- Use stateless authentication - once your users successfully log in, your backend should not need to make queries to any kind of "session store" - nor database, nor in-memory for a pre-determined amount of time (ie. 1 hour). After that, the session should expire and clients should renew their session. You can use [JSON Web Tokens][jwt-url].

### User accounts

- All user account information should be stored in either a relational database (MySQL, PostgreSQL, etc.) or a NoSQL database (MongoDB, CouchDB, RethinkDB etc., but not Firebase)
- Registrations should be done with email+password
- You should implement the following functionality:
  - User registration
  - User login

### Contact data

- All your users' contacts should be stored in [Firebase][firebase-url]
- You should implement only the following functionality on backend:
  - Create a new contact

Assume that **clients will read the contacts directly from Firebase**. You do not need to implement *GET*, *UPDATE* or *DELETE* endpoints for contacts.

## Review process

There are a few technical restrictions so we can see how you fare with the technologies and processes we use on a daily basis, but in general, the actual implementation is quite open-ended. The reason is we want to see how you think in terms of backend architecture, development processes and how you generally deal with the challenges you might face while implementing this API.

The following should help you determine where to put your focus, since these are the things we will be looking for while reviewing your project.

### 🔥 Code quality

Is your code well-structured? Do you keep your coding style consistent across your codebase?

### 🔥 Security

How do you store your customers' passwords? What about security of your customers' data?

### 🔥 Testability

Is your code tested? How do you write tests? Do you even write them? 😀

### API structure and usability

How do you structure API endpoints? Do you follow REST principles? Do you make use of proper response codes and HTTP headers where it makes sense?

### Development and deployment

How hard is it to run your project locally? And how hard is it to deploy it? Is it deployed correctly, with continuous integration being set up?

### New language features

We at STRV love ES 2015 and beyond! Do you use new language features, too?

### Documentation

Is your API documented? Is the documentation sufficient for at least basic needs in multi-platform development team?

> That's it. Good luck and we look forward to seeing your submission!
