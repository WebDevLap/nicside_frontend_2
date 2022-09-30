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
    const [testImages, setTestImages] = useState([])
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
    
    function setPriceType() {
        if (default_summ < 200) {
            priceIndex = 0
            summ = item?.salePrices?.[0]?.value * amount


        } else if (default_summ < 500) {

            if (summ < 200) {
                default_summ = summ
                setPriceType()
            }

            priceIndex = 1
            summ = item?.salePrices?.[1]?.value * amount


        } else if (default_summ >= 500) {
            
            if (summ < 500) {
                default_summ = summ
                setPriceType()
            }

            priceIndex = 2
            summ = item?.salePrices?.[2]?.value * amount


        }
    }

    setPriceType()


    async function fetchImages() {
        let test_images = await Promise.all(item?.images?.rows?.map( async (img) => {

            let img_url = ''

            let res = await fetch(`${process.env.NEXT_PUBLIC_CORS_HOST}/${img?.meta?.downloadHref}`, {
                headers: {
                  'Authorization': 'f57f5925ec35cc1d94f1aff9bb4c6cf25c261deb'
                }
            })

            if (Object.fromEntries(res.headers)?.['x-final-url']) {
                // console.log(Object.fromEntries(res.headers))
                img_url = Object.fromEntries(res.headers)?.['x-final-url']

                // let resImg = await fetch(`http://localhost:8080/${img_url}`, {
                //     headers: {
                //         'Authorization': 'f57f5925ec35cc1d94f1aff9bb4c6cf25c261deb'
                //     }
                // })

                // console.log(resImg)


            }

            
            
    
            // return {
            //     original: img?.miniature?.href?.replace('true', 'false'),
            //     thumbnail: img?.miniature?.href?.replace('true', 'false'),
            //     originalClass: 'gallery__item'
            // }
            return {
                original: img_url,
                thumbnail: img_url,
                originalClass: 'gallery__item'
            }
        }))

        setTestImages(test_images)
        
    }

    

    useEffect(() => {
        let cartItem = cart.find(cartItem => cartItem?.id == item?.id)

        if (cartItem) {
            setAmount(cartItem?.amount)
        }
    }, [cart])

    
    useEffect(() => {
        fetchImages()
    }, [])


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
        
        if (e.target.value == '') {
            setAmount(null)
        } else if (e.target.value > 0 && e.target.value <= 5000 ) {
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
        } else {
            console.log('string')
        }


    }

    function handleBlur(e) {
        if (e.target.value == '') {
            setAmount(0)
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
        {item.description ? (
            <Tooltip
                placement="bottomLeft"
                overlay={item.description}
                overlayClassName="mytooltip"
                arrowContent={<div className="rc-tooltip-arrow-inner"></div>}
            >

            <div id={'image' + item.id} className={styles.title} data-tip={item.description}>
                {item.name}
            </div>
            </Tooltip>
        ) : (
            <div id={'image' + item.id} className={styles.title} data-tip={item.description}>
                {item.name}
            </div>
        )}
        <div className={styles.amount}>
            <span className={(amount <= 0) ? styles.disabled_button : null} onClick={decrement} >-</span>
            <input min={0} max={5000} onInput={handleInput} onBlur={handleBlur} value={amount} type={'number'}/>
            <span className={(amount >= 5000) ? styles.disabled_button : null} onClick={increment}>+</span>
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
                items={testImages} 
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