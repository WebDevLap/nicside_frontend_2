import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../../../contexts/CartContext'
import Header from '../../layout/Header/Header'
import {useRouter} from 'next/router'
import TableContainer from '../../Table/TableContainer'
import styles from './OrderScreen.module.css'
import formatPrice from '../../../utils/formatPrice'
import { AddressSuggestions } from 'react-dadata';
import ReactLoader from 'react-loader'
// import 'react-dadata/dist/react-dadata.css';

const OrderScreen = () => {

    const [cart, setCart] = useContext(CartContext)
    
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState();
    const [addressInput, setAddressInput] = useState('');
    const [comment, setComment] = useState('');
    const [isLoading, setIsLoading] = useState(false)

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


    function handleDaData(value) {
      // console.log(value)
      setAddress(value)
    }

    function handleAddressInput(e) {
      setAddressInput(e.target.value)
      // console.log(e.target.value)
    }

    async function handleSubmit() {
      if (!(phone == '' || name == '' || comment == '' || !addressInput)) {

        let settings = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/context/usersettings`, {
          headers: {
            'Authorization': 'f57f5925ec35cc1d94f1aff9bb4c6cf25c261deb'
          }
        })

        settings = await settings.json()

        console.log(settings)

        let orderPositions = cart?.map(position => {
          console.log(position)

          let actualPrice = 0

          if (default_summ < 200) {
            actualPrice = position?.salePrices?.[0]?.value
          } else if (default_summ < 500) {
            actualPrice = position?.salePrices?.[1]?.value
          } else if (default_summ >= 500) {
            actualPrice = position?.salePrices?.[2]?.value
          }

          return {
            quantity: position?.amount,
            price: actualPrice * 100,
            assortment: position
          }


        })

        setIsLoading(true)

        let orderData = {
          organization: settings?.defaultCompany,
          agent: settings?.defaultCustomerCounterparty,
          positions: orderPositions,
          shipmentAddress: addressInput,
          description: `
          Покупатель: ${name}
Номер телефона: ${phone}
Адрес ${addressInput}
Сообщение ${comment}
          `
        }
        console.log(orderData)

        let order = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/entity/customerorder`, {
          method: 'POST',
          headers: {
            'Authorization': 'f57f5925ec35cc1d94f1aff9bb4c6cf25c261deb',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(orderData)
        })

        order = await order.json()

        console.log(order)

        if (order) {
          setIsLoading(false)
          setCart([])
          router.push('/')
        }


      }
    }

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
                    <AddressSuggestions 
                      filterLocations={{ "country": "Беларусь" }}
                      token="cccd906b9f52be8f1ee449484885f4327766041c" 
                      inputProps={{
                        onInput: handleAddressInput
                      }} 
                      value={address} 
                      onChange={handleDaData} 
                    />
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
          <ReactLoader loaded={!isLoading}>
            <button onClick={handleSubmit} disabled={phone == '' || name == '' || comment == '' || !addressInput} style={{padding: 10, marginBottom: 20}} className='primary__button'>Подтвердить заказ</button>
          </ReactLoader>
        </div>
    </div>
  )
}

export default OrderScreen