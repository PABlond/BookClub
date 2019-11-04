import React from "react"
import { FooterContainer, FooterText } from "../Styled"

export default () => {
  return (
    <FooterContainer>
      <FooterText>
        &copy; Copyright {new Date().getFullYear()} Pierre-Alexis Blond, All Rights Reserved
      </FooterText>
    </FooterContainer>
  )
}
