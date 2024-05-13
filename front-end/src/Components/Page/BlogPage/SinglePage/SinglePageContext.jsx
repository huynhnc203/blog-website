// Tạo một context để lưu trữ id
import React, { createContext, useState } from 'react';

const IdContext = createContext();

export const IdProvider = ({ children }) => {
  const [id, setId] = useState(null);

  return (
    <IdContext.Provider value={{ id, setId }}>
      {children}
    </IdContext.Provider>
  );
};

export default IdContext;
