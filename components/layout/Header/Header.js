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
      isLoading: true,
      categories: products?.categories
    })


    let newProducts = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/entity/assortment?expand=product,product.images,images&limit=100&filter=${category?.search && 'search=' + category?.search + ';'}stockMode=positiveOnly;stockStore=https://online.moysklad.ru/api/remap/1.2/entity/store/8179a7a1-c29d-11eb-0a80-048e00039ac0;quantityMode=positiveOnly${category?.category && ';pathname=' + category?.category}`, {
      headers: {
        'Authorization': 'f57f5925ec35cc1d94f1aff9bb4c6cf25c261deb'
      }
    })

    let categories = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/entity/productfolder`, {
      headers: {
        'Authorization': 'f57f5925ec35cc1d94f1aff9bb4c6cf25c261deb'
      }
    })


    newProducts = await newProducts.json()
    categories = await categories.json()

    newProducts = newProducts?.rows?.map(item => item)
    categories = categories?.rows?.map(item => item)
    
    newProducts = newProducts?.sort(function (a, b) {
        return (a?.product?.pathName)?.localeCompare(b?.product?.pathName);
    })

    newProducts = newProducts?.map(item => ({...item, salePrices: [...item?.salePrices?.map(price => ({...price, value: price?.value / 100})) ]}))

    setProducts({
      products: newProducts,
      isLoading: false,
      categories
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

  function setPrice(default_summ) {
    
    if (default_summ < 200) {
      summ = cart.reduce((prev, now) => {

        let s = now.salePrices?.[0]?.value * now.amount
    
        return prev + s
      }, 0)
    } else if (default_summ < 500) {

      let actualSumm =  cart.reduce((prev, now) => {

        let s = now.salePrices?.[1]?.value * now.amount
    
        return prev + s
      }, 0)

      
      if (actualSumm < 200) {
        setPrice(actualSumm)
      } else {
        summ = actualSumm
      }



    } else if (default_summ >= 500) {

      
      let actualSumm = cart.reduce((prev, now) => {

        let s = now.salePrices?.[2]?.value * now.amount
    
        return prev + s
      }, 0)

      if (actualSumm < 500) {
        setPrice(actualSumm)
      } else {
        summ = actualSumm
      }


      
    }

  }
  
  setPrice(default_summ)

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
                  <Icon icon="logos:telegram" /> <a href="https://t.me/plug_opt">Канал Telegram</a>
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
                    <select value={category?.category} onChange={handleSelect}>
                      <option value="">Все</option>
                      {products?.categories?.map(cat => (
                        <option key={cat?.id} value={cat?.name} >{cat?.name}</option>
                      ))}
                      {/* <option value="Жидкость">Жидкость</option>
                      <option value="Расходники">Расходники</option>
                      <option value="Напитки">Напитки</option> */}
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