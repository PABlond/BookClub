const { API_URL: apiUrl } = process.env

export const routes = {
  login: { name: "LOGIN", url: `${apiUrl}/user` },
  signup: { name: "SIGNUP", url: `${apiUrl}/user` },
  user: {name: "USER_INFO", url: `${apiUrl}/user`},
  authErr: { name: "AUTH_ERROR" },

  getBooks: {url: `${apiUrl}/books`},

  addBookToLib: {url: `${apiUrl}/user/book`, name: "ADD_BOOK_TO_LIBRARY"},
  getUserLib: {url: `${apiUrl}/user/book`, name: "GET_USER_LIBRARY"},
  getLibDetails: {url: `${apiUrl}/user/book/details`}
}
