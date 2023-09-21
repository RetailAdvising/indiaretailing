import { useState, useRef, useEffect } from 'react'
import RootLayout from '@/layouts/RootLayout'
import Image from 'next/image'
import { getTagsList, check_Image, getList } from '@/libs/api'
import TrendingBox from '/components/Landing/TrendingBox'
import Tabs from '@/components/Landing/Tabs'
import { useRouter } from 'next/router'
import AdsBaner from '@/components/Baners/AdsBaner'
import List from '@/components/common/List'
import Title from '@/components/common/Title'
export default function Tags({ res, data }) {
    const categories = [{ name: 'All', route: 'all' }, { name: 'News', route: 'news_list' }, { name: 'Articles', route: 'article_list' }, { name: 'Events', route: 'event_list' }]
    const [resp_data, setData] = useState([])
    const [nodata, setNodata] = useState(false);
    const [tabs, setTabs] = useState(undefined)
    const [tag, setTag] = useState([]);
    const [news, setNews] = useState([]);
    const router = useRouter()
    let cardref = useRef(null);
    let page_no = 1
    let no_product = false;

    useEffect(() => {
        getLatestNews()
        if (res && res.data) {
            // console.log(res)
            // setData(res.data)
            // console.log(router)
            setTabs(router.query.id == '' ? 'all' : router.query.id)
            // setActivatedData([...res.data['news_list'], ...res.data['event_list'], ...res.data['article_list']]);
        }

        if (data && data.length != 0) {
            // console.log(data)
            setTag(data)
        }
        // console.log(res)
        // console.log(data)

        // getTags();

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
    }, [router.query])


    const get_list = async () => {
        const param = await router.query.id;
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


    const getTabs = (data) => {
        setTabs(data);
        router.push('/tag?id=' + data)
        console.log(data)
    }

    const getLatestNews = async () => {
        const params = {
            fields: ['name', 'route', 'title', 'primary_text', 'secondary_text', 'publisher','thumbnail_image'],
            doctype: 'News',
            page_no: 1,
            page_size: 3
        }

        const resp = await getList(params);
        if (resp.message && resp.message.length != 0) {
            console.log(resp.message)
            setNews(resp.message)
        }
    }

    return (
        <>
            <RootLayout>
                <div className={`container md:p-[15px]`}>
                    <div class="flex flex-row gap-3 md:block">
                        <div class="lg:flex-[0_0_calc(20%_-_10px)] lg:h-[calc(100vh_-_90px)] overflow-auto scrollbar-hide p-[10px] md:hidden border rounded-[10px]">
                            {/* <div className=''> */}
                            {(tabs && tag) && <Tabs categories={tag} tab={tabs} setTabs={(data) => getTabs(data)} />}
                            <TrendingBox />
                            {/* </div> */}
                        </div>
                        {/* <div class="lg:hidden md:basis-full">
                            {tabs && <Tabs categories={categories} tab={tabs} setTabs={(data) => getTabs(data)} />}
                        </div> */}
                        <div class="lg:flex-[0_0_calc(50%_-_10px)] py-6 md:py-2 md:basis-full lg:h-[calc(100vh_-_90px)] overflow-auto scrollbar-hide">
                            {/* <div className=''> */}
                            {(resp_data && resp_data.length != 0 && !nodata) ?
                                <div className={`lg:grid md:m-[15px_0] lg:grid-cols-1 lg:gap-5`}>
                                    {resp_data.map((res, index) => {
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
                            {/* </div> */}
                        </div>
                        <div class="lg:flex-[0_0_calc(30%_-_10px)] md:hidden">
                            <AdsBaner  data={{ ad_image: '/ads_baner.png' }} height={'h-[250px]'} width={'w-[300px]'} />
                            {(news && news.length != 0) && <div className='border mt-[10px] rounded-[5px] p-[10px]'>
                                <Title data={{title:'Latest News'}} />
                                <List data={news} isHome={'/news/'} flex={'mb-[10px]'} hash_bg={'lg:pt-[10px]'} primary_pb={'lg:pb-[5px]'} titleClamp={'line-clamp-2'} check={true} borderRadius={'rounded-[5px]'} imgFlex={'flex-[0_0_calc(35%_-_10px)]'} imgHeight={'h-[85px]'} imgWidth={'w-full'} />
                            </div>}
                        </div>

                    </div>
                </div>
                <div className='more' ref={cardref}></div>
            </RootLayout>
        </>
    )
}


export async function getServerSideProps({ query }) {

    const param = {
        tag_route: query.id,
        page_no: 1
    }
    const resp = await getTagsList(param);
    let res;
    if(resp.data && resp.data.length != 0){
        res = resp;
    }

    let param1 = {
        doctype: 'Tag',
        fields: ['name', 'custom_route'],
        page_no: 1,
        page_size: 25
    }

    const response = await getList(param1);
    const data = response.message;
    // if (resp.message && resp.message.length != 0) {
    //     // console.log(resp)
    //     setTag(resp.message)
    // } else {
    //     setTag([]);
    // }
    // if (res.status != "success") {
    //     res.data = []
    // }

    return {
        props: { res, data }
    }

}