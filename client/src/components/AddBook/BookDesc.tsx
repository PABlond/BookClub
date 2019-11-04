import React from "react"
// import { IBook } from "../../interfaces/books.interface"
import { Popover } from "react-bootstrap"

import {
  AddBookTitle,
  AddBookRow,
  AddLibButton,
  PopOverCloseButton,
  CenterCol,
} from "../Styled"
import { Col } from "react-bootstrap"

export default ({ book, addBook, show, setShow }: any) => {
  const placement = "right-end"
  return (
    <Popover
      id={`popover-positioned-${placement}`}
      className={!show ? "hide" : ""}
    >
      <Popover.Content>
        {/* <AddBookDesc> */}
        <AddBookRow>
          <Col sm={8}>
            <AddBookTitle>{book.title}</AddBookTitle>
          </Col>
          <Col sm={4}>
            <p>
              {book.authors && book.authors[0]}- {book.publishedDate}
            </p>
          </Col>
        </AddBookRow>
        <AddBookRow>
          <CenterCol sm={4}>
            <AddLibButton onClick={() => addBook(book.id)}>
              + Library
            </AddLibButton>

            <PopOverCloseButton onClick={() => setShow(false)}>
              Close
            </PopOverCloseButton>
          </CenterCol>
          <Col sm={8}>
            <p>{book.description && `${book.description.slice(0, 150)} ...`}</p>
          </Col>
        </AddBookRow>
        {/* </AddBookDesc> */}
      </Popover.Content>
    </Popover>
  )
}
