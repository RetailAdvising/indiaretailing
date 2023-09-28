import Cards from '../common/Cards'
import Title from '../common/Title'

export default function HomePodcast({ data }) {
    return (
        <>
            <div className={`flex p-[20px_0px] md:p-[10px] justify-between flex-wrap gap-[25px] container`}>
                {
                    <div className={`w-full md:basis-full`}>
                        <div>
                            {(data.data) && <>
                                {data && data.category && <Title data={data} seeMore={true} />}
                                <div className={`flex gap-[10px]  no_scroll lg:flex-wrap`}>
                                    <Cards isHome={'/podcast/'} data={data.data} check={true} border_none={true} width={'w-[100%]'} height={'h-[220px]'} flex={'flex-[0_0_calc(20%_-_10px)] md:flex-[0_0_calc(70%_-_10px)]'} />
                                </div>
                            </>
                            }
                        </div>
                    </div>
                }
            </div>
        </>
    )
}