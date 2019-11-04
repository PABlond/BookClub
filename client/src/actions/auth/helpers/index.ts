const tokenName = "bookClub"

const isWindow = typeof window !== "undefined"

export const setToken = (token: string) => {
  if (isWindow) window.localStorage.setItem(tokenName, token)
}

export const getToken = () => isWindow 
  ? window.localStorage.getItem(tokenName) || ""
  : ""