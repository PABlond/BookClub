import styled from "styled-components"
import BackgroundImage from "gatsby-background-image"
import { Container, Row, Col, Button, Navbar, Form } from "react-bootstrap"

const colors = {
  light: "#f8f9fa",
  dark: "#141414",
  red: "#ff0f1a",
  grey: "#333",
}

export const NavbarContainer = styled(Navbar)`
  width: 100%;
  z-index: 3;
  position: absolute !important;
`

export const HeaderLogo = styled.h1`
  font-size: 4rem;
  font-family: "Fjalla One", sans-serif;
  color: ${colors.light};
`

export const StyledBackground = styled(BackgroundImage)`
  /* display: flex;
  align-items: start;
  flex-direction: column;
  justify-content: center; */
`

export const HomeContentContainer = styled.div`
  padding-left: 15px;
  width: 100%;
  position: absolute;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
`
export const HomeContentTitle = styled.h1`
  font-size: 3.2rem;
  font-weight: 800;
  color: ${colors.light};
`

export const HomeContentSubTitle = styled.h3`
  color: ${colors.light};
  font-weight: 500;
`

export const HomeContentButton = styled(Button)`
  padding: 10px 30px !important;
  background: ${colors.red}!important;
  border: 0 !important;

  &:focus {
    border: 0 !important;
    box-shadow: none !important;
  }
`

export const FooterContainer = styled.div`
  position: absolute;
  width: 100%;
  bottom: 0;
`

export const FooterText = styled.p`
  text-align: center;
  color: ${colors.light};
`
export const LoginContainer = styled.div`
  padding-left: 15px;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  min-height: 100vh;
`

export const LoginInner = styled.div`
  padding: 4rem 2rem;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 5px;
`

export const LoginTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  color: ${colors.light};
  margin-bottom: 3rem;
`

export const AuthLabel = styled(Form.Label)`
  color: ${colors.light};
`

export const AuthInput = styled(Form.Control)`
  background-color: ${colors.grey}!important;
  color: ${colors.light}!important;
  border: none !important;

  &:focus {
    border: 1px solid ${colors.red}!important;
    box-shadow: none !important;
  }
`

export const AuthSubmitContainer = styled.div`
  margin-top: 3rem;
`

export const RedButton = styled(Button)`
  background-color: ${colors.red}!important;
`

export const AuthText = styled.p`
  margin-top: 2rem;
  color: ${colors.light};
`

export const AuthLink = styled.a`
  color: ${colors.red}!important;
  margin: 0 1rem;
`

export const AuthError = styled.p`
  margin-top: 1rem;
  text-align: center;
  color: ${colors.red};
`

export const AddBookDesc = styled(Container)`
  /* border-top: 1px solid ${colors.light}; */
  border-bottom: 1px solid ${colors.light};
  margin-top: -100px;
`

export const AddBookTitle = styled.h3`
  text-align: center;
`

export const AddBookRow = styled(Row)`
  align-items: center;
  padding: 2rem 0;
`

export const AddBookContainer = styled(Container)`
  margin: 2rem 0;
`

export const BookItemsTitle = styled.h3``

export const AddLibButton = styled(Button)`
  padding: 10px 30px !important;
  background: ${colors.red}!important;
  border: 0 !important;

  &:focus {
    border: 0 !important;
    box-shadow: none !important;
  }
`

export const PopOverCloseButton = styled(Button)`
  padding: 10px 30px !important;
  background: ${colors.light}!important;
  color: ${colors.red}!important;
  border: 1px solid ${colors.red} !important;

  &:focus {
    border: 0 !important;
    box-shadow: none !important;
  }
`

export const CenterCol = styled(Col)`
  display: flex;
  justify-content: center;
  align-items: center;
`

export const SearchBookButton = styled(Button)`
  padding: 10px 30px !important;
  background: ${colors.dark}!important;
  color: ${colors.red}!important;
  border: 1px solid ${colors.red} !important;

  &:hover {
    background: ${colors.red} !important;
    color: ${colors.light} !important;
    border: 1px solid ${colors.light} !important;
  }
`
