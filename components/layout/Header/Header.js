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


  const [category, setCategory] = useContext(CategoryContext)

  const fetchProducts = async () => {
    let products = await fetch(`http://localhost:8080/online.moysklad.ru/api/remap/1.2/entity/product?filter=${category && 'pathName=' + category}`, {
        headers: {
          'Authorization': 'e90e31c9edb91eb7a9907e90de541cecce642a76'
        }
      })
      products = await products.json()

      products = products?.rows?.map(item => item)

      
      products = products.sort(function (a, b) {
          return (a?.pathName).localeCompare(b?.pathName);
      })

      setProducts(products)

  }
  
  useEffect(() => {
    fetchProducts()
  }, [category])

  const router = useRouter()

  let summ = cart.reduce((prev, now) => {

    let s = now.price * now.amount

    return prev + s
  }, 0)

  function handleOrder() {
    if (summ > 0) {
      router.push('/order')
    }
  }

  function handleSelect(e) {
    setCategory(e.target.value)
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
                        <Icon icon="eva:search-fill" />
                        <input placeholder='Введите название или описание товара'></input>
                    </div>
                    <button className='primary__button'>Найти</button>
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