import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../../../contexts/CartContext'
import Header from '../../layout/Header/Header'
import {useRouter} from 'next/router'
import TableContainer from '../../Table/TableContainer'
import styles from './OrderScreen.module.css'
import formatPrice from '../../../utils/formatPrice'
import { AddressSuggestions } from 'react-dadata';
// import 'react-dadata/dist/react-dadata.css';

const OrderScreen = () => {

    const [cart, setCart] = useContext(CartContext)
    
    const [name, setName] = useState();
    const [phone, setPhone] = useState();
    const [address, setAddress] = useState();
    const [comment, setComment] = useState();

    const router = useRouter()

    function handleBack() {
        router.push('/')
    }

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
    

    useEffect(() => {

        if (cart.length == 0) {
            router.push('/')
        }
    }, [cart])

  return (
    <div className={styles.order__screen}>
        <Header></Header>
        <div>
            <button onClick={handleBack} style={{padding: 10, marginBottom: 20}} className='primary__button'>Назад</button>
        </div>
        <form>
            <div>
                <div className={styles.input_group}>
                    <label>Имя / Название организации</label>
                    <input onChange={(e) => {setName(e.target.value)}}></input>
                </div>
                <div className={styles.input_group}>
                    <label>Номер телефона</label>
                    <input onChange={(e) => {setPhone(e.target.value)}}></input>
                </div>
            </div>
            <div>
                {/* <div className={styles.input_group}>
                    <label>Фамилия</label>
                    <input></input>
                </div> */}
                <div className={styles.input_group}>
                    <label>Адрес</label>
                    <AddressSuggestions token="cccd906b9f52be8f1ee449484885f4327766041c" value={address} onChange={setAddress} />
                </div>
            </div>
            <div>
                <div className={styles.input_group}>
                    <label>Комментарий</label>
                    <textarea onChange={(e) => {setComment(e.target.value)}}></textarea>
                </div>
            </div>
        </form>
        <TableContainer data={cart}/>
        <div style={{display: 'flex', justifyContent: 'flex-end', marginTop: 20, alignItems: 'center'}}>
            Итого: <span style={{margin: '0 10px', fontSize: 24, fontWeight: 'bold'}}>{formatPrice(summ)}</span> бел. руб.
        </div>
        <div style={{display: 'flex', justifyContent: 'flex-end', marginTop: 20}}>
            <button disabled={phone == '' || name == '' || comment == '' || !address} style={{padding: 10, marginBottom: 20}} className='primary__button'>Подтвердить заказ</button>
        </div>
    </div>
  )
}

export default OrderScreen