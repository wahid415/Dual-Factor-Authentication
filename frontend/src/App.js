import React from "react";
import { Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";

import store from "./store";

import "./App.css";

import Header from "./components/Header";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import Two2fa from "./components/Two2fa";
import UserProfile from "./components/UserProfile";

function App() {
  return (
    <main>
      <Provider store={store}>
        <Header />
        <div className="container">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/validate_2fa" element={<Two2fa />} />
            <Route path="/user-profile" element={<UserProfile />} />
          </Routes>
        </div>
      </Provider>
    </main>
  );
}

export default App;
