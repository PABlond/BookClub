import React from "react"

import { Popover } from "react-bootstrap"
import { FaRegTimesCircle } from "react-icons/fa"

import {
  AddBookTitle,
  AddBookRow,
  PopOverCloseButton,
  CenterCol,
} from "../Styled"
import { Col } from "react-bootstrap"

export default ({ book, children, show, setShow }: any) => {
  const placement = "right-end"
  return (
    <Popover
      id={`popover-positioned-${placement}`}
      className={!show ? "hide" : ""}
    >
      <Popover.Content>
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
            {children}
            <PopOverCloseButton onClick={() => setShow(false)}>
              <FaRegTimesCircle size="19px" />{" "}
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
