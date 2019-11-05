import React, { useState, useEffect, Dispatch } from "react"
import addBookToLib from "../../actions/library/addBookToLib"
import { IBook } from "../../interfaces/books.interface"
import { connect } from "react-redux"

import { OverlayTrigger } from "react-bootstrap"
import BookItems from "../BookItems"
import BookDesc from "../BookDesc"
import { AddLibButton } from "../Styled"
import { FaEdit } from "react-icons/fa"

const AddBook = ({ books, addBook }: { books: IBook[]; addBook: any }) => {
  const [selectI, setSelectI] = useState<number>(0)
  const [overI, setOverI] = useState<number>(0)
  const [show, setShow] = useState<Boolean>(true)

  const BookItemsOpts = {
    books,
    setSelectI,
    overI,
    setOverI,
    title: "Add to your library",
  }
  const BookDescOpts = {
    book: books[selectI],
    show,
    setShow,
  }

  const placement = "right-end"

  useEffect(() => {
    setShow(true)
  }, [selectI])

  return (
    <>
      {books.length ? (
        <>
          <OverlayTrigger
            trigger="click"
            key={placement}
            rootCloseEvent={"mousedown"}
            rootClose={true}
            placement={placement}
            overlay={
              <BookDesc {...BookDescOpts}>
                <AddLibButton onClick={() => addBook(books[selectI].id)}>
                  <FaEdit size="19px" /> Library
                </AddLibButton>
              </BookDesc>
            }
          >
            <BookItems {...BookItemsOpts} />
          </OverlayTrigger>
        </>
      ) : null}
    </>
  )
}
const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    addBook: async (id: string) => dispatch(await addBookToLib(id)),
  }
}

const mapStateToProps = (state: any) => {
  const { library } = state
  return { library }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddBook)
