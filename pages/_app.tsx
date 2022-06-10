import React from 'react';
import { ChakraProvider } from '@chakra-ui/react'
import Script from 'next/script'
import Head from "next/head";
import { theme } from '../styles/global'
// Modules
import { AppProps } from 'next/app';
//context
import { AuthContextProvider } from '../stores/authContext';

// import * as gtag from "../lib/gtag ";
const isProduction = process.env.NODE_ENV === "production";

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {

  return (
    <ChakraProvider theme={theme}>
      <AuthContextProvider>
        <Component {...pageProps} />
      </AuthContextProvider>

    </ChakraProvider>
  );
};

export default MyApp;