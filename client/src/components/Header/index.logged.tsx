import React from "react"
import { navigate } from "gatsby"
import { Navbar, Nav, Form, FormControl } from "react-bootstrap"
import { HeaderLogo, SearchBookButton } from "../Styled"
import { logout } from "../../actions/auth/helpers"

export default ({
  search,
  setSearch,
  searchBooks,
}: {
  search: string
  setSearch: (text: string) => void
  searchBooks: (e: any) => Promise<void>
}) => {

  return (
    <Navbar bg="transparent" expand="lg">
      <Navbar.Brand>
        <HeaderLogo onClick={() => navigate("/dashboard")}>BookClub</HeaderLogo>
      </Navbar.Brand>

      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Form inline onSubmit={searchBooks}>
          <FormControl
            type="text"
            placeholder="Add a Book to you library"
            className="mr-sm-2"
            value={search}
            onChange={(e: any) => setSearch(e.target.value)}
          />
          <SearchBookButton variant="outline-success">Search</SearchBookButton>
        </Form>
        <Nav className="justify-content-end" activeKey="/home">
          <Nav.Item>
            <Nav.Link onClick={logout} className="text-light">
              Logout
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}
