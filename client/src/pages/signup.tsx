import React, { useEffect, useState, Dispatch } from "react"
import { graphql, StaticQuery, navigate } from "gatsby"
import { ISignup } from "../interfaces/auth.interface"
import { connect } from "react-redux"
import signup from "../actions/auth/signup"

import {
  LoginInner,
  LoginContainer,
  LoginTitle,
  AuthLabel,
  AuthInput,
  RedButton,
  AuthSubmitContainer,
  AuthText,
  AuthLink,
  AuthError,
} from "../components/Styled"
import Header from "../components/Header"
import Footer from "../components/Footer"
import BackgroundImage from "gatsby-background-image"
import { Form } from "react-bootstrap"

const SignupPage = ({
  dispatchSignup,
  error,
  username,
}: {
  dispatchSignup: (user: ISignup) => void
  error: string
  username: string
}) => {
  const initialFormContent = {
    username: "",
    password: "",
    confirmation: "",
  }
  const [formContent, setFormContent] = useState<ISignup>(initialFormContent)
  const [authError, setAuthError] = useState<string | undefined>(undefined)

  const handleSignup = async (e: any) => {
    e.preventDefault()
    setAuthError(undefined)
    await dispatchSignup(formContent)
  }

  useEffect(() => {
    if (error.length) setAuthError(error)
  }, [error])

  useEffect(() => {
    if (username.length) navigate("/dashboard")
  }, [username])

  return (
    <StaticQuery
      query={graphql`
        query {
          desktop: file(relativePath: { eq: "bg-3.jpg" }) {
            childImageSharp {
              fluid(quality: 90, maxWidth: 1920) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
      `}
      render={data => {
        const imageData = [
          data.desktop.childImageSharp.fluid,
          `linear-gradient(rgba(0, 0, 0, 0.73), rgba(0, 0, 0, 0.73))`,
        ].reverse()
        return (
          <BackgroundImage
            Tag="section"
            fluid={imageData}
            backgroundColor={`#040e18`}
            style={{ minHeight: "100vh" }}
          >
            <Header />
            <LoginContainer>
              <LoginInner>
                <LoginTitle>Sign Up to Bookclub</LoginTitle>

                <Form onSubmit={handleSignup}>
                  <Form.Group controlId="formBasicEmail">
                    <AuthLabel>Username</AuthLabel>
                    <AuthInput
                      type="text"
                      placeholder="Enter usename"
                      name="username"
                      value={formContent.username}
                      onChange={(e: any) =>
                        setFormContent({
                          ...formContent,
                          username: e.target.value,
                        })
                      }
                    />
                    <Form.Text className="text-muted">
                      We'll never share your email with anyone else.
                    </Form.Text>
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword">
                    <AuthLabel>Password</AuthLabel>
                    <AuthInput
                      type="password"
                      placeholder="Password"
                      name="password"
                      value={formContent.password}
                      onChange={(e: any) =>
                        setFormContent({
                          ...formContent,
                          password: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                  <Form.Group controlId="formBasicConfirm">
                    <AuthLabel>Password</AuthLabel>
                    <AuthInput
                      type="password"
                      placeholder="Password"
                      name="confirmation"
                      value={formContent.confirmation}
                      onChange={(e: any) =>
                        setFormContent({
                          ...formContent,
                          confirmation: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                  <AuthSubmitContainer>
                    <RedButton block variant="danger" type="submit">
                      Sign Up
                    </RedButton>
                  </AuthSubmitContainer>
                  {authError && <AuthError>{authError}</AuthError>}
                </Form>

                <AuthText>
                  Already have an account ?
                  <AuthLink onClick={() => navigate("/login")} title="signin">
                    Sign In
                  </AuthLink>
                </AuthText>
              </LoginInner>
            </LoginContainer>
            <Footer />
          </BackgroundImage>
        )
      }}
    />
  )
}

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    dispatchSignup: async (user: ISignup) => {
      return dispatch(await signup(user))
    },
  }
}

const mapStateToProps = (state: any) => {
  const {
    auth: { error, username },
  } = state
  return { error, username }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignupPage)
