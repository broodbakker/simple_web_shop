import React, { useContext, useEffect } from 'react'
//context
import { AuthContext } from "../stores/authContext"
import { useState } from 'react';

const Home = () => {
  const { user, login, logout, authReady } = useContext(AuthContext)
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);


  useEffect(() => {
    if (authReady) {
      fetch("/.netlify/functions/user", authReady && {
        headers: {
          Authorization: `Bearer ${user?.token?.access_token}`
        }
      })
        .then(res => {
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

  console.log(user, "user")
  return (
    <div>
      test2

      {authReady &&
        <>
          {!user && <button onClick={login}>login</button>}
          {user && <button onClick={logout}>logout</button>}
        </>
      }





    </div>
  )
}



export default Home