# Aggregator-2.0

To run from the root directory:

   ```
   npm run dev
   ```

## Overview
The News Aggregator is a web application designed to collect and display news and data from various sources on a single platform. This repository contains both the server and client-side code for the application. It aggregates news and data from different websites and displays them in an organized manner.

## Technologies Used
- **Express**: The server is built using Express.js, a Node.js web application framework, which handles requests and serves as the backend for the application.

- **Puppeteer**: Puppeteer is used for web scraping, allowing the application to fetch data from websites that do not provide APIs. It's a headless Chrome browser that can be used for automated tasks.

- **MongoDB**: MongoDB is used as the database to store the collected news and data. The MongoDB connection string is accessed through environment variables.

- **React**: The frontend of the application is built using React, a popular JavaScript library for building user interfaces.

- **Axios**: Axios is used for making HTTP requests to fetch data from various sources.

- **Winston**: Winston is a logging library used for error logging in the application.

- **Helmet**: Helmet is middleware for securing the Express application by setting various HTTP headers.

- **Cors**: Cors middleware is used to enable cross-origin resource sharing.

- **dotenv**: The `dotenv` library is used to load environment variables from a `.env` file.

## Functionality
The application has several key components:

### Server
- The Express server is responsible for handling incoming requests.
- It provides an endpoint at `/info` to fetch aggregated news and data.
- It connects to a MongoDB database using the MongoDB URI specified in environment variables.
- It uses Puppeteer for web scraping to fetch data from various websites.

### Web Scraping
- The `scanFile` function in `scraper.js` is responsible for scanning websites and extracting data.
- It checks the timestamp to determine if data should be fetched or if cached data can be used.

### Database
- Data fetched from websites is stored in a MongoDB database.

### Client
- The client-side is built using React and consists of components like `Receiver` and `SubContainer` to display the aggregated data.
- It makes HTTP requests to the server to fetch the data.

## Usage
To run the application, follow these steps:

1. Clone the repository:
   ```
   git clone <repository_url>
   ```

2. Set up environment variables:
   Create a `.env` file with the required environment variables, including the MongoDB URI and other settings.

3. Install server dependencies:
   ```
   cd server
   npm install
   ```

4. Run the server:
   ```
   npm start
   ```

5. Install client dependencies:
   ```
   cd client
   npm install
   ```

6. Run the client:
   ```
   npm start
   ```

The server will be accessible at `http://localhost:5000`, and the client at `http://localhost:3000`.

Please replace `<repository_url>` with the actual URL of your Git repository.

## Contributing
Contributions to this project are welcome. You can open issues or pull requests to suggest improvements or report bugs.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
