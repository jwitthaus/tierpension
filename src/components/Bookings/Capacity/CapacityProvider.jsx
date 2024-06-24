import {
  subDays,
  addDays,
  differenceInCalendarDays,
  isWithinInterval,
} from "date-fns";
import React, { createContext, useContext, useState } from "react";
import { TimelineSettingsContext } from "../Timeline/TimelineSettingsProvider";

export const CapacityContext = createContext();

export const CapacityProvider = ({ children }) => {
  const { bookings } = useContext(TimelineSettingsContext);
  const capacity = [6, 6, 6, 6, 6, 6];
  //const bookings = [5, 6, 7, 8, 4, 3];

  return (
    <CapacityContext.Provider value={{}}>{children}</CapacityContext.Provider>
  );
};
