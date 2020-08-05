# Sender

### A full stack social app that allows climbers to practice their route-reading skills away from the climbing gym. Users can upload photos of climbing problems and define the route, allowing other users to attempt to solve the problem by interacting with the photo.

### Getting Started

1. Pull down this repo

2. Run the SQL script that is in the root directory, called `01_DB-Create.sql`. This will create the Sender database and add some seed data.

3. Create your own firebase project and do the following steps in the firebase console:

   - Go to [Firebase](https://console.firebase.google.com/u/0/) and add a new project. You can name it whatever you want (Sender is a good name)
   - Go to the Authentication tab, click "Set up sign in method", and enable the Username and Password option.
   - Add at least two new users in firebase. Use email addresses that you find in the UserProfile table of your SQL Server database
   - Once firebase creates a UID for these users, copy the UID from firebase and update the `FirebaseUserId` column for the same users in your SQL Server database.
   - Click the Gear icon in the sidebar to go to Project Settings. You'll need the information on this page for the next few steps

4. Go to the `appSettings.Local.json` file. Replace the value for FirebaseProjectId with your own

5. Open your `client` directory in VsCode. Open the `.env.local` file and replace `__YOUR_API_KEY_HERE__` with your own firebase Web API Key

6. In `package.json` add the following proxy to the json object: `"proxy": "https://localhost:5001"`

7. Install your dependencies by running `npm install` from the same directory as your `package.json` file

8. You will also need to install `bootstrap`, `reactstrap`, `react-router-dom`, `cloudinary-react`, `firebase`, and `lodash.debounce` in the same directory as your `package.json` file
