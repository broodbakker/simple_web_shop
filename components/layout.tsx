import React, { FunctionComponent, ReactNode } from 'react';
//components
import { Navbar } from ".//navbar"
import Footer from "./footer"

//constants
interface ILayout {
  children: ReactNode;
}

export const Layout: FunctionComponent<ILayout> = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  )
}



