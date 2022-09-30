import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../../../contexts/CartContext'
import Header from '../../layout/Header/Header'
import {useRouter} from 'next/router'
import TableContainer from '../../Table/TableContainer'
import styles from './OrderScreen.module.css'
import formatPrice from '../../../utils/formatPrice'
import { AddressSuggestions } from 'react-dadata';
import ReactLoader from 'react-loader'
import ReactInputMask from 'react-input-mask'
import ReCAPTCHA from 'react-google-recaptcha'
// import 'react-dadata/dist/react-dadata.css';

const OrderScreen = () => {

    const [cart, setCart] = useContext(CartContext)
    
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState();
    const [addressInput, setAddressInput] = useState('');
    const [comment, setComment] = useState('');
    const [isLoading, setIsLoading] = useState(false)
    const [isVerified, setIsVerified] = useState(true)

    const router = useRouter()

    function handleBack() {
        router.push('/')
    }

    let default_summ = cart.reduce((prev, now) => {

        let s = now.salePrices?.[0]?.value * now.amount
    
        return prev + s
      }, 0)
    
      let summ = 0
    
      function setPrice() {
        
        if (default_summ < 200) {
          summ = cart.reduce((prev, now) => {
      
            let s = now.salePrices?.[0]?.value * now.amount
        
            return prev + s
          }, 0)

          
        } else if (default_summ < 500) {

          
          let actualSumm = cart.reduce((prev, now) => {
      
            let s = now.salePrices?.[1]?.value * now.amount
        
            return prev + s
          }, 0)

          if (actualSumm < 200) {
            default_summ = actualSumm
            setPrice()
          } else {
            summ = actualSumm
          }


          

        } else if (default_summ >= 500) {

          
          let actualSumm = cart.reduce((prev, now) => {
      
            let s = now.salePrices?.[2]?.value * now.amount
        
            return prev + s
          }, 0)

          if (actualSumm < 500) {
            default_summ = actualSumm
            setPrice()
          } else {
            summ = actualSumm
          }


          

        }
    
      }

      setPrice()

    useEffect(() => {

        if (cart.length == 0) {
            router.push('/')
        }
    }, [cart])

    useEffect(() => {
      if (typeof window !== 'undefined') {

        let catchaToken = localStorage.getItem('captchaToken')
        
        if (catchaToken) {

          let time = +catchaToken.split(';')[1]
          let date = catchaToken.split(';')[0]

          if (date == new Date()?.toLocaleDateString()) {
            if (time == 3) {
              setIsVerified(false)
            } 
          } else {
            localStorage.setItem('captchaToken', new Date()?.toLocaleDateString() + ';' + 1)
          }
        } else {
          localStorage.setItem('captchaToken', new Date()?.toLocaleDateString() + ';' + 1)
        }
      }
    }, [])


    function handleDaData(value) {
      // console.log(value)
      setAddress(value)
    }

    function handleAddressInput(e) {
      console.log(address)
      console.log(e.target.value, address?.value)
      if (e.target.value != address?.value) {
        
        setAddressInput('')
      } else {
        setAddressInput(e.target.value)
      }
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
          store: settings?.defaultPlace,
          description: `
          Покупатель: ${name}
Номер телефона: ${phone}
Адрес ${addressInput}
Сообщение ${comment}
          `
        }
        // console.log(orderData)

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

          
          let catchaToken = localStorage.getItem('captchaToken')
        

          let time = +catchaToken.split(';')[1]

          setIsLoading(false)
          setCart([])
          localStorage.setItem('captchaToken', new Date()?.toLocaleDateString() + ';' + (time + 1))
          router.push('/')
        }


      }
    }

    function verifyHandler(value) {
      console.log(value)
      setIsVerified(true)
      localStorage.setItem('captchaToken', new Date()?.toLocaleDateString() + ';' + 1)
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
                    <label>Номер телефона</label><ReactInputMask alwaysShowMask  onChange={(e) => {setPhone(e.target.value)}} mask="+375\ (99) 999-99-99" maskChar="_" />
                    {/* <input onChange={(e) => {setPhone(e.target.value)}}></input> */}
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
                        onBlur: handleAddressInput
                      }} 
                      value={address} 
                      onChange={handleDaData} 
                    />
                </div>
            </div>
            <div>
                <div className={styles.input_group}>
                    <label>Контакт для связи</label>
                    <textarea onChange={(e) => {setComment(e.target.value)}}></textarea>
                </div>
            </div>
        </form>
        <TableContainer data={cart} showCategory={false}/>
        <div style={{display: 'flex', justifyContent: 'flex-end', marginTop: 20, alignItems: 'center'}}>
            Итого: <span style={{margin: '0 10px', fontSize: 24, fontWeight: 'bold'}}>{formatPrice(summ)}</span> бел. руб.
        </div>
        <div style={{display: 'flex',flexDirection: 'column', alignItems: 'flex-end', marginTop: 20}}>
          {isVerified ? (
            <ReactLoader loaded={!isLoading}>
            <button onClick={handleSubmit} disabled={phone.includes('_') || name == '' || comment == '' || !addressInput} style={{padding: 10, marginBottom: 20, marginTop: 20}} className='primary__button'>Подтвердить заказ</button>
            </ReactLoader>
          ): (
            <ReCAPTCHA
                sitekey={process.env.NEXT_PUBLIC_CAPTCHA_PUBLIC_KEY}
                // size="normal"
                // onloadCallback={callback}
                render="explicit"
                onChange={verifyHandler}
            />
          )}
        </div>
    </div>
  )
}

export default OrderScreen