import React, { useState } from "react";
import styles from "./CustomerList.module.css";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import MuiListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Chip } from "@mui/material";
import Searchbar from "../Searchbar";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `0px`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&::before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: "0px",
  borderTop: "0px",
}));

const RequestListItem = styled(MuiListItem)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  marginBottom: "8px",
}));

const BookingsListItem = styled(MuiListItem)(({ theme }) => ({
  marginBottom: "8px",
  paddingLeft: "24px",
}));

export default function CustomerList() {
  const [data, setData] = useState([
    { Vorname: "Jörg", Nachname: "Witthaus", id: 1 },
    { Vorname: "Holger", Nachname: "Witthaus", id: 2 },
  ]);
  /*useEffect(() => {
    fetch("http://localhost:8081/customers")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.log(err));
  }, []);*/

  return (
    <div className={styles.accordionList}>
      <Searchbar />
      <Accordion>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography sx={{ fontWeight: "medium", width: "100%" }}>
            Requests
          </Typography>
          <Chip label="2 new" color="secondary" size="small" />
        </AccordionSummary>
        <AccordionDetails>
          <List disablePadding>
            {data.map((d, i) => (
              <RequestListItem disablePadding key={d.id}>
                <ListItemButton>
                  <ListItemText
                    sx={{ paddingLeft: 3 }}
                    primary={d.Nachname + ", " + d.Vorname}
                  />
                </ListItemButton>
              </RequestListItem>
            ))}
          </List>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <Typography sx={{ fontWeight: "medium", width: "100%" }}>
            Bookings
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List disablePadding>
            <BookingsListItem disablePadding>
              <ListItemButton>
                <ListItemText primary="Anntreter, Anna" />
              </ListItemButton>
            </BookingsListItem>
            <BookingsListItem disablePadding>
              <ListItemButton>
                <ListItemText primary="Hutmann, Sylvia" />
              </ListItemButton>
            </BookingsListItem>
          </List>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
