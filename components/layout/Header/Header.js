import { Icon } from '@iconify/react'
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../../../contexts/CartContext'
import { CategoryContext } from '../../../contexts/CategoryContext'
import { ProductContext } from '../../../contexts/ProductsContext'
import formatPrice from '../../../utils/formatPrice'
import styles from './Header.module.css'

const Header = () => {

  const [cart, setCart] = useContext(CartContext)
  const [products, setProducts] = useContext(ProductContext)
  const [search, setSearch] = useState('')


  const [category, setCategory] = useContext(CategoryContext)

  const fetchProducts = async () => {

    
    setProducts({
      products: [],
      isLoading: true
    })


    let products = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/entity/assortment?expand=product,product.images,images&limit=100&filter=${category?.search && 'search=' + category?.search + ';'}stockMode=positiveOnly${category?.category && ';pathname=' + category?.category}`, {
      headers: {
        'Authorization': 'e90e31c9edb91eb7a9907e90de541cecce642a76'
      }
    })
    products = await products.json()

    products = products?.rows?.map(item => item)

    
    products = products?.sort(function (a, b) {
        return (a?.product?.pathName)?.localeCompare(b?.product?.pathName);
    })

    products = products?.map(item => ({...item, salePrices: [...item?.salePrices?.map(price => ({...price, value: price?.value / 100})) ]}))

    setProducts({
      products,
      isLoading: false
    })

  }
  
  useEffect(() => {
    fetchProducts()
  }, [category])

  const router = useRouter()

  
  let default_summ = cart.reduce((prev, now) => {

    let s = now.salePrices?.[0]?.value * now.amount

    return prev + s
  }, 0)

  let summ = 0


  if (default_summ < 200) {
    summ = cart.reduce((prev, now) => {

      let s = now.salePrices?.[0]?.value * now.amount
  
      return prev + s
    }, 0)
  } else if (default_summ < 500) {
    summ = cart.reduce((prev, now) => {

      let s = now.salePrices?.[1]?.value * now.amount
  
      return prev + s
    }, 0)
  } else if (default_summ >= 500) {
    summ = cart.reduce((prev, now) => {

      let s = now.salePrices?.[2]?.value * now.amount
  
      return prev + s
    }, 0)
  }

  

  function handleOrder() {
    if (summ > 0) {
      router.push('/order')
    }
  }

  function handleSelect(e) {
    setCategory(prev => ({...prev, category: e.target.value}))
  }

  
  function handleSearch(e) {
    setSearch(e.target.value)
  }

  
  function handleFind(e) {
    setCategory(prev => ({...prev, search}))
  }

  function handleClean(e) {
    setSearch('')
    setCategory(prev => ({...prev, search: ''}))
  }

  return (
    <div className={styles.header}>
        <div className={styles.subheader}>
            <a >Доставка и оплата</a>
            <div className={styles.contacts}>
                  <Icon icon="logos:telegram" /> <a href="https://t.me/tar1karm">Чат Telegram</a>
            </div>
        </div>
        {router.pathname != '/order' && (
            <div className={styles.header_right}>
              <div>
                <div className={styles.search}>
                    <div className={styles.input__wrapper}>
                        <Icon className={styles.search__search_icon} icon="eva:search-fill" />
                        <input value={search} onInput={handleSearch} placeholder='Введите название или описание товара'></input>
                        {search && <Icon onClick={handleClean} className={styles.search__close_icon} icon="eva:close-fill" />}
                    </div>
                    <button className='primary__button' onClick={handleFind}>Найти</button>
                </div>
                <div className={styles.category__select}>
                    <select value={category} onChange={handleSelect}>
                      <option value="">Все</option>
                      <option value="Железо" >Железо</option>
                      <option value="Жидкость">Жидкость</option>
                      <option value="Расходники">Расходники</option>
                      <option value="Напитки">Напитки</option>
                    </select>
                </div>
              </div>
              
              <div>
                
              <div className={styles.logo}>
                    <img src='/VAPELOGO.svg'></img>
              </div> 
              <div className={styles.cart__wrapper}>
                
                <div className={styles.cart__info}>
                  {/* <h3>Итого</h3> */}
                  <h2>{formatPrice(summ)} бел. руб. </h2>
                  <button onClick={handleOrder} disabled={summ <= 0}>Оформить заказ</button>
                </div>
                
                <div className={styles.cart}>
                  
                  <Icon icon="akar-icons:cart" />
                  {cart?.length > 0 && <div className={styles.cart__amount}>{cart?.length}</div>}
                </div>
              </div>
              </div>
            </div>
          )
        }
    </div>
  )
}

export default Header