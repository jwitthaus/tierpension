import React, { createContext, useState } from "react";

export const TimelineSettingsContext = createContext();

export const TimelineSettingsProvider = ({ children }) => {
  const [visibleDays, setVisibleDays] = useState(7);

  return (
    <TimelineSettingsContext.Provider value={{ visibleDays, setVisibleDays }}>
      {children}
    </TimelineSettingsContext.Provider>
  );
};
