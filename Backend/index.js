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

app.get("/api/books/:id", async (request, response) => {
  const { id } = request.params;
  const { rows } = await client.query(
    `
    SELECT
        books.bookId,
        books.bookTitle,
        books.bookAuthor,
        books.bookISBN,
        books.bookImage,
        books.bookDescription,
        books.bookReleaseYear,
        books.bookLanguage,
        array_agg(DISTINCT jsonb_build_object(
            'reviewId', reviews.reviewId,
            'reviewContent', reviews.reviewContent,
            'reviewCreatedAt', reviews.created_at,
            'reviewUser', jsonb_build_object(
                'userId', users.userId,
                'userFullName', users.userFullName,
                'useruserName', users.useruserName
            )
        )) AS reviews,
        array_agg(DISTINCT jsonb_build_object(
            'genreId', genres.genreId,
            'genreName', genres.genreName
        )) AS genres
    FROM
        books
    LEFT JOIN
        reviews ON books.bookId = reviews.reviewBookId
    LEFT JOIN
        users ON reviews.reviewUserId = users.userId
    LEFT JOIN
        bookGenres ON books.bookId = bookGenres.bookGenreBookId
    LEFT JOIN
        genres ON bookGenres.bookGenreGenreId = genres.genreId
    WHERE
        books.bookId = $1
    GROUP BY
        books.bookId;
    `,
    [id]
  );
  response.send(rows);
});

app.post("/api/reviews", async (request, response) => {
  const { reviewContent, revuewUserId, reviewBookId } = request.body;
  try {
    const { rows } = await client.query(
      "INSERT INTO reviews (reviewContent, revuewUserId , reviewBookId) VALUES ($1, $2, $3)",
      [reviewContent, revuewUserId, reviewBookId]
    );
    response.status(201).json(rows[0]);
  } catch (error) {
    console.log("Error: ", error);
    response.status(500).send("Error on serverside");
  }
});

app.listen(port, () => {
  console.log(`Redo på http://localhost:${port}/`);
});
