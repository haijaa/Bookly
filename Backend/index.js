const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { Client } = require("pg");
const NodeCache = require("node-cache");

dotenv.config();

const client = new Client({
  connectionString: process.env.PGURI,
});

client.connect();

const app = express();
const port = process.env.PORT || 3000;
const cache = new NodeCache({ stdTTL: 600 });

app.use(cors());
app.use(express.json());

app.get("/api/books", async (_request, response) => {
  const cacheKey = "books-list";
  const cachedData = cache.get(cacheKey);
  if (cachedData) {
    return response.send(cachedData);
  }

  try {
    const { rows } = await client.query("SELECT * from books;");
    cache.set(cacheKey, rows);
    response.send(rows);
  } catch (error) {
    response.status(500).send("Error on serverside");
  }
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
                'userUserName', users.userUserName
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
    [id],
  );
  response.send(rows);
});

app.post("/api/reviews", async (request, response) => {
  const { reviewContent, reviewUserId, reviewBookId } = request.body;
  try {
    const { rows } = await client.query(
      "INSERT INTO reviews (reviewContent, reviewUserId , reviewBookId) VALUES ($1, $2, $3) RETURNING *",
      [reviewContent, reviewUserId, reviewBookId],
    );
    response.status(200).json({ message: "Added:", data: rows[0] });
  } catch (error) {
    console.log("Error: ", error);
    response.status(500).send("Error on serverside");
  }
});

app.delete("/api/reviews", async (request, response) => {
  const { reviewId } = request.body;
  try {
    const { rows } = await client.query(
      "DELETE FROM reviews WHERE reviewId = $1",
      [reviewId],
    );
    response.status(200).json("Review deleted");
  } catch (error) {
    response.status(500).json("Error on serverside");
  }
});

app.get("/api/users", async (request, response) => {
  const { rows } = await client.query("SELECT * FROM users;");
  response.send(rows);
});

app.post("/api/users", async (request, response) => {
  const { userFullName, userEmail, userUserName, userPassword } = request.body;
  try {
    const { rows } = await client.query(
      "INSERT INTO users (userFullname, userEmail, userUserName, userPassword) VALUES ($1, $2, $3, $4) RETURNING *;",
      [userFullName, userEmail, userUserName, userPassword],
    );
    response
      .status(201)
      .json({ message: "User created successfully", user: rows[0] });
  } catch (error) {
    console.error("Error create user", error.detail);

    if (error.code === "23505") {
      if (error.detail.includes("userusername")) {
        return response.status(400).send({
          message: "användarnamn",
          error: "Användarnamnet finns redan, vänligen välj ett annat.",
        });
      } else if (error.detail.includes("useremail")) {
        return response.status(400).send({
          message: "email",
          error: "Email finns redan, vänligen välj en annan",
        });
      }
    }
    response.status(500).send({
      message: "Error creating user",
      error: error.message,
    });
  }
});

app.put("/api/users", async (request, response) => {
  const {
    userId,
    userFullName,
    userEmail,
    userUserName,
    userPassword,
    userProfilePicture,
  } = request.body;
  try {
    const { rows } = await client.query(
      `UPDATE users SET userFullName = $1,
          userEmail = $2,
          userUserName = $3,
          userPassword = $4,
          userProfilePicture = $5 WHERE userId = $6 RETURNING *;`,
      [
        userFullName,
        userEmail,
        userUserName,
        userPassword,
        userProfilePicture,
        userId,
      ],
    );
    response
      .status(201)
      .json({ message: "User updated successfully", user: rows[0] });
  } catch (error) {
    console.error("Error update user", error);
    response.status(500).send({
      message: "Error update user",
      error: error.message,
    });
  }
});

app.delete("/api/users", async (request, response) => {
  const { userId } = request.body;
  try {
    const { rows } = await client.query(
      "DELETE FROM users WHERE userId = $1 RETURNING *;",
      [userId],
    );
    response
      .status(201)
      .json({ message: "User deleted successfully", user: rows[0] });
  } catch (error) {
    console.error("Error delete user", error);
    response.status(500).send({
      message: "Error delete user",
      error: error.message,
    });
  }
});

app.listen(port, () => {
  console.log(`Redo på http://localhost:${port}/`);
});
