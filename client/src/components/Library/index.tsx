import React, { useState, useEffect, Dispatch } from "react"
import { connect } from "react-redux"
import { ILibBook } from "../../interfaces/books.interface"
import getUserLib from "../../actions/library/getUserLib"
import getLibDetails from "../../services/queries/getLibDetails"
// import BookItems from "../BookItems"

const Library = ({
  library,
  getLib,
}: {
  library: ILibBook[]
  getLib: () => void
}) => {
  const [loading, setLoading] = useState<Boolean>(true)
  const [books, setBooks] = useState<any[]>([])
  // const [selectI, setSelectI] = useState<number>(0)

  const fetchDetails = async () => {
    console.log('he', await getLibDetails())
    setBooks(await getLibDetails())
    setLoading(false)
  }

  useEffect(() => {
    getLib()
  }, [])

  useEffect(() => {
    // if (library.length && Object.keys(library[0]).length && loading) {
    console.log("fetch")
    fetchDetails()
    // }
  }, [library, loading])

  console.log(library)

  // const BookItemsOpts = { books, setSelectI, selectI }

  return (
    <>
      {books.length ? (
        // <BookItems {...BookItemsOpts} />
        <p>zqdqzd</p>
      ) : !loading ? (
        <p>No book in you library yet</p>
      ) : (
        <p>Loading ...</p>
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
  // console.log(state)
  const { library } = state
  return { library }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Library)
