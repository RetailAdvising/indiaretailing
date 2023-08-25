import RootLayout from '@/layouts/RootLayout'
import React, { useEffect, useState } from 'react'
// import data from '@/libs/bookstoreList';
import Title from '@/components/common/Title';
import Card from '@/components/Bookstore/Card';
import { getCategoryProduct } from '@/libs/api';
import { useRouter } from 'next/router';
export default function BookstoreList({value}) {
    const router = useRouter();
    const [data, setData] = useState([])
    useEffect(() => {
        if(value && value.length != 0){
            setData(value)
        }
        // const products = async () => {
        //     let data = {
        //         category: "MC-00001",
        //         sort_by: "",
        //         page_no: 1,
        //         page_siz: 10,
        //         brands: "",
        //         attributes: [],
        //         productsid: "",
        //         isMobile: 1,
        //         domain: "indiaretailing.go1cms.com",
        //         // customer: ""
        //     }
        //     const resp = await getCategoryProduct(data);
        //     if (resp.message && resp.message.length != 0) {

        //     }
        //     console.log(resp)
        // }

        // products();
    }, [])
    return (
        <>
            <RootLayout>
                <div className='container'>
                    {(data && data.length != 0) &&
                        <div className='p-[30px]'>
                            <Title data={{ title: router.query.list }} />
                            <div className={`grid gap-[30px_20px] grid-cols-4 md:grid-cols-2 justify-between `}><Card check={true} data={data} category={router.query.list} isLanding={true} imgClass={'aspect-[2/2.5] w-full'} boxShadow={true} /></div>
                        </div>
                    }
                </div>

            </RootLayout>
        </>
    )
}


export async function getServerSideProps({ query }) {
    let Id = await query?.c;
    // let Id = 'beauty-wellness';
    let param = {
        category: Id,
        sort_by: "",
        page_no: 1,
        page_siz: 10,
        brands: "",
        attributes: [],
        productsid: "",
        isMobile: 1,
        domain: "indiaretailing.go1cms.com",
    }
    let resp = await getCategoryProduct(param);
    let value = resp.message;

    return {
        props: { value }
    }
}