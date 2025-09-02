// src/Context/SearchContext.jsx
import React, { createContext, useState } from "react";

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState(""); // current search term
  const [appliedSearch, setAppliedSearch] = useState(""); // applied search when user hits Enter

  const applySearch = () => setAppliedSearch(searchTerm);

  return (
    <SearchContext.Provider
      value={{ searchTerm, setSearchTerm, appliedSearch, setAppliedSearch ,applySearch}}
    >
      {children}
    </SearchContext.Provider>
  );
};
