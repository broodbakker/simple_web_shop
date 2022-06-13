import React, { useContext, useEffect } from 'react'
//context
import { AuthContext } from "../stores/authContext"
import { useState } from 'react';

import netlifyIdentity from "netlify-identity-widget"

const testFetch = (user: null | netlifyIdentity.User) => fetch("/.netlify/functions/user", {
  headers: {
    Authorization: `Bearer ${user?.token?.access_token}`
  }
})
  .then(res => {
    return res.json()
  })

const useAuth = () => {
  const { user, login, logout, authReady } = useContext(AuthContext)
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);


  useEffect(() => {
    if (authReady) {

      testFetch(user).then(res => {
        if (!res.ok) {
          login()
          throw Error('You must be logged in to view this content')
        }
        return res.json()
      })
        .then(data => {
          setError(null)
          setData(data)
        })
        .catch(err => {
          setError(err.message)
          setData(null)
        })
    }

  }, [user, authReady])

  return {
    authReady,
    user,
    login,
    logout,
  };
}
const Home = () => {
  const {
    authReady,
    user,
    login,
    logout,
  } = useAuth();

  return (
    <div>

      {authReady &&
        <>
          {!user && <button onClick={login}>login</button>}
          {user && <button onClick={logout}>logout</button>}
          <h2> {`Welcome ${user ? user.email : "guest"}`}</h2>
        </>
      }
    </div>
  )
}



export default Home