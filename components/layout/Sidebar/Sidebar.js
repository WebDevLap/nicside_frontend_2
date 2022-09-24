import { Icon } from '@iconify/react'
import React from 'react'
import styles from './Sidebar.module.css'
import Modal from 'react-modal';

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      width: '40%',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

const Sidebar = () => {

    const [modalIsOpen, setIsOpen] = React.useState(false);


    function openModal() {
        setIsOpen(true);
      }

      function closeModal() {
        setIsOpen(false);
      }


  return (
    <div className={styles.sidebar}>
       <div className={styles.logo}>
            <img src='/VAPELOGO.svg'></img>
        </div> 
        <h2>Категории</h2>
        <ul>
            <a><li className={styles.active__link}>Все</li></a>
            <a><li>Железо</li></a>
            <a><li>Жидкость</li></a>
            <a><li>Расходники</li></a>
            <a><li>Напитки</li></a>
        </ul>
        <div className={styles.sidebar__footer}>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
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
                  <Icon icon="logos:telegram" /> <a href="https://t.me/tar1karm">Чат Telegram</a>
            </div>
        </div>
    </div>
  )
}

export default Sidebar