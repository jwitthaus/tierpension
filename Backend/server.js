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
  database: "test",
});

app.get("/", (re, res) => {
  return res.json("From Backend Side tierpension");
});

app.get("/customers", (req, res) => {
  const sql = "SELECT * FROM customers";
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post("/customers", (req, res) => {
  const sql =
    "INSERT INTO customers (`id`, `Vorname`, `Nachname`, `Email`) VALUES (?)";
  console.log(req.body);
  const values = [
    req.body.id,
    req.body.vorname,
    req.body.nachname,
    req.body.email,
  ];

  db.query(sql, [values], (err, data) => {
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
