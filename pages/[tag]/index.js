import { useState, useRef, useEffect } from 'react'
import RootLayout from '@/layouts/RootLayout'
import { useRouter } from 'next/router';
import Image from 'next/image'
import { getTagsList, check_Image } from '@/libs/api'

export default function Tags({ res }) {

    const [data, setData] = useState([])
    const [nodata, setNodata] = useState(false);
    let cardref = useRef(null);
    let page_no = 1
    let no_product = false;
    const router = useRouter();

    useEffect(() => {
        if (res && res.data && res.data.length != 0) {
            setData(res.data)
        }

        const intersectionObserver = new IntersectionObserver(entries => {
            if (entries[0].intersectionRatio <= 0) return;
            if (!no_product) {
                page_no > 1 ? get_list() : null
                page_no = page_no + 1
            }
        });
        intersectionObserver.observe(cardref?.current);

        return () => {
            cardref?.current && intersectionObserver.unobserve(cardref?.current)
        }
    }, [])


    const get_list = async () => {
        const param = await router?.tag;
        const params = {
            tag_route: param,
            page_no: page_no
        }
        const resp = await getTagsList(params);
        if (resp && resp.status && resp.status == 'Success') {
            if (resp.data.length != 0) {
                setData((d) => d = [...d, ...resp.data]);
            } else {
                no_product = true;
                setNodata(!nodata)
            }
        }
    }

    const checkRoute = (data) => {
        console.log(data);
        if (data.doctype == 'Articles') {
            router.push(data.ir_prime == 1 ? '/IRPrime/' + data.route : '/categories/' + data.route)
        } else if (data.doctype == 'News') {
            router.push('/news/' + data.route)
        } else if (data.doctype == 'Community Event') {
            router.push('/events/' + data.route)
        }
    }

    return (
        <>
            <RootLayout>
                <div className={`container p-[30px_0px] md:p-[15px]`}>
                    {(data && data.length != 0 && !nodata) ?
                        <div className={`lg:grid lg:grid-cols-4 lg:gap-5 no_scroll`}>
                            {data.map((res, index) => {
                                return (
                                    <div key={index} onClick={() => checkRoute(res)} className={`border h-[310px] cursor-pointer rounded-[10px]`}>
                                        <div>
                                            <Image src={check_Image(res.thumbnail_image)} height={500} width={800} className={`w-full h-[200px] rounded-[10px_10px_0_0]`} alt={res.title ? res.title : index} />
                                        </div>
                                        <div className='p-[10px]'>
                                            <h6 className={`title line-clamp-2`}>{res.title}</h6>
                                            <p className={`sub_title line-clamp-2 pt-[5px]`}>{res.blog_intro}</p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        : nodata ? <></> : <div className='grid place-content-center'>
                            <div>
                                <Image src={'/empty_states/no-article.svg'} className='' height={200} width={300} alt={'no data'} />
                            </div>
                            <h6 className='text-[16px] font-semibold text-center pt-[15px]'>No Article Found...</h6>
                        </div>}
                </div>
                <div className='more' ref={cardref}>

                </div>
            </RootLayout>
        </>
    )
}


export async function getServerSideProps({ params }) {

    const param = {
        tag_route: params.tag,
        page_no: 1
    }
    const resp = await getTagsList(param);
    let res = resp;
    if (res.status != "success") {
        res.data = []
    }

    return {
        props: { res }
    }

}