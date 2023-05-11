# Free Code Camp: Backend Project 1 - Timestamp Microservice

## Timestamp Microservice

### Project Aims:

The aim of this project was to build a small web app with functionality similar to: https://timestamp-microservice.freecodecamp.rocks

The project was built using the following technologies:

- **HTML**
- **JavaScript** with **[Node.js](https://nodejs.org/en/) / [NPM](https://www.npmjs.com/)** for package management
- **[Express](https://expressjs.com/)** web framework to build the web API.
- **[Bootstrap](https://getbootstrap.com/)** for styling with some custom **CSS**
- **[nodemon](https://nodemon.io/)** for automatic restarting of server during development.

### Project Requirements:

- **User Story #1:** A request to `/api/:date?` with a valid date should return a JSON object with a `unix` key that is a Unix timestamp of the input date in milliseconds (as type Number)

- **User Story #2:** A request to `/api/:date?` with a valid date should return a JSON object with a `utc` key that is a string of the input date in the format: `Thu, 01 Jan 1970 00:00:00 GMT`

- **User Story #3:** A request to `/api/1451001600000` should return `{ unix: 1451001600000, utc: "Fri, 25 Dec 2015 00:00:00 GMT" }`

- **User Story #4:** Your project can handle dates that can be successfully parsed by `new Date(date_string)`

- **User Story #5:** If the input date string is invalid, the api returns an object having the structure `{ error : "Invalid Date" }`

- **User Story #6:** An empty date parameter should return the current time in a JSON object with a `unix` key

- **User Story #7:** An empty date parameter should return the current time in a JSON object with a `utc` key

### Project Writeup:

The first Free Code Camp: Back End Development Project is a timestamp web API. Users can request a timestamp in three ways:

- Sending a `GET` request to `/api` or `/api/` (i.e. no date specified), returns the current UNIX timestamp in milliseconds, along with a corresponding current GMT date string.
- Sending a `GET` request to `/api/<NUMBER>` will take the given NUMBER query parameter as a UNIX timestamp in milliseconds, and return this timestamp and the GMT date string for this timestamp.
- Sending a `GET` request to `/api/<STRING>` will cause the API to attempt to generate a JS `Date` object from the given STRING. If the STRING can be converted into a valid date (e.g. `'2015-12-22'`), then the UNIX timestamp and corresponding GMT date string are returned. If the STRING cannot be converted, an error is returned in JSON format.

### Project Files:

- `index.js` - the main entry point of the application, an express web server handling the routes defined in the specification.

- `public/` - contains static files for the web app (stylesheet, logo, favicons etc), served by express using `express.static()`.

- `views/` - contains the single html page for the web app, `index.html`, which is served by express on `GET` requests to `/`.

### Usage:

Requires Node.js / NPM in order to install required packages. After downloading the repo, install required dependencies with:

`npm install`

A development mode (with auto server restart on file save), can be started with:

`npm run dev`

The application can then be viewed at `http://localhost:3000/` in the browser.

To start the server without auto-restart on file save:

`npm start`

# Timestamp Microservice BoilerPlate

The initial boilerplate for this app can be found at https://github.com/freeCodeCamp/boilerplate-project-timestamp/

Instructions for building the project can be found at https://www.freecodecamp.org/learn/apis-and-microservices/apis-and-microservices-projects/timestamp-microservice
