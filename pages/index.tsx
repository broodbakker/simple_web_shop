import React, { useContext } from 'react'
//context
import { AuthContext } from "../stores/authContext"

const Home = () => {
  const { user, login, logout } = useContext(AuthContext)
  return (
    <div>
      test2

      <button onClick={login}>login</button>
      <button onClick={logout}>logout</button>
    </div>
  )
}

export default Home