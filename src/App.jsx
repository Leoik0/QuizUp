import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { TopUsersProvider } from "./hook/TopUsersContext";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Rank from "./pages/Rank";
import Store from "./pages/Store";
import Register from "./pages/Register";
import QuizStyle from "./components/QuizStyle/QuizStyle";

function App() {
  const [userId, setUserId] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  return (
    <TopUsersProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home userId={userId} />} />
        <Route path="/quiz/:category" element={<QuizStyle />} />
        <Route path="/profile/:userId" element={<Profile userId={userId} />} />

        <Route path="/rank" element={<Rank />} />
        <Route path="/store" element={<Store />} />
      </Routes>
    </TopUsersProvider>
  );
}

export default App;
