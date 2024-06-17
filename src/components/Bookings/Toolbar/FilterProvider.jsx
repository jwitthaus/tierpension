import React, { createContext, useState } from "react";

export const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <FilterContext.Provider value={{ searchTerm, setSearchTerm }}>
      {children}
    </FilterContext.Provider>
  );
};
