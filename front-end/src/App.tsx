import React from "react";
import { Route, Routes } from "react-router-dom";
import { useUser } from "./context/auth";
import HomePage from "./pages/Home";
import LoginPage from "./pages/Log-in";

function App() {
  const { user } = useUser();
  return (
    <React.Fragment>
      <div className="fancy-background h-[100vh]">
        <Routes>
          {user === undefined ? (
            <>
              <Route path="/" element={<LoginPage />}></Route>
              <Route path="*" element={<LoginPage />}></Route>
            </>
          ) : (
            <>
              <Route path="/" element={<LoginPage />}></Route>
              <Route path="/login" element={<LoginPage />}></Route>
              <Route path="/home" element={<HomePage />}></Route>
              <Route path="*" element={<HomePage />}></Route>
            </>
          )}
        </Routes>
      </div>
    </React.Fragment>
  );
}

export default App;
