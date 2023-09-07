// import TopStories from '../Landing/TopStories'
import Cards from '../common/Cards'
import Title from '../common/Title'

export default function HomePodcast({ data }) {
    // data.data = data.podcasts
    // console.log(data.data)
    return (
        <>
            {/* <div className={`${data.layout_id == "STL-0003" && 'border_bottom'}`} style={{ background: data.background }}> */}
                <div className={`flex p-[20px_0px] md:p-[10px] justify-between flex-wrap gap-[25px] container`}>
                    {
                        // (data.podcast) && data.podcast.map((item, index) => {
                        //     return (
                                <div className={`w-full md:basis-full`}>
                                    {/* {data.podcasts.map((resp, index) => {
                                        return ( */}
                                        {/* className={`${resp.class}`} key={index} */}
                                            <div>
                                                {/* {(resp.component_title == 'TopStories' && resp.data && resp.data.data) && <div className={`flex gap-5 md:flex-col justify-between`}><TopStories data={resp.data.data} /></div>} */}
                                                {(data.data) && <>
                                                {/* {(resp.component_title == "CardSpecial" && resp.component_type == "card" && resp.data) && <> */}
                                                    {/* <Title data={data} seeMore={true} /> */}
                                                    {data && data.category && <Title data={data} seeMore={true} />}
                                                    <div className={`flex gap-[10px] justify-between no_scroll lg:flex-wrap`}>
                                                        <Cards data={data.data} check={true} border_none={true} width={'w-[100%]'} height={'h-[220px]'} flex={'flex-[0_0_calc(20%_-_20px)] md:flex-[0_0_calc(50%_-_10px)]'} />
                                                    </div>
                                                    </>
                                                }
                                            </div>
                                        {/* )
                                    })} */}
                                </div>
                        //     )
                        // })
                    }
                </div>
            {/* </div> */}
            {/* <h6>welcome </h6> */}
        </>
    )
}