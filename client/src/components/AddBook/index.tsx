import React, { useState, useEffect, Dispatch } from "react"
import getBooks from "../../services/queries/searchBooks"
import { IBook } from "../../interfaces/books.interface"
import addBookToLib from "../../actions/library/addBookToLib"
import { connect } from "react-redux"

import { OverlayTrigger, Form, FormControl, Button } from "react-bootstrap"
import BookItems from "../BookItems"
import BookDesc from "./BookDesc"

const AddBook = ({addBook}: any) => {
  const [search, setSearch] = useState<string>("")
  const [books, setBooks] = useState<IBook[]>([])
  const [selectI, setSelectI] = useState<number>(0)
  const [overI, setOverI] = useState<number>(0)
  const [show, setShow] = useState<Boolean>(true)

  const searchBooks = async (e: any) => {
    e.preventDefault()
    setBooks(await getBooks(search))
  }
  const BookItemsOpts = { books, setSelectI, overI, setOverI }
  const BookDescOpts = { addBook, book: books[selectI], show, setShow }

  const overlay = <BookDesc {...BookDescOpts} />

  const placement = "right-end"

  useEffect(() => {
    setShow(true)
  }, [selectI])
  return (
    <>
      <Form inline onSubmit={searchBooks}>
        <FormControl
          type="text"
          placeholder="Search"
          className="mr-sm-2"
          value={search}
          onChange={(e: any) => setSearch(e.target.value)}
        />
        <Button type="submit" variant="outline-success">
          Search
        </Button>
      </Form>
      {books.length && (
        <>
          <OverlayTrigger
            trigger="click"
            key={placement}
            rootCloseEvent={"mousedown"}
            rootClose={true}
            placement={placement}
            overlay={overlay}
          >
            <div>
              <BookItems {...BookItemsOpts} />
            </div>
          </OverlayTrigger>
        </>
      )}
    </>
  )
}
const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    addBook: async (id: string) => dispatch(await addBookToLib(id)),
  }
}

const mapStateToProps = (state: any) => {
  // console.log(state)
  const { library } = state
  return { library }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddBook)
