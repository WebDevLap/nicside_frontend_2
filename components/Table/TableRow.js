import React, { useContext, useEffect, useState } from 'react'
import formatPrice from '../../utils/formatPrice'
import styles from './Table.module.css'
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css"
import { Icon } from '@iconify/react';
import { CartContext } from '../../contexts/CartContext';
import {useRouter} from 'next/router'
import ReactTooltip from 'react-tooltip';
import Tooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap_white.css';



const TableRow = ({item, hidden}) => {
    const [amount, setAmount] = useState(0)
    const [isShowed, setIsShowed] = useState(false)
    const [images, setImages] = useState(false)
    const [cart, setCart] = useContext(CartContext)
    const router = useRouter()

    useEffect(() => {
        ReactTooltip.rebuild();
    });

    let default_summ = cart.reduce((prev, now) => {

        let s = now.salePrices?.[0]?.value * now.amount

        return prev + s
    }, 0)

    let summ = 0
    let priceIndex = 0
    
    
    if (default_summ < 200) {
        priceIndex = 0
        summ = item?.salePrices?.[0]?.value * amount
    } else if (default_summ < 500) {
        priceIndex = 1
        summ = item?.salePrices?.[1]?.value * amount
    } else if (default_summ >= 500) {
        priceIndex = 2
        summ = item?.salePrices?.[2]?.value * amount
    }


    let test_images = [];



    test_images = item?.images?.rows?.map(img => (
        {
            original: img?.miniature?.href?.replace('true', 'false'),
            thumbnail: img?.miniature?.href?.replace('true', 'false'),
            originalClass: 'gallery__item'
        }
    ))

    useEffect(() => {

        let cartItem = cart.find(cartItem => cartItem?.id == item?.id)

        if (cartItem) {
            setAmount(cartItem?.amount)
        }
    }, [cart])


    function increment() {
        setAmount(amount + 1)

        let product = cart.filter(product => product.id == item.id)[0]

        if (product) {

            let updatedList = cart.map(product => {
                  if (product.id == item.id){
                    return {...product, amount: amount + 1}; 
                  }
                  return product; 
                });


            setCart(updatedList)


        } else {
            setCart((prev) => {
                return [
                    ...prev, {
                        ...item,
                        amount: amount + 1
                    }
                ]
            })
        }

    }

    function decrement() {

        let product = cart.filter(product => product.id == item.id)[0]

        if (amount > 0) {
            setAmount(amount - 1)
            
            

            if (product) {

                if (amount - 1 == 0) {
                    setCart(cart.filter(product => product.id != item.id))
                } else {
                    
                    let updatedList = cart.map(product => {
                        if (product.id == item.id){
                            return {...product, amount: amount - 1}; 
                        }
                        return product; 
                        });


                    setCart(updatedList)
                }


            } else {
                setCart((prev) => {
                    return [
                        ...prev, {
                            ...item,
                            amount: amount - 1
                        }
                    ]
                })
            }
        } 

    }


    function handleInput(e) {
        
        if (e.target.value > 0 && e.target.value <= 5000 ) {
            setAmount(+e.target.value)

            let product = cart.filter(product => product.id == item.id)[0]

            if (product) {

                let updatedList = cart.map(product => {
                    if (product.id == item.id){
                        return {...product, amount: +e.target.value}; 
                    }
                    return product; 
                    });


                setCart(updatedList)


            } else {
                setCart((prev) => {
                    return [
                        ...prev, {
                            ...item,
                            amount: +e.target.value
                        }
                    ]
                })
            }
        } else if (+e.target.value <= 0) {
            setAmount(+e.target.value)
            let newCart = cart.filter(product => product.id != item.id)
            setCart(newCart)
        }


    }

    let selected = !(amount > 0)

  return (
    <div style={hidden?.includes(item?.id) ? {display: 'none'}: {}} className={selected ? styles.table_row : styles.table_row__active}>
        
        <div className={styles.image} onClick={() => {setIsShowed(true)}}>
            {/* {console.log(item?.images?.rows?.[0]?.tiny?.href)} */}
            <img src={item?.images?.rows?.[0]?.tiny?.href}></img> 
        </div>
        {/* <div className={styles.code}>
            {item.code}
        </div> */}
        <Tooltip
            placement="bottom"
            overlay={item.description}
            overlayClassName="mytooltip"
            arrowContent={<div className="rc-tooltip-arrow-inner"></div>}
        >

        <div id={'image' + item.id} className={styles.title} data-tip={item.description}>
            {item.name}
            {/* <ReactTooltip border={1} borderColor="#ccc" className="mytooltip" type="light" effect="solid" place='bottom' multiline /> */}
        </div>
        </Tooltip>
        {/* <div className={styles.sku}>
            {item.description}  
        </div>   */}
        <div className={styles.amount}>
            <button disabled={(amount <= 0)} onClick={decrement}>-</button>
            <input min={0} max={5000} onInput={handleInput} value={amount} type={'number'}/>
            <button disabled={(amount >= 5000)} onClick={increment}>+</button>
        </div>
        <div className={styles.table__prices}>
            
            <div className={styles.price} style={priceIndex == 0 ? {fontWeight: 'bold'} : {}}>
            <p><span>от 100 руб.</span>{formatPrice(item.salePrices?.[0]?.value)}</p>
            </div>
            <div className={styles.price} style={priceIndex == 1 ? {fontWeight: 'bold'} : {}}>
                <p><span>от 200 руб.</span>{formatPrice(item.salePrices?.[1]?.value)}</p>
            </div>
            <div className={styles.price} style={priceIndex == 2 ? {fontWeight: 'bold'} : {}}>
                <p><span>от 500 руб.</span>{formatPrice(item.salePrices?.[2]?.value)}</p>
            </div>
        </div>
        <div className={styles.summ} style={{fontWeight: 'bold'}}>
            <p><span>Сумма</span>{formatPrice(summ)}</p>
        </div>
        <div style={{display: isShowed ? 'block' : 'none'}} className={styles.image__gallery}>
            <ImageGallery  
                showFullscreenButton={false} 
                showPlayButton={false} 
                items={test_images} 
                renderLeftNav={(onClick, disabled) => <button
                    type="button"
                    className="image-gallery-icon image-gallery-left-nav"
                    style={{filter: 'none !important'}}
                    disabled={disabled}
                    onClick={onClick}
                    aria-label="Previous Slide"
                  >
                    <Icon style={{width: 50, height: 50, color: '#503E8D'}} icon="ant-design:left-outlined" onClick={onClick} disabled={disabled} />
                </button>}
                renderRightNav={(onClick, disabled) => <button
                    type="button"
                    className="image-gallery-icon image-gallery-right-nav"
                    style={{filter: 'none !important'}}
                    disabled={disabled}
                    onClick={onClick}
                    aria-label="Previous Slide"
                  >
                    <Icon style={{width: 50, height: 50, color: '#503E8D'}} icon="ant-design:right-outlined" onClick={onClick} disabled={disabled} />
                </button>}
            />
            <button onClick={() => {setIsShowed(false)}} className={styles.close_button} ><Icon icon="ci:close-big" /></button>
        </div>
    </div>
  )
}

export default TableRow