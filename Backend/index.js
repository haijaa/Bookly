const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { Client } = require("pg");

dotenv.config();

const client = new Client({
  connectionString: process.env.PGURI,
});

client.connect();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/api/books", async (_request, response) => {
  const { rows } = await client.query("SELECT * from books;");
  response.send(rows);
});

// Rewrite query to get genres too. Also applies to /API/BOOKS

app.get("/api/books/:id", async (request, response) => {
  const { id } = request.params;
  const { rows } = await client.query("SELECT * FROM books WHERE bookId = $1", [
    id,
  ]);
  response.send(rows);
});

app.listen(port, () => {
  console.log(`Redo på http://localhost:${port}/`);
});
