import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { UserProfileProvider } from "./providers/UserProfileProvider";
import ApplicationViews from "./components/ApplicationViews";
import { ClimbProvider } from "./providers/ClimbProvider";
import Header from "./components/Header";
import { GradeProvider } from "./providers/GradeProvider";
import { StateProvider } from "./providers/StateProvider";
import { MoveProvider } from "./providers/MoveProvider";

function App() {
  return (
    <Router>
      <UserProfileProvider>
        <GradeProvider>
          <StateProvider>
            <ClimbProvider>
              <MoveProvider>
                <Header />
                <ApplicationViews />
              </MoveProvider>
            </ClimbProvider>
          </StateProvider>
        </GradeProvider>
      </UserProfileProvider>
    </Router>
  );
}

export default App;
