import { useState, useRef, useEffect } from 'react'
import RootLayout from '@/layouts/RootLayout'
import Image from 'next/image'
import { getTagsList, check_Image, getList, getTagList } from '@/libs/api'
import TrendingBox from '/components/Landing/TrendingBox'
import Tabs from '@/components/Landing/Tabs'
import { useRouter } from 'next/router'
import List from '@/components/common/List'
import Title from '@/components/common/Title';
import Dropdowns from '@/components/common/Dropdowns';
import AdsBaner from '@/components/Baners/AdsBaner'
export default function Tags({ res, data }) {
    // const categories = [{ name: 'All', route: 'all' }, { name: 'News', route: 'news_list' }, { name: 'Articles', route: 'article_list' }, { name: 'Events', route: 'event_list' }]
    const [resp_data, setData] = useState([])
    const [nodata, setNodata] = useState(false);
    const [tabs, setTabs] = useState(undefined)
    const [tag, setTag] = useState([]);
    const [news, setNews] = useState([]);
    const router = useRouter()
    const contentRef = useRef(null)

    let cardref = useRef(null);
    let page_no = 1;
    let pageNo = 1;
    let no_product = false;
    let no_tag = false;
    const icons = [{ icon: "/bookstore/linkedin.svg", name: 'Linkedin' }, { icon: "/bookstore/FB.svg", name: 'Facebook' }, { icon: "/bookstore/twitter.svg", name: 'Twitter' }, { icon: "/bookstore/whatsapp.svg", name: 'Whatsapp' }]


    useEffect(() => {
        getLatestNews()
        if (res && res.data && res.data.length != 0) {
            console.log(res)
            setData(res.data)
            // console.log(router)
            
            // setActivatedData([...res.data['news_list'], ...res.data['event_list'], ...res.data['article_list']]);
        }

        if (data && data.length != 0) {
            // console.log(data)
            setTabs('all')
            data.unshift({ name: 'All', route: 'all' })
            setTag(data)
        }
        // console.log(res)
        // console.log(data)

        // getTags();

        scrollElement()
        const intersectionObserver = new IntersectionObserver(entries => {
            if (entries[0].intersectionRatio <= 0) return;
            if (!no_product) {
                // console.log('scroll')
                page_no > 1 ? get_list() : null
                page_no = page_no + 1
            }
        });
        intersectionObserver?.observe(cardref?.current);

        return () => {
            cardref?.current && intersectionObserver.unobserve(cardref?.current)
        }
    }, [router.query])



    const get_list = async () => {
        // const param = await router.query.id;
        const params = {
            tag_route: '',
            page_no: page_no
        }
        const resp = await getTagsList(params);
        if (resp && resp.status && resp.status == 'success') {
            if (resp.message.data.length != 0) {
                setData((d) => d = [...d, ...resp.message.data]);
            } else {
                no_product = true;
                // setNodata(!nodata)
            }
        }
    }

    const getTag = async () => {
        let param1 = {
            page_no: pageNo,
            page_size: 20,
            doctype: 'Tags',
            fields: ['name', 'route']
        }

        const response = await getList(param1);
        if (response.message && response.message.length != 0) {
            setTag(d => d = [...d, ...response.message])
        } else {
            no_tag = true
        }
    }

    const scrollElement = () => {
        const el = document.getElementById('scroll');
        const el1 = document.getElementById('scrollTag');
        el.addEventListener('scroll', ($event) => {
            // console.log($event)
            if ($event.target.scrollTop + $event.target.offsetHeight >= $event.target.scrollHeight) {
                if (!no_product) {
                    // console.log('scroll')
                    page_no > 1 ? get_list() : null
                    page_no = page_no + 1
                }
                // page_no = page_no + 1
                // get_list()
            }
        })

        el1.addEventListener('scroll', ($event) => {
            // console.log($event)
            if ($event.target.scrollTop + $event.target.offsetHeight >= $event.target.scrollHeight) {
                if (!no_tag) {
                    // console.log('scroll')
                    pageNo > 1 ? getTag() : null
                    pageNo = pageNo + 1
                }
                // page_no = page_no + 1
                // get_list()
            }
        })
    }

    const checkRoute = (data) => {
        // console.log(data);
        // else if (data.doctype == 'News') {
        //     router.push('/news/' + data.route)
        // }
        if (data.doctype == 'Articles') {
            // router.push(data.ir_prime == 1 ? '/IRPrime/' + data.route : '/categories/' + data.route)
            router.push('/' + data.route)
        } else if (data.doctype == 'Community Event') {
            router.push('/events/' + data.route)
        }
    }


    // Activate and Change route
    const getTabs = (data) => {
        // setTabs(data);
        router.push('/tag/' + data)
        // console.log(data)
    }

    // Latest News
    const getLatestNews = async () => {
        const params = {
            fields: ['name', 'route', 'title', 'primary_text', 'secondary_text', 'publisher', 'thumbnail_imagee as thumbnail_image'],
            doctype: 'Articles',
            page_no: 1,
            page_size: 3
        }

        const resp = await getList(params);
        if (resp.message && resp.message.length != 0) {
            // console.log(resp.message)
            setNews(resp.message)
        }
    }

    return (
        <>
            <RootLayout>
                <div className={`container md:py-[15px] lg:p-[20px_0]`}>
                    <div class="lg:flex lg:gap-[15px] md:block">
                        <div id={'scrollTag'} class="lg:flex-[0_0_calc(20%_-_10px)] lg:h-[calc(100vh_-_15px)] overflow-auto scrollbar-hide p-[10px] md:hidden border rounded-[10px]">
                            {(tabs && tag && tag.length != 0) && <Tabs categories={tag} tab={tabs} setTabs={(data) => getTabs(data)} />}
                            <TrendingBox />
                        </div>
                        <div id='scroll' className="lg:flex-[0_0_calc(50%_-_10px)]  lg:p-5  md:basis-full lg:h-[calc(100vh_-_15px)] overflow-auto scrollbar-hide ">
                            {/* <div className=''> */}
                            {(resp_data && resp_data.length != 0 && !nodata) ?
                                <div className={`lg:grid  lg:grid-cols-1 lg:gap-5 `}>
                                    {resp_data.map((res, index) => {
                                        return (
                                            <div key={index} onClick={() => checkRoute(res)} className={`md:flex-[0_0_calc(70%_-_10px)] cursor-pointer border-b-[4px] border-[#f1f1f1] md:mb-[15px] md:pb-[15px]`}>
                                                {/* <div className='flex justify-between items-center'> */}
                                                <div className='flex items-center md:px-[10px] gap-[10px]'>
                                                    <Image className='h-[30px] w-[30px] object-contain' src={'/Navbar/IR-01.svg'} height={20} width={20} alt='ir prime' />
                                                    <p className='text-[14px] font-semibold capitalize'>{res.category ? res.category : ''}</p>
                                                </div>
                                                {/* </div> */}
                                                <h6 className={`title line-clamp-2 md:p-[10px] lg:py-[10px]`}>{res.title}</h6>
                                                <div>
                                                    <Image loading="lazy" blurDataURL={'/empty_state.svg'} placeholder='blur' src={check_Image(res.image ? res.image : res.thumbnail_imagee)} height={500} width={800} className={`w-full h-[320px] lg:rounded-[5px]`} alt={res.title ? res.title : index} />
                                                </div>
                                                <div className={`lg:py-[10px] md:p-[10px_10px_0_10px] flex  ${res.doctype == 'Community Event' ? 'justify-end' : 'justify-between'}`}>
                                                    {res.doctype != 'Community Event' && <div className='flex lg:gap-4 items-center md:gap-[10px] md:justify-between'>
                                                        {/* {res.primary_text && <p className={`${res.primary_text ? 'primary_text' : ''}`}>{res.primary_text ? res.primary_text : ''}</p>} */}
                                                        <div className='flex  items-center gap-2'><Image height={11} width={11} alt={"image"} src={'/views.svg'} className='md:m-auto' /><span className='text-[12px] md:text-[10px] gray-text'>{res.views} Views</span></div>
                                                        <div className='flex items-center gap-2'><Image height={11} width={13} alt={"image"} className='md:h-[13px] md:w-[11px] md:m-auto' src={'/shares.svg'} /><span className='md:text-[10px] text-[12px] gray-text'>{res.no_of_shares ? res.no_of_shares : 0 + ' shares'}</span></div>
                                                        <div className='flex  items-center gap-2'><Image height={12} width={12} alt={"image"} src={'/time.svg'} className='md:m-auto' /><span className='text-[12px] md:text-[10px] gray-text'>{res.read_time} Minutes </span></div>
                                                    </div>}
                                                    {icons && <Dropdowns share={true} link={{ route: (res.doctype == 'Articles' && res.ir_prime == 1) ? '/IRPrime/' + res.route : (res.doctype == 'Articles' && res.ir_prime != 1) ? '/categories/' + res.route : res.doctype == 'Community Event' ? '/events/' + res.route : null }} width={'w-[170px]'} type={'tag'} data={icons} />}

                                                    {/* <p className={`sub_title line-clamp-2 pt-[5px]`}>{res.blog_intro}</p> */}
                                                </div>
                                            </div>
                                        )
                                    })}

                                </div>
                                : nodata ? <></> : <div className='grid lg:flex-[0_0_calc(50%_-_10px)] place-content-center'>
                                    <div>
                                        <Image src={'/empty_states/no-article.svg'} className='' height={200} width={300} alt={'no data'} />
                                    </div>
                                    <h6 className='text-[16px] font-semibold text-center pt-[15px]'>No Data Found...</h6>
                                </div>}

                        </div>
                        {/* </div> */}
                        <div class="lg:flex-[0_0_calc(30%_-_10px)] md:hidden">
                            {(news && news.length != 0) && <div className='p-[10px]'>
                                <Title data={{ title: 'Latest News' }} />
                                <List data={news} isHome={'/'} flex={'mb-[10px]'} hash_bg={'lg:pt-[10px]'} primary_pb={'lg:pb-[5px]'} titleClamp={'line-clamp-2'} borderRadius={'rounded-[5px]'} imgFlex={'flex-[0_0_calc(35%_-_10px)]'} imgHeight={'h-[85px]'} imgWidth={'w-full'} />
                            </div>}
                            <AdsBaner data={{ ad_image: '/ads_baner.png' }} height={'h-[250px]'} width={'w-[300px]'} />
                        </div>
                        <div className='more h-[30px]' ref={cardref}></div>

                    </div>
                </div>

            </RootLayout>
        </>
    )
}


export async function getServerSideProps() {

    const param = {
        tag_route: '',
        page_no: 1
    }
    const resp = await getTagsList(param);
    let res = resp.message;
    // if (resp.data && resp.data.length != 0) {
    //     res = resp;
    // }

    let param1 = {
        page_no: 1,
        page_size: 20,
        doctype: 'Tags',
        fields: ['name', 'route']
    }

    const response = await getList(param1);
    const data = response.message;
    return {
        props: { res, data }
    }

}