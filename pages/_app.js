import { useState } from 'react';
import { CartContext } from '../contexts/CartContext'
import '../styles/globals.css'
import '../styles/dadata.css'
import Head from 'next/head';

function MyApp({ Component, pageProps }) {

  const [cartContext, setCartContext] = useState([]);



  return (
    <>
    <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0" />
    </Head>
    <CartContext.Provider value={[cartContext, setCartContext]}>
      <Component {...pageProps} />
    </CartContext.Provider>
    </>
  )
}

export default MyApp
