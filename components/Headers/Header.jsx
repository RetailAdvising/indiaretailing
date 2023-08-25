import React from 'react'
import Image from 'next/image'
import styles from '@/styles/Header.module.scss'
import { useRouter } from 'next/router'
export default function Header() {
    const router = useRouter();
    const head = {
        btn1: 'Subscribe',
        btn2: 'Sign in',

    }
    return (
        <>
            {head && <div className={``}>
            <div className='container flex items-center justify-between p030'>
                {/* <div> */}
                    <div className={`flex items-center `}>
                        <Image style={{ objectFit: 'contain' }} height={60} priority width={24} alt='search' src={'/search.svg'} className="pr-2"></Image>
                        <input className={styles.input1} type="text" placeholder='Search here...' name="search"></input>
                    </div>
                {/* </div> */}
                <div className=''>
                    <Image style={{ objectFit: 'contain' }} height={76.23} priority width={284.65} alt='' src={'/indiaretail.png'}></Image>
                </div>
                <div className={`flex items-center gap-3 `}>
                    <button type='button' className={styles.btn_sub}>{head.btn1}</button>
                    <button type='button' onClick={()=> router.push('/login')} className={styles.btn_sig}>{head.btn2}</button>
                </div>
            </div>
        </div>
        }
        </>
    )
}
