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

    let test_images = [
        {
          original: 'https://vape-smart.com/wp-content/uploads/2016/01/honeystick-vaporizer.png',
          thumbnail: 'https://vape-smart.com/wp-content/uploads/2016/01/honeystick-vaporizer.png',
          originalClass: 'gallery__item'
        },
        {
          original: 'http://lapar.ru/image/catalog/kangtopboxmini-2.jpg',
          thumbnail: 'http://lapar.ru/image/catalog/kangtopboxmini-2.jpg',
          originalClass: 'gallery__item'
        },
        {
          original: 'https://vapehits.ru/images/stories/virtuemart/product/istick_pico_kit_4ml_brushed_silver1.jpg',
          thumbnail: 'https://vapehits.ru/images/stories/virtuemart/product/istick_pico_kit_4ml_brushed_silver1.jpg',
          originalClass: 'gallery__item'
        },
      ];

    test_images = item?.images?.rows?.map(img => (
        {
            original: img?.meta?.downloadHref,
            thumbnail: img?.meta?.downloadHref,
            originalClass: 'gallery__item'
        }
    ))

      
//   const fetchImages = async () => {
//     let images = await fetch('http://localhost:8080/' + item?.images?.meta?.href?.slice(8), {
//         headers: {
//           'Authorization': 'e90e31c9edb91eb7a9907e90de541cecce642a76'
//         }
//       })
//       images = await images.json()

//       console.log(images)

//     //   images = images?.rows?.map(item => item)

//       setImages(images)

//   }

//     useEffect(() => {
//         fetchImages()
//         if (item?.amount) {
//             setAmount(item?.amount)
//         }


//     }, [item])


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
        
        if (e.target.value >= 0 && e.target.value <= 5000 ) {
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
        }


    }

    let selected = !(amount > 0)

  return (
    <div style={hidden?.includes(item?.id) ? {display: 'none'}: {}} className={selected ? styles.table_row : styles.table_row__active}>
        
        <div className={styles.image} onClick={() => {setIsShowed(true)}}>
            {console.log(item?.images?.rows?.[0]?.tiny?.href)}
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
            
            <div className={styles.price}>
            <p><span>от 100 руб.</span>{formatPrice(item.salePrices?.[0]?.value)}</p>
            </div>
            <div className={styles.price}>
                <p><span>от 200 руб.</span>{formatPrice(item.salePrices?.[1]?.value)}</p>
            </div>
            <div className={styles.price}>
                <p><span>от 500 руб.</span>{formatPrice(item.salePrices?.[2]?.value)}</p>
            </div>
        </div>
        <div className={styles.summ}>
            <p><span>Сумма</span>{formatPrice(item.salePrices?.[0]?.value * amount)}</p>
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