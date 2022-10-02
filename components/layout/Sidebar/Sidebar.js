import { Icon } from '@iconify/react'
import React, { useContext } from 'react'
import styles from './Sidebar.module.css'
import Modal from 'react-modal';
import { CategoryContext } from '../../../contexts/CategoryContext';
import { ProductContext } from '../../../contexts/ProductsContext';

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

const Sidebar = () => {

    const [modalIsOpen, setIsOpen] = React.useState(false);

    
    const [category, setCategory] = useContext(CategoryContext)
    const [products, setProducts] = useContext(ProductContext)



    function openModal() {
        setIsOpen(true);
      }

      function closeModal() {
        setIsOpen(false);
      }


    function handleCategory(value) {
      setCategory(prev => ({...prev, category: value}))
    }


  return (
    <div className={styles.sidebar}>
       <div className={styles.logo}>
            <img src='/VAPELOGO.svg'></img>
        </div> 
        <h2>Категории</h2>
        <ul>
            <a onClick={() => {handleCategory('')}}><li className={category?.category == '' && styles.active__link}>Все</li></a>
            {products?.categories?.map(cat => (
              <a key={cat?.id} onClick={() => {handleCategory(cat?.name)}}><li className={category?.category == cat?.name && styles.active__link}>{cat?.name}</li></a>
            ))}
            {/* <a onClick={() => {handleCategory('Жидкость')}}><li className={category?.category == 'Жидкость' && styles.active__link}>Жидкость</li></a>
            <a onClick={() => {handleCategory('Расходники')}}><li className={category?.category == 'Расходники' && styles.active__link}>Расходники</li></a>
            <a onClick={() => {handleCategory('Напитки')}}><li className={category?.category == 'Напитки' && styles.active__link}>Напитки</li></a> */}
        </ul>
        <div className={styles.sidebar__footer}>
            <Modal
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
            </Modal>
            <a onClick={openModal}>Доставка и оплата</a>
            <div className={styles.contacts}>
                  <Icon icon="logos:telegram" /> <a href="https://t.me/plug_opt">Канал Telegram</a>
            </div>
        </div>
    </div>
  )
}

export default Sidebar