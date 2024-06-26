const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "Tierpension",
});

app.get("/", (re, res) => {
  return res.json("From Backend Side tierpension");
});

app.get("/customers", (req, res) => {
  const sql = "SELECT * FROM kunden ORDER BY Nachname ASC, Vorname ASC";
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post("/customers", (req, res) => {
  const sql =
    "INSERT INTO Kunden (`Vorname`, `Nachname`, `NameIntern`, `Mail`) VALUES (?)";
  const values = [
    req.body.Vorname,
    req.body.Nachname,
    `${req.body.Nachname}, ${req.body.Vorname}`, //NameIntern
    req.body.Mail,
  ];

  db.query(sql, [values], (err, data) => {
    if (err) {
      console.log("error: " + err);
      return res.json(err);
    }
    return res.json(data);
  });
});

app.get("/bookings", (req, res) => {
  const sql = "SELECT * FROM buchungen";
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post("/bookings", (req, res) => {
  const sql =
    "INSERT INTO Buchungen (`Kunden_ID`, `Tier_ID`, `Beginn_Datum`, `Beginn_Start`, `Beginn_Zeitraum`, `Ende_Datum`, `Ende_Start`, `Ende_Zeitraum`) VALUES (?)";
  console.log(req.body);
  const values = [
    req.body.Kunden_ID,
    req.body.Tier_ID,
    req.body.Beginn_Datum,
    req.body.Beginn_Start,
    req.body.Beginn_Zeitraum,
    req.body.Ende_Datum,
    req.body.Ende_Start,
    req.body.Ende_Zeitraum,
  ];

  db.query(sql, [values], (err, data) => {
    if (err) {
      console.log("error: " + err);
      return res.json(err);
    }

    return res.json(data);
  });
});

app.get("/bookingsWithCustomers", (req, res) => {
  const searchTerm = req.query.search || "";
  const sql = `SELECT Buchungen.*, Kunden.NameIntern, Tiere.Name1, Tiere.Geburtstag, Tiere.Geschlecht, TierRassen.Name1, TierArten.Code 
    FROM ((((Buchungen INNER JOIN Kunden ON Kunden.Nummer = Buchungen.Kunden_ID) INNER JOIN Tiere ON Tiere.Nummer = Buchungen.Tier_ID) LEFT JOIN TierRassen ON TierRassen.Nummer = Tiere.TierRasse_ID) LEFT JOIN TierArten ON TierArten.Code = TierRassen.TierArt_ID) 
    WHERE Kunden.NameIntern LIKE ?
    ORDER BY Buchungen.Beginn_Datum`;
  //Festlegung: From .... dann zuerst Basistabelle, dann zu joinende Tabelle, dann zu verknüpfende Felder
  //Inner Join = Ergebnis wenn auch Daten vom Join vorhanden sind
  //Left Join = liefert immer Ergebnis auch wenn nicht gefüllt ist

  const values = [`%${searchTerm}%`];

  db.query(sql, values, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get("/booking", (req, res) => {
  const booking = req.query.LfdNr;
  const sql = `SELECT * FROM Buchungen WHERE LfdNr = ?`;

  db.query(sql, [booking], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.put("/booking", (req, res) => {
  const quote = (val) => (typeof val === "string" ? `"${val}"` : val);

  console.log(req.body.newData);

  const sql = `UPDATE Buchungen SET ${Object.entries(req.body.newData)
    .map(([field, value]) => `${field}=${quote(value)}`)
    .join(", ")} WHERE LfdNr = ${req.body.selectedBooking.LfdNr}`;

  db.query(sql, (err, data) => {
    if (err) {
      console.log("error: " + err);
      return res.json(err);
    }

    return res.json(data);
  });
});

app.get("/holidays", (req, res) => {
  const sql = "SELECT * FROM sondertage";
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.listen(8081, () => {
  console.log("listening");
});

/*
//MONGODB TUTORIAL --> working!
const express = require("express");
const { connectToDb, getDb } = require("./db");
const { ObjectId } = require("mongodb");
//init app
const app = express();
app.use(express.json());

//db connection
let db;
connectToDb((err) => {
  if (!err) {
    app.listen(3000, () => {
      console.log("listening on port 3000");
    });
    db = getDb();
  }
});

//routes
app.get("/customers", (req, res) => {
  let customers = [];
  db.collection("customers")
    .find()
    .sort({ Vorname: 1 })
    .forEach((customer) => customers.push(customer))
    .then(() => {
      res.status(200).json(customers);
    })
    .catch(() => {
      res.status(500).json({ error: "could not fetch the documents" });
    });
});

app.get("/customers/:id", (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    db.collection("customers")
      .findOne({ _id: new ObjectId(req.params.id) })
      .then((doc) => {
        res.status(200).json(doc);
      })
      .catch((err) => {
        res.status(500).json({ error: "Could not fetch the document" });
      });
  } else {
    res.status(500).json({ error: "not a valid id" });
  }
});

app.post("/customers", (req, res) => {
  const customer = req.body;

  db.collection("customers")
    .insertOne(customer)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json({ err: "could not create a new document" });
    });
});

app.delete("/customers/:id", (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    db.collection("customers")
      .deleteOne({ _id: new ObjectId(req.params.id) })
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(500).json({ error: "Could not delete the document" });
      });
  } else {
    res.status(500).json({ error: "not a valid id" });
  }
});

app.patch("/customers/:id", (req, res) => {
  const updates = req.body;
  if (ObjectId.isValid(req.params.id)) {
    db.collection("customers")
      .updateOne({ _id: new ObjectId(req.params.id) }, { $set: updates })
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(500).json({ error: "Could not update the document" });
      });
  } else {
    res.status(500).json({ error: "not a valid id" });
  }
});*/
