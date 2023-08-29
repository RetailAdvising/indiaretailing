import Title from '@/components/common/Title'
import RootLayout from '@/layouts/RootLayout'
import { deleteCartItems, getCartItems, updateCartItems } from '@/libs/api'
import { check_Image } from '@/libs/common'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

export default function cart() {
    const [value, setValue] = useState();
    // const [total, setTotal] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);
    const [load, setload] = useState(false);
    const [indexs, setIndex] = useState(-1)
    const router = useRouter();
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'INR',
    });
    
    const getCarts = async () => {
        let param = {
            customer: localStorage['customer_id'],
            user: ""
        }
        const resp = await getCartItems(param);
        if (resp && resp.message) {
            setValue(resp.message.cart);
            calculateTotal(resp.message.cart);

        }
    }

    useEffect(() => {
        getCarts();
    }, [])

    const updateCart = async (data, type, i) => {
        setload(!load)
        setIndex(i)
        if (type == 'inc') {
            data['quantity'] += 1;
        } else if (type == 'dec') {
            data['quantity'] = data['quantity'] == 1 ? 0 : data['quantity'] - 1;
        }

        let param = {
            name: data.name,
            qty: data.quantity,
            qty_type: ""
        }

        const resp = await updateCartItems(param);
        if (resp.message.status == 'success') {
            getCarts();
            setload(false)
        }
    }

    async function dltCart(data) {
        let param = { name: data.name }
        const resp = await deleteCartItems(param);
        if (resp.message.status == 'success') {
            getCarts();
        }
    }

    const calculateTotal = async (val) => {
        let total = val.total + 36;
        setCartTotal(total)
    }

    return (
        <>
            <RootLayout>
                <div className='container p-[30px]'>
                    <Title data={{ title: 'Shopping Cart' }} />
                    {/* {load && <div className='overlay'><Image src={'/cart/loading.gif'} className='h-[100px] w-full'  height={40} width={40} alt='loading' /></div>} */}
                    {(value && value.items && value.items.length != 0) ? <div className={`flex justify-between md:flex-wrap gap-[15px]`}>
                        <div className={`border p-[20px] rounded-[5px] flex-[0_0_calc(70%_-_10px)] md:flex-[0_0_calc(100%_-_10px)]`}>
                            <div className='flex pb-[20px] items-center gap-5 justify-between '>
                                <p className='flex-[0_0_calc(45%_-_10px)]  font-semibold text-center'>Products</p>
                                <p className='flex-[0_0_calc(15%_-_10px)] font-semibold text-center'>Price</p>
                                <p className='flex-[0_0_calc(15%_-_10px)] font-semibold text-center'>Quantity</p>
                                <p className='flex-[0_0_calc(15%_-_10px)] font-semibold text-center'>Total</p>
                            </div>
                            {value.items.map((res, index) => {
                                return (
                                    <div key={index} className={`flex gap-[15px] items-center justify-between ${index != value.items.length - 1 ? 'border_bottom pb-[10px] mb-[10px]' : ''}`}>
                                        <Image className='flex-[0_0_calc(5%_-_10px)]' onClick={() => dltCart(res)} src={'/cart/Remove.svg'} height={20} width={20} alt={res.name} />
                                        <Image className='flex-[0_0_calc(15%_-_10px)] h-[150px] w-[100px]' src={check_Image(res.image)} height={80} width={100} alt={res.name} />
                                        <p className='flex-[0_0_calc(25%_-_10px)] text-[16px] font-semibold'>{res.product_name}</p>
                                        <p className='flex-[0_0_calc(15%_-_10px)] text-[16px] font-semibold'>Rs {res.price}</p>
                                        <div className='flex flex-[0_0_calc(15%_-_10px)] items-center justify-between p-[10px] border h-[30px] w-[100px] gap-[10px]'>
                                            <Image onClick={() => updateCart(res, 'dec', index)} className='h-[20px] cursor-pointer w-[10px]' src={'/cart/_.svg'} height={20} width={20} alt='minus' />
                                            {(load && index == indexs) ? <Image src={'/cart/loading.gif'} className='h-[75px] w-[40px]' height={40} width={40} alt='loading' /> : <p className='font-semibold'>{res.quantity}</p>}
                                            <Image onClick={() => updateCart(res, 'inc', index)} className='h-[20px] cursor-pointer w-[10px]' src={'/cart/+.svg'} height={20} width={20} alt='plus' />
                                        </div>
                                        <p className='flex-[0_0_calc(15%_-_10px)] text-center font-semibold text-[16px]'>Rs {res.total}</p>
                                    </div>
                                )
                            })}
                        </div>
                        {value && <div className={`border md:flex-[0_0_calc(100%_-_10px)] h-[350px] rounded-[5px] p-[20px] flex-[0_0_calc(30%_-_10px)]`}>
                            <p className='pb-[10px] mb-[10px] text-[20px] font-semibold border_bottom'>Cart Totals</p>
                            <p className='flex justify-between leading-[2.5] text-[16px]'><span className='flex gap-[10px] text-[16px] items-center'>Subtotal <Image className='rounded-full h-[15px] w-[20px] object-contain' src={'/cart/question.svg'} height={10} width={10} alt='qns' /></span><span>{formatter.format(value.total)}</span></p>
                            <p className='flex justify-between leading-[2.5] text-[16px]'><span className='text-[16px]'>Shipping</span><span className='text-[16px] '>Free</span></p>
                            <p className='flex justify-between leading-[2.5] text-[16px]'><span className='text-[16px]'>GST</span><span className='text-[16px]'>{formatter.format(0)}</span></p>
                            <p style={{ borderTop: '1px solid #EEEEEE' }} className='flex justify-between mt-[10px] leading-[2.5] text-[16px] border_bottom py-[10px]'><span className='text-[16px]'>Total</span><span className='text-[16px]'>{formatter.format(cartTotal)}</span></p>
                            <button className='capitalize primary_btn text-[14px] h-[40px] w-full mt-[25px]' onClick={() => router.push('/checkout')}>Proceed to checkout</button>
                        </div>}
                    </div> : <div className='h-[50vh]'>
                        <p>Your Cart is Empty</p>
                        <button onClick={() => router.push('/bookstore')}>Return shop</button>
                    </div>}
                </div>
            </RootLayout>
        </>
    )
}
