import React from "react"
import { IBook } from "../../interfaces/books.interface"
import Slider from "react-slick"
import { BookItemsTitle, AddBookContainer } from "../Styled"

export default ({
  books,
  setSelectI,
  overI,
  setOverI,
  title,
}: {
  books: IBook[]
  setSelectI: (i: number) => void
  setOverI: (i: number) => void
  overI: number
  title: string
}) => {
  const settings = {
    dots: false,
    variableWidth: false,
    speed: 500,
    adaptiveHeight: true,
    slidesToShow: 6,
    slidesToScroll: 6,
    infinite: books.length > 3,
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

  return (
    <AddBookContainer style={{ maxHeight: "500px" }}>
      <BookItemsTitle>{title}</BookItemsTitle>
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
