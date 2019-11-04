import React, { useState, useEffect, Dispatch } from "react"
import { navigate } from "gatsby"
import { connect } from "react-redux"
import getUser from "../../actions/auth/user"
import { getToken } from "../../actions/auth/helpers/index"

const LoggedLayout = ({
  dispatchUserInfo,
  children,
  username,
  error,
}: {
  dispatchUserInfo: () => void
  children: any
  username: string
  error: string
}) => {
  const [loading, setLoading] = useState<Boolean>(false)

  useEffect(() => {
    if (!!getToken()) {
      if (!username.length) {
        setLoading(true)
        dispatchUserInfo()
      } else setLoading(false)
    } else navigate("/login")
  }, [username])

  useEffect(() => {
    if (error.length) navigate("/login")
  }, [error])

  return loading ? <p>Loading ...</p> : <>{children}</>
}

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    dispatchUserInfo: async () => {
      return dispatch(await getUser())
    },
  }
}

const mapStateToProps = (state: any) => {
  // console.log(state)
  const {
    auth: { error, username },
  } = state
  return { error, username }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoggedLayout)
