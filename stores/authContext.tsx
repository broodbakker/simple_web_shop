import { createContext, useState, useEffect } from "react";
import netlifyIdentity from "netlify-identity-widget"

interface IAuthContext {
  user: null | netlifyIdentity.User,
  login: () => void,
  logout: () => void,
  authReady: boolean

}
export const AuthContext = createContext<IAuthContext>({
  user: null,
  login: () => { },
  logout: () => { },
  authReady: false
})

interface IContext {
  children: JSX.Element,
}

export const AuthContextProvider = ({ children }: IContext) => {
  const [user, setUser] = useState<null | netlifyIdentity.User>(null)
  const [authReady, setAuthReady] = useState(true)
  useEffect(() => {
    netlifyIdentity.on("login", (user) => {
      setUser(user)
      netlifyIdentity.close();
    })

    netlifyIdentity.on("logout", () => {
      setUser(null)
    })

    netlifyIdentity.on("init", (user) => {
      setUser(user)
      setAuthReady(true)

    })
    netlifyIdentity.init()

    return () => {
      netlifyIdentity.off("login")
      netlifyIdentity.off("logout")
    }
  }, [])

  const login = () => {
    netlifyIdentity.open()
  }

  const logout = () => {
    netlifyIdentity.logout()
  }

  const context = { user, login, logout, authReady }

  return (
    <AuthContext.Provider value={context}>
      {children}
    </AuthContext.Provider>
  )
}