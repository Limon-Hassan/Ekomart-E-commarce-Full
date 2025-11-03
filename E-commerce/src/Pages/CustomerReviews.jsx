import React, { useContext, useEffect, useState } from 'react';
import Container from '../Container';
import api from '../Api/axios';
import { useSnackbar } from 'notistack';
import { format } from 'date-fns';
import { SocketContext } from '../socket/SocketContext';

const CustomerReviews = ({ product }) => {
  const socket = useContext(SocketContext);
  let [toggleShow, settoggleShow] = useState(false);
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [Comment, setComment] = useState('');
  const [hover, setHover] = useState(0);
  let { enqueueSnackbar } = useSnackbar();

  let handleShow = () => {
    settoggleShow(true);
  };
  let handleComment = e => {
    setComment(e.target.value);
  };
  let peyload = {
    productId: product._id,
    rating: rating,
    comment: Comment,
  };
  let handleCommentSubmit = async () => {
    try {
      let response = await api.post('product/CreateReviews', peyload);
      enqueueSnackbar(response.data.msg, { variant: 'success' });
      setRating(0);
      setComment('');
      setHover(0);
    } catch (error) {
      console.error(error);
      let backendMsg = error.response?.data?.message || 'Please login !';
      if (backendMsg === 'No token found. Please login.') {
        window.location.href = '/login';
        enqueueSnackbar(backendMsg, { variant: 'error' });
      }
    } finally {
      settoggleShow(false);
    }
  };

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        let response = await api.get('/product/getReviews', {
          params: { productId: product._id },
        });

        setReviews(response.data.data || []);
      } catch (error) {
        console.error(error);
        let backendMsg =
          error.response?.data?.message || 'Something went wrong!';
        console.log(error.message);
        enqueueSnackbar(backendMsg, { variant: 'error' });
      }
    };
    fetchReviews();
  }, [product._id]);

  useEffect(() => {
    socket.emit('joinProduct', { productId: product._id });
  }, [product._id]);

  useEffect(() => {
    const handleNewReview = data => {
      if (data.productId === product._id) {
        setReviews(prev => [data.review, ...prev]);
      }
    };

    socket.on('reviewCreated', handleNewReview);

    return () => {
      socket.off('reviewCreated', handleNewReview);
    };
  }, [product._id]);

  return (
    <>
      <section className="bg-white py-8 antialiased  md:py-16">
        <Container>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-semibold text-gray-900 ">Reviews</h2>

            <div className="mt-2 flex items-center gap-2 sm:mt-0">
              <div className="flex items-center gap-0.5">
                <svg
                  className="h-4 w-4 text-yellow-300"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                </svg>
                <svg
                  className="h-4 w-4 text-yellow-300"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                </svg>
                <svg
                  className="h-4 w-4 text-yellow-300"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                </svg>
                <svg
                  className="h-4 w-4 text-yellow-300"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                </svg>
                <svg
                  className="h-4 w-4 text-yellow-300"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                </svg>
              </div>
              <p className="text-sm font-medium leading-none text-gray-500 ">
                (4.6)
              </p>
              <a
                href="#"
                className="text-sm font-medium leading-none text-gray-900 underline hover:no-underline "
              >
                {' '}
                645 Reviews{' '}
              </a>
            </div>
          </div>

          <div className="my-6 gap-8 sm:flex sm:items-start md:my-8 ">
            <div className="shrink-0 space-y-4 ">
              <p className="text-2xl font-semibold leading-none text-gray-900 ">
                4.65 out of 5
              </p>
              <button
                onClick={handleShow}
                className="mb-2 me-2 text-[16px] font-display font-bold text-white bg-[#629D23] py-[10px] px-[24px] rounded-[6px] cursor-pointer"
              >
                Write a review
              </button>
            </div>

            <div className="mt-6 min-w-0 flex-1 space-y-3 sm:mt-0">
              <div className="flex items-center gap-2">
                <p className="w-2 shrink-0 text-start text-sm font-medium leading-none text-gray-900 ">
                  5
                </p>
                <svg
                  className="h-4 w-4 shrink-0 text-yellow-300"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                </svg>
                <div className="h-1.5 w-80 rounded-full bg-gray-200 ">
                  <div className="h-1.5 rounded-full bg-yellow-300"></div>
                </div>
                <a
                  href="#"
                  className="w-8 shrink-0 text-right text-sm font-medium leading-none text-black-700 hover:underline text-black-500 sm:w-auto sm:text-left"
                >
                  239 <span className="hidden sm:inline">reviews</span>
                </a>
              </div>

              <div className="flex items-center gap-2">
                <p className="w-2 shrink-0 text-start text-sm font-medium leading-none text-gray-900 ">
                  4
                </p>
                <svg
                  className="h-4 w-4 shrink-0 text-yellow-300"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                </svg>
                <div className="h-1.5 w-80 rounded-full bg-gray-200 ">
                  <div className="h-1.5 rounded-full bg-yellow-300"></div>
                </div>
                <a
                  href="#"
                  className="w-8 shrink-0 text-right text-sm font-medium leading-none text-black-700 hover:underline text-black-500 sm:w-auto sm:text-left"
                >
                  432 <span className="hidden sm:inline">reviews</span>
                </a>
              </div>

              <div className="flex items-center gap-2">
                <p className="w-2 shrink-0 text-start text-sm font-medium leading-none text-gray-900 ">
                  3
                </p>
                <svg
                  className="h-4 w-4 shrink-0 text-yellow-300"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                </svg>
                <div className="h-1.5 w-80 rounded-full bg-gray-200 ">
                  <div className="h-1.5 rounded-full bg-yellow-300"></div>
                </div>
                <a
                  href="#"
                  className="w-8 shrink-0 text-right text-sm font-medium leading-none text-black-700 hover:underline text-black-500 sm:w-auto sm:text-left"
                >
                  53 <span className="hidden sm:inline">reviews</span>
                </a>
              </div>

              <div className="flex items-center gap-2">
                <p className="w-2 shrink-0 text-start text-sm font-medium leading-none text-gray-900 ">
                  2
                </p>
                <svg
                  className="h-4 w-4 shrink-0 text-yellow-300"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                </svg>
                <div className="h-1.5 w-80 rounded-full bg-gray-200 ">
                  <div className="h-1.5 rounded-full bg-yellow-300"></div>
                </div>
                <a
                  href="#"
                  className="w-8 shrink-0 text-right text-sm font-medium leading-none text-black-700 hover:underline text-black-500 sm:w-auto sm:text-left"
                >
                  32 <span className="hidden sm:inline">reviews</span>
                </a>
              </div>

              <div className="flex items-center gap-2">
                <p className="w-2 shrink-0 text-start text-sm font-medium leading-none text-gray-900 ">
                  1
                </p>
                <svg
                  className="h-4 w-4 shrink-0 text-yellow-300"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                </svg>
                <div className="h-1.5 w-80 rounded-full bg-gray-200 ">
                  <div className="h-1.5 rounded-full bg-yellow-300"></div>
                </div>
                <a
                  href="#"
                  className="w-8 shrink-0 text-right text-sm font-medium leading-none text-black-700 hover:underline text-black-500 sm:w-auto sm:text-left"
                >
                  13 <span className="hidden sm:inline">reviews</span>
                </a>
              </div>
            </div>
          </div>

          <div className="mt-6 divide-y divide-gray-200">
            {reviews.map(rev => (
              <>
                <div
                  key={rev._id}
                  className="computer:flex items-center gap-[100px] pb-6 mt-5 sm:flex sm:items-start mobile:hidden "
                >
                  <div>
                    <div className="flex items-center gap-0.5">
                      <svg
                        className="h-4 w-4 text-yellow-300"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                      </svg>

                      <p>rating {rev.rating} out of 5 </p>
                    </div>
                    <div className="shrink-0 space-y-2 sm:w-48 md:w-72">
                      <div className="space-y-0.5">
                        <p className="text-base font-semibold text-gray-900 ">
                          {rev.user.name}
                        </p>
                        <p className="text-sm font-normal text-gray-500 ">
                          {format(
                            new Date(rev.createdAt),
                            "MMMM d yyyy 'at' HH:mm"
                          )}
                        </p>
                      </div>

                      <div className="inline-flex items-center gap-1">
                        <p className="text-sm font-medium text-gray-900 ">
                          Verified purchase
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-[30px]  flex-1 ">
                    <p className="text-base max-w-[800px] w-full break-words whitespace-pre-line font-normal text-gray-500 mb-[30px]">
                      {rev.comment}
                    </p>

                    <div className="flex items-center gap-4">
                      <p className="text-sm font-medium text-gray-500 ">
                        Was it helpful to you?
                      </p>
                      <div className="flex items-center">
                        <input
                          id="reviews-radio-1"
                          type="radio"
                          value=""
                          name="reviews-radio"
                          className="h-4 w-4 border-gray-300 bg-gray-100 text-black  "
                        />
                        <label className="ms-2 text-sm font-medium text-gray-900 ">
                          Yes: 3
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="reviews-radio-2"
                          type="radio"
                          value=""
                          name="reviews-radio"
                          className="h-4 w-4 border-gray-300 bg-gray-100 text-black "
                        />
                        <label className="ms-2 text-sm font-medium text-gray-900 ">
                          No: 0
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  key={rev._id}
                  className="mobile:flex computer:hidden items-center justify-between pb-6 mt-5 sm:flex sm:items-start w-full"
                >
                  <div>
                    <div className="flex items-center gap-[10px]">
                      <svg
                        className="h-4 w-4 text-yellow-300"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                      </svg>

                      <p>rating {rev.rating} out of 5 </p>
                      <p className="text-sm font-normal text-gray-500 ml-[20px]">
                        {format(
                          new Date(rev.createdAt),
                          "MMMM d yyyy 'at' HH:mm"
                        )}
                      </p>
                    </div>
                    <div className="tablet:w-full laptop:w-full computer:w-full flex items-center tablet:gap-0 mobile:justify-between tablet:justify-between laptop:justify-between computer:justify-between mb-2.5">
                      <div className="space-y-0.5">
                        <p className="text-base font-semibold text-gray-900 flex items-center gap-2">
                          <i class="fa-solid fa-user"></i>
                          <span className="mobile:w-40 tablet:w-full laptop:w-full computer:w-full truncate">
                            {rev.user.name}
                          </span>
                        </p>
                      </div>
                      <p className="text-sm font-medium text-gray-900 ">
                        Verified purchase
                      </p>
                    </div>
                    <p className="wrap-break-word w-[330px]  text-sm font-medium text-gray-900 whitespace-normal">
                      {rev.comment}
                    </p>
                  </div>
                </div>
              </>
            ))}
          </div>

          <div className="mt-6 text-center">
            <button
              type="button"
              className="mb-2 me-2 rounded-lg border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-[#629D23] focus:outline-none hover:text-white transition-all ease-in-out duration-300 cursor-pointer"
            >
              View more reviews
            </button>
          </div>
        </Container>
      </section>

      {toggleShow === true ? (
        <div className="w-full h-screen bg-[#000]/30 absolute top-0 left-0 z-20 flex justify-center items-center rounded-2xl">
          <div className="mobile:w-full computer:w-[800px] bg-[#fff] mobile:p-[10px] computer:p-[30px] rounded-md">
            <div className="border-b border-[#dee2e6]">
              <div className="flex items-center justify-between mb-[20px]">
                <div className="flex items-center gap-2">
                  <h5 className="mobile:text-[15px] computer:text-[20px] font-display font-medium text-[#2C3C28]">
                    Add a review for :
                  </h5>
                  <h4 className="text-[16px] font-display font-medium text-[#6E777D]">
                    ({product.name})
                  </h4>
                </div>
                <span
                  onClick={() => settoggleShow(false)}
                  className="text-[24px] hover:text-red-500 cursor-pointer ease-in-out duration-300"
                >
                  <i class="fa-solid fa-xmark"></i>
                </span>
              </div>
            </div>
            <div className="flex gap-1 my-[20px]">
              {[...Array(5)].map((_, index) => {
                const starValue = index + 1;
                return (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setRating(starValue)}
                    onMouseEnter={() => setHover(starValue)}
                    onMouseLeave={() => setHover(0)}
                    className="text-2xl"
                    aria-label={`Rate ${starValue} star`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill={(hover || rating) >= starValue ? '#629D23' : 'none'}
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className={`w-8 h-8 ${
                        (hover || rating) >= starValue
                          ? 'text-[#629D23]'
                          : 'text-gray-400'
                      }`}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l2.07 6.374h6.708c.969 0 1.371 1.24.588 1.81l-5.424 3.938 2.07 6.373c.3.922-.755 1.688-1.54 1.117L12 17.768l-5.423 3.938c-.784.571-1.838-.195-1.54-1.117l2.07-6.373-5.424-3.938c-.783-.57-.38-1.81.588-1.81h6.708l2.07-6.374z"
                      />
                    </svg>
                  </button>
                );
              })}
            </div>

            <div>
              <label
                className="text-[16px] font-medium font-display text-[#6E777D]"
                htmlFor="text"
              >
                Review description*
              </label>
              <textarea
                className="w-full h-[200px] text-[16px] font-display font-normal text-[#6E777D] bg-transparent placeholder:text-[16px] placeholder:font-medium p-[15px] my-[15px] rounded-[5px] border-2 border-[#e2e2e2] focus:border-[#629D23] outline-none resize-none"
                type="text"
                name="text"
                onChange={handleComment}
                placeholder="Make Your Reviews...."
              ></textarea>
            </div>

            <div>
              <label
                className="text-[16px] font-medium font-display text-[#6E777D]"
                htmlFor="text"
              >
                Add real photos of the product to help other customers
                (Optional)
              </label>
              <div class="flex w-full items-center justify-center my-[20px]">
                <label
                  for="dropzone-file"
                  class=" flex h-52 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50"
                >
                  <div class="flex flex-col items-center justify-center pb-6 pt-5">
                    <svg
                      class="mb-4 h-8 w-8 text-gray-500 "
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p class="mb-2 text-sm text-gray-500 ">
                      <span class="font-semibold">Click to upload</span> or drag
                      and drop
                    </p>
                    <p class="text-xs text-gray-500 ">
                      SVG, PNG, JPG or GIF (MAX. 800x400px)
                    </p>
                  </div>
                  <input id="dropzone-file" type="file" class="hidden" />
                </label>
              </div>
            </div>

            <div className="flex items-center gap-4 mt-[30px]">
              <button
                onClick={handleCommentSubmit}
                className="text-[16px] font-display font-medium text-[#2C3C28] border border-[#dee2e6] hover:text-white hover:bg-[#629D23] transition-all ease-in-out duration-300 cursor-pointer py-[10px] px-[24px] rounded-[6px]"
              >
                Add Review
              </button>
              <button
                onClick={() => settoggleShow(false)}
                className="text-[16px] font-display font-medium text-[#2C3C28] border border-[#dee2e6] hover:text-white hover:bg-red-400  transition-all ease-in-out duration-300 cursor-pointer py-[10px] px-[24px] rounded-[6px]"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default CustomerReviews;
