import React, { useContext } from 'react'
//context
import { AuthContext } from "../stores/authContext"

const Home = () => {
  const { user, login } = useContext(AuthContext)
  return (
    <div>
      test

      <button onClick={login}>button</button>
    </div>
  )
}

export default Home