import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Footer from "./components/Footer";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Settings from "./components/Settings";
import { useAuthStore } from "./store/userAuthStore";
import { useEffect } from "react";

function App() {
  const { authUser, checkAuth } = useAuthStore();
  useEffect(() => {
    checkAuth();
  });
  console.log({ authUser });

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
