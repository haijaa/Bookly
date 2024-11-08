import { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import '../index.css'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import UserContext from '../context/userContext'
import { Icon } from '@mdi/react'
import { mdiTrashCanOutline } from '@mdi/js'

export default function SingleBook() {
  let { paramId } = useParams()
  const [specificBook, setSpecificBook] = useState([]),
    [userReview, setUserReview] = useState(''),
    { user } = useContext(UserContext)

  const getSpecificBook = async (id) => {
    await fetch(`http://localhost:3000/api/books/${id}`)
      .then((response) => response.json())
      .then((result) => setSpecificBook(result))
  }

  const convertDate = (dateToConvert) => {
    let date = new Date(dateToConvert)
    const options = {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }
    return date.toLocaleDateString('sv-SE', options)
  }

  useEffect(() => {
    if (paramId) {
      getSpecificBook(paramId)
    }
  }, [paramId])

  const postReview = async () => {
    console.log(userReview)
    await fetch('http://localhost:3000/api/reviews', {
      body: JSON.stringify({
        reviewContent: userReview,
        reviewUserId: user.userid,
        reviewBookId: paramId,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result)
        setUserReview('')
        getSpecificBook(paramId)
      })
  }

  return (
    <>
      <div className="d-flex flex-column justify-content-center align-items-center pt-5">
        {specificBook.map((book) => (
          <>
            <div key={book.bookisbn} className="d-flex w-75 mb-5">
              <img
                src={book.bookimage}
                alt={book.booktitle}
                style={{ height: '500px', width: '350px' }}
                className="img-fluid"
              />

              <div className="d-flex flex-column ps-5">
                <h1>{book.booktitle}</h1>
                <h2 className="fs-4 pb-3">{book.bookauthor}</h2>
                <p
                  style={{
                    maxHeight: '65%',
                    overflowY: 'auto',
                    overflowX: 'hidden',
                  }}
                >
                  {book.bookdescription}
                </p>
                <div className="mt-auto">
                  <p className="m-0">
                    <span className="fw-semibold ">Kategorier: </span>
                    {book.genres.map((genre) => (
                      <span key={genre.genreId}>{genre.genreName}</span>
                    ))}
                  </p>
                  <p className="m-0">
                    <span className="fw-semibold">Språk: </span>
                    {book.booklanguage}
                  </p>
                </div>
              </div>
            </div>
            <div
              className="w-100 d-flex justify-content-center pb-5"
              style={{ backgroundColor: '#606D5D' }}
            >
              <div className="d-flex flex-column pt-5 w-50 align-items-center">
                <h3 className="fs-1 pb-5 white-text ">Recensioner</h3>
                {book.reviews[0].reviewId ? (
                  book.reviews.map((review) => (
                    <div
                      key={review.reviewId}
                      className="rounded mb-3 w-75 py-2 px-4"
                      style={{ backgroundColor: '#F2E9DC' }}
                    >
                      <div className="d-flex justify-content-between">
                        <p className="fw-semibold">
                          {review.reviewUser.userFullName}
                        </p>
                        <p>{convertDate(review.reviewCreatedAt)}</p>
                      </div>
                      <p>{review.reviewContent}</p>

                      {review.reviewUser.userId === user.userid && (
                        <div className="d-flex  justify-content-end">
                          <Button className="btn-sm" variant="light">
                            Ta bort
                            <Icon
                              className="ms-1"
                              path={mdiTrashCanOutline}
                              size={1}
                              role="button"
                            />
                          </Button>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="white-text">Det finns inga recensioner</p>
                )}
                <div
                  className="rounded py-4 px-4 w-75"
                  style={{
                    backgroundColor: '#F2E9DC',
                  }}
                >
                  <h4 className="fs-5 mb-4">
                    Skriv en recension om{' '}
                    <span className="fst-italic"> {book.booktitle}</span>
                  </h4>
                  <Form.Label>Recension:</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={userReview}
                    onChange={(e) => setUserReview(e.target.value)}
                  />
                  <Button className="mt-3 ms-1" onClick={() => postReview()}>
                    Skicka
                  </Button>
                </div>
              </div>
            </div>
          </>
        ))}
      </div>
    </>
  )
}
