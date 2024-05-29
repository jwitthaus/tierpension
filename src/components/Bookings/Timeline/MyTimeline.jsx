import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { addDays, differenceInDays } from "date-fns";
import * as React from "react";

import { useState } from "react";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function MyTimeline() {
  //Tage errechnen sich aus Tag der Rückgabe der spätesten Buchung - heutiges Datum (in Tagen)
  //--> vorausgesetzt man kann nicht in die Vergangenheit scrollen
  //diese Zahl wird dann als Spaltenzahl verwendet
  const days = 30;
  const [data, setData] = useState([
    {
      //Niklas fragen, ob das bei ihm 15 ode 16 Tage sind? --> es sind zwar 16 Tage aber 15 Übernachtungen
      dayStart: new Date(2024, 5, 2),
      dayEnd: new Date(2024, 5, 8),
    },
    {
      dayStart: new Date(2024, 5, 12),
      dayEnd: new Date(2024, 5, 24),
    },
  ]);

  const dates = [
    new Date(2024, 6, 2),
    new Date(2024, 6, 8),
    new Date(2024, 7, 18),
  ];

  function timeLineEndDate() {
    return addDays(new Date(), days); //return heute plus const days
  }

  var intervalToDuration = require("date-fns/intervalToDuration");

  return (
    //cqw muss verwendet werden, um den zoom Faktoranzuzeigen (100cqw = ContainerBreite)
    //also 30 Tage auf 100cqw ist eine Monatsansicht und einem Monat an Daten.
    //Wenn man Buchungen für 2 Monate hat und man will aber nur einen Monat sehen, dann verwendet man 60 Tage bei 200cqw

    //Für die Erzeugung des Grids ist es wichtig ein leeres grid vor den Balken zu legen,
    //dann ein grid für den Balken selbst
    //und wieder ein leeres grid für den kompletten Bereich hinter dem Balken bis zum Ende des charts. Nur so ist sicher gestellt, dass eine keine ungewollten Umbrüche gibt
    <Box sx={{ flexGrow: 1, width: "200cqw" }}>
      <Grid container spacing={1} columns={days}>
        {data.map((d, i) => (
          <React.Fragment key={i}>
            <Grid
              item
              xs={differenceInDays(data[i].dayStart, new Date())}
            ></Grid>
            <Grid item xs={differenceInDays(data[i].dayEnd, data[i].dayStart)}>
              <Item>
                {differenceInDays(data[i].dayEnd, data[i].dayStart, {
                  addSuffix: true,
                })}{" "}
                days
              </Item>
            </Grid>
            <Grid
              item
              xs={differenceInDays(timeLineEndDate(), data[i].dayEnd)}
            ></Grid>
          </React.Fragment>
        ))}
      </Grid>
    </Box>
  );
}
