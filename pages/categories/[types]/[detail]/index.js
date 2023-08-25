import { articlesDetail } from '@/libs/api';
import React, { useEffect, useState } from 'react'
import CategoryBuilder from '@/components/Builders/CategoryBuilder';

import RootLayout from '@/layouts/RootLayout';
import { useRouter } from 'next/router';
// Redux
// import { useDispatch, useSelector } from 'react-redux'
// import setPagination from 'redux/actions/paginationAction';

export default function CategoryDetail({ data }) {
  // Store
  // const pagination = useSelector(s => s.pagination);
  // const dispatch = useDispatch();

  const router = useRouter();
  const [values, setValues] = useState([])
  const [prev, setPrev] = useState('')
  const [pagination, setPagination] = useState(true);
  // let pagination = false;
  // let prev = router.query.detail;



  useEffect(() => {
    if (data) {
      console.log(data);
      let val = [data]
      setValues(d => [...d, ...val])
    }
    setPrev(router.query.types + '/' +router.query.detail)
    // setPagination(true)
  }, [])


  async function loadMore() {
    // setPagination(t => t = true);
    // dispatch(setPagination(true))
    // pagination = true
    // console.log(pagination)

    let param = {
      "route": prev,
      "category": router.query.types,
      "next": 1
    }

    // console.log(pagination)
    if (pagination) {
      let value = await articlesDetail(param);
      let data = value.message;
      // console.log(data)
      if (data && data.status == "Success") {
        setPrev(data.route)
        // router.replace(`/categories/${router.query.types}/${data.name}`)
        let val = [data]
        setValues(d => d = [...d, ...val])
        // dispatch(setPagination(false))
        // setTimeout(() => {
        //   setPagination(val => val = false)
        //   // pagination = false
        // }, 300);
        // console.log(pagination)
      } else {
        setPagination(!pagination)
      }
      //  if (data && data.length == 0) {
      //   // dispatch(setPagination(true))
      //   setPagination(false)
      //   // console.log(pagination)
      // }
    }
  }





  return (
    <>
      <RootLayout>
        {/* {data && <div> */}
        {/* setPage={(data) => setPagination(data)} pagination={pagination} */}
        {(values && values.length != 0) && <>
          {values.map((res, index) => {
            return (
              <div key={index}>
                <CategoryBuilder isLast={index == values.length - 1} i={index} data={res} load={loadMore} />
              </div>
            )
          })}
        </>
        }
        {/* </div>} */}
      </RootLayout>
    </>
  )
}


export async function getServerSideProps({ params }) {
  let Id = await params?.detail;
  let Category = await params?.types;
  let param = {
    "route": Category + '/' + Id,
    "category": Category,
    "next": 0
  }
  let value = await articlesDetail(param);
  let data = value.message;

  // let param = {
  //     doctype: "Articles",
  //     name: Id,
  //     related_fields:["primary_text","secondary_text","title","publisher"],
  //     related_records: 6
  // }
  // let value = await getDetails(param);
  // let data = value.message;

  return {
    props: { data }
  }
}