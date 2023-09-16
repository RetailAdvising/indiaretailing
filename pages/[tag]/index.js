import { useState, useRef, useEffect } from 'react'
import RootLayout from '@/layouts/RootLayout'
import { useRouter } from 'next/router';
import Image from 'next/image'
import { getTagsList, check_Image, getList } from '@/libs/api'
import TrendingBox from '/components/Landing/TrendingBox'
import Tabs from '@/components/Landing/Tabs'


export default function Tags({ res }) {
    const categories = [{ name: 'All', route: 'all' }, { name: 'News', route: 'news_list' }, { name: 'Articles', route: 'article_list' }, { name: 'Events', route: 'event_list' }]
    const [resp_data, setData] = useState()
    const [nodata, setNodata] = useState(false);
    const [activatedData, setActivatedData] = useState([])
    const [tabs, setTabs] = useState(undefined)
    const [tag, setTag] = useState([])
    let cardref = useRef(null);
    let page_no = 1
    let no_product = false;
    const router = useRouter();
    useEffect(() => {
        if (res && res.data) {
            setData(res.data)
            setTabs('all')
            setActivatedData([...res.data['news_list'], ...res.data['event_list'], ...res.data['article_list']]);
        }
        console.log(res)
        getTags();

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

    const getTags = async () => {
        let param = {
            doctype: 'Tag',
            fields: ['name', 'custom_route'],
            page_no: 1,
            page_size: 25
        }

        const resp = await getList(param);
        if (resp.message && resp.message.length != 0) {
            // console.log(resp)
            setTag(resp.message)
        } else {
            setTag([]);
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


    const getTabs = (data) => {
        setTabs(data);

        if (categories) {
            categories.map((res, i) => {
                if (res.route == data) {
                    data == 'all' ? setActivatedData([...resp_data['news_list'], ...resp_data['event_list'], ...resp_data['article_list']]) : setActivatedData(resp_data[data])
                    // if(data == 'all'){
                    //     console.log(resp_data)
                    //     const datas = [...resp_data['news_list'],...resp_data['event_list'],...resp_data['article_list']];
                    //     console.log(datas);
                    //     setActivatedData(datas)
                    // }else{
                    //     setActivatedData(resp_data[data])
                    // }
                }
            })
        }

    }

    return (
        <>
            <RootLayout>
                <div className={`container md:p-[15px] lg:w-3/5`}>
                    <div class="flex flex-row gap-3 md:block">
                        <div class="lg:basis-1/4 md:hidden border-solid	border-[#e2e2e2] border-r-[1px]">
                            <div className='py-6'>
                                {tabs && <Tabs categories={categories} tab={tabs} setTabs={(data) => getTabs(data)} />}
                                 <TrendingBox />
                           
                            </div>
                        </div>
                        <div class="lg:hidden md:basis-full">
                            {tabs && <Tabs categories={categories} tab={tabs} setTabs={(data) => getTabs(data)} />}
                        </div>
                        <div class="lg:basis-2/4 md:basis-full">
                            <div className='py-6 md:py-2'>
                                {(activatedData && activatedData.length != 0 && !nodata) ?
                                    <div className={`lg:grid md:m-[15px_0] lg:grid-cols-1 lg:gap-5`}>
                                        {activatedData.map((res, index) => {
                                            return (
                                                <div key={index} onClick={() => checkRoute(res)} className={`border md:flex-[0_0_calc(70%_-_10px)] cursor-pointer rounded-[10px] md:mb-[15px]`}>
                                                    <div>
                                                        <Image src={check_Image(res.thumbnail_image)} height={500} width={800} className={`w-full h-[320px] rounded-[10px_10px_0_0]`} alt={res.title ? res.title : index} />
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
                        </div>
                        <div class="lg:basis-1/4 md:hidden">

                        </div>

                    </div>
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
    // if (res.status != "success") {
    //     res.data = []
    // }

    return {
        props: { res }
    }

}