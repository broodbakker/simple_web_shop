import React from 'react';
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from '../styles/global'
// Modules
import { AppProps } from 'next/app';
//context
import { AuthContextProvider } from '../stores/authContext';
import { CartProvider } from 'use-shopping-cart'


const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={theme}>
      <AuthContextProvider>
        <CartProvider
          mode="payment"
          cartMode="client-only"
          stripe={process.env.STRIPE_PUBLISHABLE_KEY as string}
          successUrl={`${process.env.URL}/success.html`}
          cancelUrl={process.env.URL as string}
          currency="EUR"
          allowedCountries={['NL']}
          billingAddressCollection={true}
        >
          <Component {...pageProps} />
        </CartProvider>
      </AuthContextProvider>

    </ChakraProvider>
  );
};

export default MyApp;