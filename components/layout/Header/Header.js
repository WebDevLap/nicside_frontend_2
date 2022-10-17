import { Icon } from '@iconify/react'
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import ReactModal from 'react-modal'
import { CartContext } from '../../../contexts/CartContext'
import { CategoryContext } from '../../../contexts/CategoryContext'
import { ProductContext } from '../../../contexts/ProductsContext'
import formatPrice from '../../../utils/formatPrice'
import styles from './Header.module.css'

const Header = () => {

  
const customStyles = {
  overlay: {
    overflow: 'hidden'
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    minWidth: '320px',
    width: '40%',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

  const [cart, setCart] = useContext(CartContext)
  const [products, setProducts] = useContext(ProductContext)
  const [search, setSearch] = useState('')

  
  const [modalIsOpen, setIsOpen] = useState(false);


  function openModal() {
      setIsOpen(true);
    }

    function closeModal() {
      setIsOpen(false);
    }


  const [category, setCategory] = useContext(CategoryContext)

  const fetchProducts = async () => {


    setProducts(prev => ({
      ...prev,
      isLoading: true,
    }))

    console.log(products)


    let newProducts = await fetch(`/api/assortment?offset=${category?.offset }&${category?.search && 'search=' + category?.search + '&'}${category?.category && 'category=' + category?.category}`)

    let categories = await fetch(`/api/categories`)


    newProducts = await newProducts.json()
    categories = await categories.json()

    let size = newProducts?.meta?.size

    newProducts = newProducts?.rows?.map(item => item)
    categories = categories?.rows?.map(item => item)

    
    newProducts = category?.offset == 0 ? newProducts : [...products?.products, ...newProducts]

    
    newProducts = newProducts?.sort(function (a, b) {
      if (a?.product?.pathName == b?.product?.pathName) {
        return (a?.product?.name)?.localeCompare(b?.product?.name) ;
      }
  })
    
    // newProducts = newProducts?.sort(function (a, b) {
    //     return (a?.product?.pathName)?.localeCompare(b?.product?.pathName);
    // })

    newProducts = newProducts?.map(item => ({...item, salePrices: [...item?.salePrices?.map(price => ({...price, value: price?.value / 100})) ]}))



    setProducts({
      products: newProducts,
      size,
      isLoading: false,
      categories
    })

  }

  

  
  useEffect(() => {

    console.log(products?.isLoading)
  
  
      fetchProducts()

    
  }, [category.category, category.search, category.offset])

  

  

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

    if (!products?.isLoading) {
      

      setProducts((prev) => ({
        products: [],
        size: 0,
        isLoading: true,
        categories: products?.categories
      }))

      setCategory(prev => ({...prev, category: e.target.value, offset: 0}))
    }
  }

  
  function handleSearch(e) {

      setSearch(e.target.value)
  }

  
  function handleFind(e) {
    if (!products?.isLoading) {

      
      setProducts((prev) => ({
        products: [],
        size: 0,
        isLoading: true,
        categories: products?.categories
      }))
      

      setCategory(prev => ({...prev, search, offset: 0}))
    }
  }

  function handleClean(e) {

    if (!products?.isLoading) {
      
      setProducts((prev) => ({
        products: [],
        size: 0,
        isLoading: true,
        categories: products?.categories
      }))
      
    setSearch('')
    setCategory(prev => ({...prev, search: '', offset: 0}))
    }
  }

  return (
    <div className={styles.header}>
        <div className={styles.subheader}>
          
            <ReactModal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
                bodyOpenClassName="preventScroll"
            >
                <h2  style={{ marginBottom: 20}}>Доставка и оплата</h2>
                <form>
                <p>Минимальная сумма заказа - 100р</p>
                <p>Заказы отправляем как с наложенным платежом, так и по предоплате транспортными компаниями Autolight, Европочта, Белпочта</p>
                <b>По предоплате доставка осуществляется бесплатно</b>
                
                </form>
                
                <button style={{padding: '6px 10px', marginTop: 20}} className='primary__button' onClick={closeModal}>Закрыть</button>
            </ReactModal>
            <a onClick={openModal}>Доставка и оплата</a>
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