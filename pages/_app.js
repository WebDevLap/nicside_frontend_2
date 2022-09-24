import { useState } from 'react';
import { CartContext } from '../contexts/CartContext'
import '../styles/globals.css'
import '../styles/dadata.css'

function MyApp({ Component, pageProps }) {

  const [cartContext, setCartContext] = useState([]);



  return (
    <CartContext.Provider value={[cartContext, setCartContext]}>
      <Component {...pageProps} />
    </CartContext.Provider>
  )
}

export default MyApp
