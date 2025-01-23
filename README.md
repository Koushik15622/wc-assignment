# wc-assignment

## Project Setup Instructions

Follow these steps to set up and run the project locally.

### Clone the Repository

```sh
git clone https://github.com/Koushik15622/wc-assignment.git
cd wc-assignment
```

### Install Dependencies

Use npm to install the denpendencies for root,client and server folders.

```sh
npm install
npm run install:all
```

### Setup Environment Variables

#### Server Setup

Create a `.env` file in the `server` folder with the following content:

```env
GOOGLE_CLIENT_ID=<your-google-web-client-id>
GOOGLE_CLIENT_SECRET=<your-google-web-client-secret>
GOOGLE_CALLBACK_URL=<your-callback-url>
SESSION_KEY="session-key"
REACT_SERVER_URL=<your-client-url>
``` 

> Replace with your actual values.

#### Client Setup

In the `api.js` file located in the client folder, update the `baseURL` with the server URL:

```javascript
const api = axios.create({
  baseURL: 'https://localhost:5000',
});
```

### Important Note

The Google web client I created for OAuth verification is in testing mode. I need to manually add the user emails in the Google Cloud Console for users to test the current released product.

### Run the Project

Run both the server and client concurrently using the following command from the root folder:

```sh
npm run dev
```

This will start the server on `http://localhost:5000` and the client on `http://localhost:3000`.

### Features

- **Google OAuth Integration**: Login and logout functionality with Google authentication.
- **Google Calendar API**: Fetch and display calendar events.
- **MERN Stack**: Full-stack setup with React, Express, MongoDB, and Node.js.

### Author

[Koushik PLN] - [koushikpln02@gmail.com]

### License

This project is licensed under the MIT License.

