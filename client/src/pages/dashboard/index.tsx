import React from "react"
import LoggedLayout from "../../components/Layouts/LoggedLayout"
import AddBook from "../../components/AddBook"
import Library from "../../components/Library"

import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

export default ({}) => {
  return (
    <LoggedLayout>
      <Library />
      <AddBook />
    </LoggedLayout>
  )
}
