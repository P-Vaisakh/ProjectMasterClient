import React, { createContext, useState } from "react";

export const responseContext = createContext();
export const editResponseContext = createContext();

const Context = ({ children }) => {
  const [addUpdate, setAddUpdate] = useState([]);
  const [editUpdate, setEditUpate] = useState([]);
  return (
    <>
      <responseContext.Provider value={{ addUpdate, setAddUpdate }}>
        <editResponseContext.Provider value={{ editUpdate, setEditUpate }}>
          {children}
        </editResponseContext.Provider>
      </responseContext.Provider>
    </>
  );
};

export default Context;
