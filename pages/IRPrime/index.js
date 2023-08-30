import RootLayout from '@/layouts/RootLayout'
import React from 'react'
import { primeLanding } from '@/libs/api'
import ExclusiveBuilder from '@/components/Builders/ExclusiveBuilder'


export default function IRPrime({ data }) {
    return (
        <>
            <RootLayout>
                {(data && data.message && data.message.length != 0) && <ExclusiveBuilder data={data} />}
            </RootLayout>

        </>
    )
}



export async function getStaticProps() {
    // let params = {
    //     "doctype": "Articles", "filter_name": "articles_category", "parent_fields": ["name", "title", "thumbnail_image", "articles_category", "blog_intro", "primary_text", "secondary_text", "avatar", "publisher","route"], "category_doctype": "Articles Category", "category_fields": ["name", "title", "primary_text", "description",'route'], "page_no": 1, "records": 6, "category_count": 6, "ir_prime": 1
    // }
    let params = {
        fields:["name","route","primary_text","secondary_text","title","thumbnail_image","articles_category","blog_intro","avatar","publisher"],page_length:10,page_no:1
    }
    const res = await primeLanding(params);
    const data = await res;
    return {
        props: { data } , revalidate: 50,
    }
}

// export async function getServerSideProps() {
//     let params = {
//         "doctype": "Articles", "filter_name": "articles_category", "parent_fields": ["name", "title", "thumbnail_image", "articles_category", "blog_intro", "primary_text", "secondary_text", "avatar", "publisher","route"], "category_doctype": "Articles Category", "category_fields": ["name", "title", "primary_text", "description",'route'], "page_no": 1, "records": 6, "category_count": 6, "ir_prime": 1
//     }
//     const res = await getCategoryList(params);
//     const data = await res?.message;
//     return {
//         props: { data }
//     }
// }