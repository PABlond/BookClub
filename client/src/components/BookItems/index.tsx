import React from "react"
import { IBook } from "../../interfaces/books.interface"
import Slider from "react-slick"
import { BookItemsTitle, AddBookContainer } from "../Styled"

export default ({
  books,
  setSelectI,
  //   selectI,
  overI,
  setOverI,
}: {
  books: IBook[]
  setSelectI: any
  //   selectI: number
  setOverI: any
  overI: number
}) => {
  const settings = {
    dots: false,
    variableWidth: false,
    infinite: true,
    speed: 500,
    adaptiveHeight: true,
    slidesToShow: 6,
    slidesToScroll: 6,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 6,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  }
  console.log(overI)
  return (
    <AddBookContainer style={{ maxHeight: "500px" }}>
      <BookItemsTitle>Search Items To Add</BookItemsTitle>
      <Slider {...settings}>
        {books.map(
          ({ id, title, imageLinks }: IBook, i: number) =>
            imageLinks && (
              <div
                key={id}
                className={`caroussel-item ${overI === i && "selected"}`}
              >
                <img
                  key={i}
                  className="img-fluid"
                  onClick={() => setSelectI(i)}
                  onMouseOver={() => setOverI(i)}
                  src={imageLinks.thumbnail}
                  alt={title}
                />
              </div>
            )
        )}
      </Slider>
    </AddBookContainer>
  )
}
