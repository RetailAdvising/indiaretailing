import TopStories from '../Landing/TopStories'
import Cards from '../common/Cards'
import Title from '../common/Title'

export default function HomePodcast({ data }) {
    // console.log(data)
    return (
        <>
            <div className={`${data.layout_id == "STL-0003" && 'border_bottom'}`} style={{ background: data.background }}>
                <div className={`flex p-[20px_30px] md:p-[10px] justify-between flex-wrap gap-[25px] container`}>
                    {
                        (data.layout_json) && data.layout_json.map((item, index) => {
                            return (
                                <div key={index} className={`${item.class} w-full md:basis-full`} style={{ background: item.background }}>
                                    {item.components.map((resp, index) => {
                                        return (
                                            <div className={`${resp.class}`} key={index}>
                                                {(resp.component_title == 'TopStories' && resp.data && resp.data.data) && <div className={`flex gap-5 md:flex-col justify-between`}><TopStories data={resp.data.data} /></div>}
                                                {(resp.component_title == "CardSpecial" && resp.component_type == "card" && resp.data) && <>
                                                    <Title data={resp.data} seeMore={true} />
                                                    <div className={`flex gap-[10px] justify-between no_scroll lg:flex-wrap`}>
                                                        <Cards data={resp.data.data} border_none={true} height={'h-[190px]'} flex={'flex-[0_0_calc(20%_-_10px)] md:flex-[0_0_calc(50%_-_10px)]'} />
                                                    </div>
                                                    </>
                                                }
                                            </div>
                                        )
                                    })}
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            {/* <h6>welcome </h6> */}
        </>
    )
}