CREATE DATABASE bookly;

CREATE TABLE genres (
  genreId serial PRIMARY KEY,
  genreName VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE books (
  bookId serial PRIMARY KEY,
  bookTilte VARCHAR(50) NOT NULL,
  bookAuthor VARCHAR(50) NOT NULL,
  bookISBN VARCHAR(50) UNIQUE NOT NULL,
  bookDescription VARCHAR,
  bookReleaseYear INT,
  bookLanguage VARCHAR(50)
);

CREATE TABLE users (
  userId serial PRIMARY KEY,
  userFullName VARCHAR(50) NOT NULL,
  userEmail VARCHAR(50) UNIQUE NOT NULL,
  userProfilePicture VARCHAR(250), -- maybe change
  useruserName VARCHAR(50) UNIQUE NOT NULL ,
  userPassword VARCHAR(50) NOT NULL
);


CREATE TABLE reviews (
  reviewdId serial PRIMARY KEY,
  reviewContent VARCHAR NOT NULL,
  reviewUserId INT NOT NULL,
  reviewBookId INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (reviewUserId) REFERENCES users(userId) ON DELETE CASCADE,
    FOREIGN KEY (reviewBookId) REFERENCES books(bookId) ON DELETE CASCADE
);

CREATE TABLE bookGenres (
  bookGenreId serial PRIMARY KEY,
  bookGenreBookId INT NOT NULL,
  bookGenreGenreId INT NOT NULL,
  FOREIGN KEY (bookGenreBookId) REFERENCES books(bookId),
  FOREIGN KEY (bookGenreGenreId) REFERENCES genres(genreId)
);

CREATE TABLE userBooks (
  userBookId serial PRIMARY KEY,
  userBookUserId INT NOT NULL,
  userBookBookId INT NOT NULL,
  FOREIGN KEY (userBookUserId) REFERENCES users(userId),
  FOREIGN KEY (userBookBookId) REFERENCES books(bookId)
);
