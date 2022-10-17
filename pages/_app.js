import { useEffect, useState } from 'react';
import { CartContext } from '../contexts/CartContext'
import '../styles/globals.css'
import '../styles/dadata.css'
import Head from 'next/head';
import { ProductContext } from '../contexts/ProductsContext';
import { CategoryContext } from '../contexts/CategoryContext';
import dynamic from 'next/dynamic'

function MyApp({ Component, pageProps }) {

  const [cartContext, setCartContext] = useState([]);
  const [productContext, setProductContext] = useState({
    products: [],
    isLoading: false
  });
  const [categoryContext, setCategoryContext] = useState({
    category: '',
    search: '',
    offset: 0
  });


  const [notAlreadyExecuted, setNotAlreadyExecuted] = useState(true);
  useEffect(() => {
    if (notAlreadyExecuted) {
      setNotAlreadyExecuted(false);
    } 
  }, [])

  return (
    <>
    {notAlreadyExecuted ? (
      null
    ) : (
      <>
      <Head>
        <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0" />
        <title>PLUG OPT - Оптовый прайс</title>
      </Head>
      <CategoryContext.Provider value={[categoryContext, setCategoryContext]}>
        <ProductContext.Provider value={[productContext, setProductContext]}>
          <CartContext.Provider value={[cartContext, setCartContext]}>
            <Component {...pageProps} />
          </CartContext.Provider>
        </ProductContext.Provider>
      </CategoryContext.Provider>
      </>
    )}
    </>
  )
}


export default MyApp
