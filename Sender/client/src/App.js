import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { UserProfileProvider } from "./providers/UserProfileProvider";
import ApplicationViews from "./components/ApplicationViews";
import { ClimbProvider } from "./providers/ClimbProvider";
import Header from "./components/Header";
import { GradeProvider } from "./providers/GradeProvider";
import { StateProvider } from "./providers/StateProvider";
import { MoveProvider } from "./providers/MoveProvider";
import { LimbProvider } from "./providers/LimbProvider";
import { CommentProvider } from "./providers/CommentProvider";
import { UserClimbSolvedProvider } from "./providers/UserClimbSolvedProvider";

function App() {
  return (
    <Router>
      <UserProfileProvider>
        <UserClimbSolvedProvider>
          <GradeProvider>
            <StateProvider>
              <CommentProvider>
                <ClimbProvider>
                  <LimbProvider>
                    <MoveProvider>
                      <Header />
                      <ApplicationViews />
                    </MoveProvider>
                  </LimbProvider>
                </ClimbProvider>
              </CommentProvider>
            </StateProvider>
          </GradeProvider>
        </UserClimbSolvedProvider>
      </UserProfileProvider>
    </Router>
  );
}

export default App;
