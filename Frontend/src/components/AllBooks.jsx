import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

export default function AllBooks() {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/api/books")
      .then((response) => response.json())
      .then((result) => setBooks(result));
  }, []);

  return (
    <div className="container py-5">
      <div className="row">
        {books.map((book) => (
          <div
            key={book.bookisbn}
            className="col-12 col-md-6 col-lg-4 mb-5 mt-5 d-flex justify-content-center"
          >
            <div
              className="card shadow"
              style={{ width: "285px", backgroundColor: "#F2E9DC" }}
            >
              <img
                src={book.bookimage}
                className="card-img-top"
                alt={book.booktitle}
                style={{ height: "450px", objectFit: "cover" }}
                onClick={() => navigate(`/books/${book.bookid}`)}
              />
              <div className="card-body text-center">
                <h5 className="card-title">{book.booktitle}</h5>
                <p className="card-text"> {book.bookauthor}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
