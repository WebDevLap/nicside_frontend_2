import React, { useContext, useEffect } from 'react'
import { CartContext } from '../../../contexts/CartContext'
import Header from '../../layout/Header/Header'
import {useRouter} from 'next/router'
import TableContainer from '../../Table/TableContainer'
import styles from './OrderScreen.module.css'
import formatPrice from '../../../utils/formatPrice'

const OrderScreen = () => {

    const [cart, setCart] = useContext(CartContext)

    const router = useRouter()

    function handleBack() {
        router.push('/')
    }

    let summ = cart.reduce((prev, now) => {

        let s = now.price * now.amount
    
        return prev + s
    }, 0)

    useEffect(() => {

        if (cart.length == 0) {
            router.push('/')
        }
    }, [cart])

  return (
    <div>
        <Header></Header>
        <div>
            <button onClick={handleBack} style={{padding: 10, marginBottom: 20}} className='primary__button'>Назад</button>
        </div>
        <form>
            <div className={styles.input_group}>
                <label>Имя</label>
                <input></input>
            </div>
            <div className={styles.input_group}>
                <label>Фамилия</label>
                <input></input>
            </div>
            <div className={styles.input_group}>
                <label>Номер телефона</label>
                <input></input>
            </div>
        </form>
        <TableContainer data={cart}/>
        <div style={{display: 'flex', justifyContent: 'flex-end', marginTop: 20, alignItems: 'center'}}>
            Итого: <span style={{margin: '0 10px', fontSize: 24, fontWeight: 'bold'}}>{formatPrice(summ)}</span> бел. руб.
        </div>
        <div style={{display: 'flex', justifyContent: 'flex-end', marginTop: 20}}>
            <button style={{padding: 10, marginBottom: 20}} className='primary__button'>Подтвердить заказ</button>
        </div>
    </div>
  )
}

export default OrderScreen