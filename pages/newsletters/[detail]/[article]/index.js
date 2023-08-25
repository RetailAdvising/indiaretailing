import React from 'react'
import CategoryBuilder from '@/components/Builders/CategoryBuilder'
import { getDetails } from '@/libs/api'
export default function NewsArticle({data}) {
  return (
    <>
      {data && <CategoryBuilder data={data} />}
    </>
  )
}


export async function getServerSideProps({ params }) {
    let Id = await params?.article;
    let param = {
        doctype: "News Letter",
        name: Id,
        related_fields: ["title", "blog_intro", "description", "day", "image", "thumbnail_image"],
        related_records: 6
    }
    let value = await getDetails(param);
    let data = value.message;

    return {
        props: { data }
    }
}