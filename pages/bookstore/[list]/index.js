import RootLayout from '@/layouts/RootLayout'
import React, { useEffect, useState } from 'react'
// import data from '@/libs/bookstoreList';
import Title from '@/components/common/Title';
import Card from '@/components/Bookstore/Card';
import { getCategoryProduct } from '@/libs/api';
import { useRouter } from 'next/router';
export default function BookstoreList({ value }) {
    const router = useRouter();
    const [data, setData] = useState([])
    useEffect(() => {
        if (value && value.length != 0) {
            setData(value.data)
        }
    }, [])
    return (
        <>
            <RootLayout>
                <div className='container'>
                    {(data && data.length != 0) &&
                        <div className='p-[30px]'>
                            <Title data={value} />
                            <div className={`grid gap-[30px_20px] grid-cols-4 md:grid-cols-2 justify-between `}><Card check={true} data={data} category={router.query.list} isLanding={true} imgClass={'aspect-[2/2.5] w-full'} boxShadow={true} /></div>
                        </div>
                    }
                </div>

            </RootLayout>
        </>
    )
}


export async function getServerSideProps({ params }) {
    let Id = await params?.list;
    let param = { route: Id }
    let resp = await getCategoryProduct(param);
    let value = resp.message;

    return {
        props: { value }
    }
}