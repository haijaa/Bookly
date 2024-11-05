import { useEffect, useState } from "react";

export default function AllBooks() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/books")
      .then((response) => response.json())
      .then((result) => setBooks(result));
  }, []);

  return (
    <>
      <div className="d-flex flex-column justify-content-center align-items-center">
        {books.map((book) => (
          <div
            key={book.bookisbn}
            className="w-25 d-flex flex-column align-center"
          >
            <p>
              {book.booktitle} av {book.bookauthor}
            </p>
            <div className="d-flex justify-content-center">
              <img
                src={book.bookimage}
                className="img-fluid"
                style={{ height: "450px", width: "325px" }}
              />
            </div>
            <p>{book.bookdescription}</p>
          </div>
        ))}
      </div>
    </>
  );
}
