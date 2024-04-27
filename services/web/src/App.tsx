import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

const RegistrationScreen = React.lazy(() => import("@/screens/Registration"));
const LoginScreen = React.lazy(() => import("@/screens/Login"));

function App() {
  return (
    <div className="App">
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route>
            <Route path="/signup" element={<RegistrationScreen />} />
            <Route path="/login" element={<LoginScreen />} />
          </Route>
          <Route>
            <Route path="/" element={<div>HomeScreen</div>} />
            <Route path="/chats/:id" element={<div>ChatScreen</div>} />
          </Route>
          <Route path="*" element={<h1>404 Not found</h1>} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
