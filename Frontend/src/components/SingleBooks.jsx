import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function SingleBook() {
  let { paramId } = useParams();
  const [specificBook, setSpecificBook] = useState([]);

  const getSpecificBook = async (id) => {
    await fetch(`http://localhost:3000/api/books/${id}`)
      .then((response) => response.json())
      .then((result) => setSpecificBook(result));
  };

  useEffect(() => {
    if (paramId) {
      getSpecificBook(paramId);
    }
  }, [paramId]);

  return (
    <>
      <div
        className="d-flex justify-content-center align-items-center md:flex-column"
        style={{ height: "100vh" }}
      >
        {specificBook.map((book) => (
          <>
            <div key={book.bookisbn} className="d-flex w-50">
              <img
                src={book.bookimage}
                alt={book.booktitle}
                style={{ height: "650px", width: "500px" }}
                className="img-fluid"
              />

              <div className="d-flex flex-column ps-5">
                <h1>{book.booktitle}</h1>
                <p className="fs-4 pb-3">{book.bookauthor}</p>
                <p>{book.bookdescription}</p>
              </div>
            </div>
          </>
        ))}
      </div>
    </>
  );
}
