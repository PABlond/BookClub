import React from "react"
import { graphql, StaticQuery } from "gatsby"
import { navigate } from "gatsby"
import {
  StyledBackground,
  HomeContentContainer,
  HomeContentTitle,
  HomeContentSubTitle,
  HomeContentButton,
} from "../components/Styled"
import "../assets/scss/style.scss"
import "bootstrap/dist/css/bootstrap.min.css"
import Header from "../components/Header"
import Footer from '../components/Footer'

export default ({}) => {
  return (
    <StaticQuery
      query={graphql`
        query {
          desktop: file(relativePath: { eq: "bg-2.jpg" }) {
            childImageSharp {
              fluid(quality: 90, maxWidth: 1920) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
      `}
      render={data => {
        // Set ImageData.
        const imageData = [
          data.desktop.childImageSharp.fluid,
          `linear-gradient(rgba(0, 0, 0, 0.73), rgba(0, 0, 0, 0.73))`,
        ].reverse()
        return (
          <StyledBackground
            Tag="section"
            fluid={imageData}
            backgroundColor={`#040e18`}
            style={{ minHeight: "100vh" }}
          >
            <Header />
            <HomeContentContainer>
              <HomeContentTitle>Welcome to Bookclub</HomeContentTitle>
              <HomeContentSubTitle>
                SEE WHAT BOOKS ARE WAITING FOR YOU
              </HomeContentSubTitle>
              <HomeContentButton onClick={() => navigate('/login')}>JOIN FOR FREE</HomeContentButton>
            </HomeContentContainer>
            <Footer />
          </StyledBackground>
        )
      }}
    />
  )
}
