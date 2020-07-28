import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { UserProfileProvider } from "./providers/UserProfileProvider";
import ApplicationViews from "./components/ApplicationViews";
import { ClimbProvider } from "./providers/ClimbProvider";
import Header from "./components/Header";

function App() {
  return (
    <Router>
      <UserProfileProvider>
        <ClimbProvider>
          <Header />
          <ApplicationViews />
        </ClimbProvider>
      </UserProfileProvider>
    </Router>
  );
}

export default App;
