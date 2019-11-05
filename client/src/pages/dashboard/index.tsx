import React, { useState } from "react"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import getBooks from "../../services/queries/searchBooks"
import { IBook } from "../../interfaces/books.interface"

import LoggedLayout from "../../components/Layouts/LoggedLayout"
import AddBook from "../../components/AddBook"
import Library from "../../components/Library"
import Header from "../../components/Header/index.logged"

export default ({}) => {
  const [books, setBooks] = useState<IBook[]>([])
  const [search, setSearch] = useState<string>("")

  const searchBooks = async (e: any) => {
    e.preventDefault()
    setBooks(await getBooks(search))
  }

  const headerOpts = { search, setSearch, searchBooks }
  const addBooksOpts = { books }

  return (
    <LoggedLayout>
      <Header {...headerOpts} />
      <AddBook {...addBooksOpts} />
      <Library />
    </LoggedLayout>
  )
}
