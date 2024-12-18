import { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import '../index.css'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import UserContext from '../context/UserContext'
import { Icon } from '@mdi/react'
import { mdiTrashCanOutline } from '@mdi/js'
import Image from 'react-bootstrap/Image'
import profileImage from '../assets/booklyOwl.webp'

export default function SingleBook() {
  let { paramId } = useParams()
  const [specificBook, setSpecificBook] = useState([]),
    [userReview, setUserReview] = useState(''),
    { user } = useContext(UserContext)

  const getSpecificBook = async (id) => {
    await fetch(`/api/books/${id}`)
      .then((response) => response.json())
      .then((result) => {
        setSpecificBook(result)
      })
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
    await fetch('/api/reviews', {
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

  const deleteReview = async (x) => {
    await fetch(`/api/reviews`, {
      body: JSON.stringify({
        reviewId: x,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'DELETE',
    })
    getSpecificBook(paramId)
  }

  return (
    <>
      <div
        className="d-flex flex-column justify-content-between align-items-center pt-5 "
        style={{ minHeight: '100vh' }}
      >
        {specificBook.map((book) => (
          <>
            <div key={book.bookisbn} className="d-flex w-75 mb-5 py-5">
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
                    {book.genres.map((genre) => genre.genreName).join(', ')}
                  </p>
                  <p className="m-0">
                    <span className="fw-semibold">Språk: </span>
                    {book.booklanguage}
                  </p>
                </div>
              </div>
            </div>
            <div
              className="w-100 d-flex justify-content-center pb-5 flex-grow-1"
              style={{ backgroundColor: '#606D5D' }}
            >
              <div className="d-flex flex-column pt-5 w-50 align-items-center">
                <h3 className="fs-1 pb-5 white-text ">Recensioner</h3>
                {book.reviews[0].reviewId ? (
                  book.reviews.map((review) => (
                    <div
                      key={review.reviewId}
                      className="rounded mb-3 w-75 py-4 px-4"
                      style={{ backgroundColor: '#F2E9DC' }}
                    >
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <div className="d-flex align-items-center">
                          <Image
                            className="me-2"
                            src={
                              review.reviewUser.userProfilePicture ??
                              profileImage
                            }
                            roundedCircle
                            style={{
                              width: '35px',
                              height: '35px',
                            }}
                          />
                          <p className="fw-semibold m-0">
                            {review.reviewUser.userFullName}
                          </p>
                        </div>
                        <p className="m-0">
                          {convertDate(review.reviewCreatedAt)}
                        </p>
                      </div>
                      <p>{review.reviewContent}</p>

                      {review.reviewUser.userId === user.userid && (
                        <div className="d-flex  justify-content-end">
                          <Button
                            className="btn-sm"
                            variant="danger"
                            onClick={() => deleteReview(review.reviewId)}
                          >
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
                  <Button
                    className="mt-3 ms-1 float-end"
                    onClick={() => postReview()}
                  >
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
