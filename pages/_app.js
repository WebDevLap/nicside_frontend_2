import { useState } from 'react';
import { CartContext } from '../contexts/CartContext'
import '../styles/globals.css'
import '../styles/dadata.css'
import Head from 'next/head';
import { ProductContext } from '../contexts/ProductsContext';
import { CategoryContext } from '../contexts/CategoryContext';

function MyApp({ Component, pageProps }) {

  const [cartContext, setCartContext] = useState([]);
  const [productContext, setProductContext] = useState([]);
  const [categoryContext, setCategoryContext] = useState('');



  return (
    <>
    <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0" />
    </Head>
    <CategoryContext.Provider value={[categoryContext, setCategoryContext]}>
      <ProductContext.Provider value={[productContext, setProductContext]}>
        <CartContext.Provider value={[cartContext, setCartContext]}>
          <Component {...pageProps} />
        </CartContext.Provider>
      </ProductContext.Provider>
    </CategoryContext.Provider>
    </>
  )
}

export default MyApp
