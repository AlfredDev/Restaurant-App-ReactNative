import React, { useState } from "react";
import { UserContext } from "./UserContext";

// const user = {
//   id: 123,
//   name: "robert",
//   user: "sdfsdf",
// };

export const UserProvider = ({ children }) => {
  const [usuario, setUser] = useState();

  return (
    <UserContext.Provider value={{ usuario, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
