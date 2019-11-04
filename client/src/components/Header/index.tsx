import React from "react"
import { navigate } from "gatsby"
import { Navbar } from "react-bootstrap"
import { HeaderLogo, NavbarContainer } from "../Styled"

export default ({}) => {
  return (
    <NavbarContainer bg="transparent" expand="lg">
      <Navbar.Brand>
        <HeaderLogo onClick={() => navigate("/")}>BookClub</HeaderLogo>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav"></Navbar.Collapse>
    </NavbarContainer>
  )
}
