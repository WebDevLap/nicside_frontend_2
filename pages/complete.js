import { Icon } from "@iconify/react";
import Link from "next/link";
import React, { useContext, useEffect } from "react";
import OrderScreen from "../components/screens/Order/OrderScreen";
import { CartContext } from "../contexts/CartContext";

const Order = () => {

    
    const [cart, setCart] = useContext(CartContext)

    useEffect(() => {
        setCart([])
    }, [])

  return (
    <div className="container">
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', height: '100vh'}}>
        <Icon width={100} height={100} color={'#503E8D'} icon="akar-icons:check-box" />
        <h2 style={{margin: '10px 0px 20px', fontSize: 32}}>Ваш заказ успешно отправлен!</h2>
        <Link href="/"><button style={{padding: 10}} className="primary__button">На главную</button></Link>
      </div>
    </div>
  );
};

export default Order;
