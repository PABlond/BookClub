import React, { useState, useEffect, Dispatch } from "react"
import { connect } from "react-redux"
import { ILibBook } from "../../interfaces/books.interface"
import getUserLib from "../../actions/library/getUserLib"
import getLibDetails from "../../services/queries/getLibDetails"

import Loading from "../Loading"
import BookItems from "../BookItems"
import { OverlayTrigger } from "react-bootstrap"
import BookDesc from "../BookDesc"
import { AddLibButton } from "../Styled"
import { FaTrashAlt } from "react-icons/fa"

const Library = ({
  library,
  getLib,
}: {
  library: ILibBook[]
  getLib: () => void
}) => {
  const [loading, setLoading] = useState<Boolean>(true)
  const [books, setBooks] = useState<any[]>([])
  const [overI, setOverI] = useState<number>(0)
  const [selectI, setSelectI] = useState<number>(0)
  const [show, setShow] = useState<Boolean>(true)

  const fetchDetails = async () => {
    setBooks(await getLibDetails())
    setLoading(false)
  }

  const BookItemsOpts = {
    books,
    setSelectI,
    overI,
    setOverI,
    title: "Your library",
  }
  const BookDescOpts = { book: books[selectI], show, setShow }

  const placement = "right-end"

  useEffect(() => {
    getLib()
  }, [])

  useEffect(() => {
    if (library.length && !Object.keys(library[0]).length && loading) {
      fetchDetails()
    }
  }, [books, library, loading])

  return (
    <>
      {books.length ? (
        <OverlayTrigger
          trigger="click"
          key={placement}
          rootCloseEvent={"mousedown"}
          rootClose={true}
          placement={placement}
          overlay={
            <BookDesc {...BookDescOpts}>
              <AddLibButton onClick={() => console.log(books[selectI].id)}>
                <FaTrashAlt size={"19px"} /> Delete
              </AddLibButton>
            </BookDesc>
          }
        >
          <BookItems {...BookItemsOpts} />
        </OverlayTrigger>
      ) : !loading ? (
        <p>No book in you library yet</p>
      ) : (
        <Loading />
      )}
    </>
  )
}

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    getLib: async () => dispatch(await getUserLib()),
  }
}

const mapStateToProps = (state: any) => {
  const { library } = state
  return { library }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Library)
