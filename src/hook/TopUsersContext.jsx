// TopUsersContext.js
import React, { createContext, useContext, useState } from "react";

const TopUsersContext = createContext();

export const TopUsersProvider = ({ children }) => {
  const [topUsers, setTopUsers] = useState([]);

  return (
    <TopUsersContext.Provider value={{ topUsers, setTopUsers }}>
      {children}
    </TopUsersContext.Provider>
  );
};

export const useTopUsers = () => useContext(TopUsersContext);
