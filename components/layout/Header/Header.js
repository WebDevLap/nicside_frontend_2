import { Icon } from '@iconify/react'
import { useRouter } from 'next/router'
import React, { useContext } from 'react'
import { CartContext } from '../../../contexts/CartContext'
import formatPrice from '../../../utils/formatPrice'
import styles from './Header.module.css'

const Header = () => {

  const [cart, setCart] = useContext(CartContext)

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

  return (
    <div className={styles.header}>
       <div className={styles.logo}>
            <img src='/VAPELOGO.svg'></img>
        </div> 
        {
          router.pathname != '/order' && (
            <>
              <div className={styles.search}>
                  <div className={styles.input__wrapper}>
                      <Icon icon="eva:search-fill" />
                      <input placeholder='Введите название или описание товара'></input>
                  </div>
                  <button className='primary__button'>Найти</button>
              </div>
              <div className={styles.cart__wrapper}>
                <div className={styles.cart}>
                  <Icon icon="akar-icons:cart" />
                  {cart?.length > 0 && <div className={styles.cart__amount}>{cart?.length}</div>}
                </div>
                <div>
                  {/* <h3>Итого</h3> */}
                  <h2>{formatPrice(summ)} бел. руб. </h2>
                  <button onClick={handleOrder} disabled={summ <= 0}>Оформить заказ</button>
                </div>
              </div>
            </>
          )
        }
    </div>
  )
}

export default Header