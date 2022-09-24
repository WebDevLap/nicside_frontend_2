import Head from 'next/head'
import Image from 'next/image'
import HomeScreen from '../components/screens/Home/HomeScreen'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className='container'>
      <HomeScreen/>
    </div>
  )
}
