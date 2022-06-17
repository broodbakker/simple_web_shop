import React, { useContext, useEffect } from 'react'
//context
import { AuthContext } from "../../stores/authContext"
import { useState } from 'react';
//api
import { FetchUser } from "../api"

export const useAuth = () => {
  const { user, login, logout, authReady } = useContext(AuthContext)
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (authReady) {
      FetchUser(user).then(res => {
        if (!res.ok) {
          throw Error('You must be logged in to view this content')
        }
        return res.json()
      })
        .then(data => {
          console.log(data)
          setError(null)
          setData(data)
        })
        .catch(err => {
          console.log(err.message)
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