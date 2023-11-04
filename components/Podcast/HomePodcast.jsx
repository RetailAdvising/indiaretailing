import Cards from '../common/Cards'
import Title from '../common/Title'

export default function HomePodcast({ data,i }) {
    return (
        <>
            <div className={`flex md:p-[10px] justify-between flex-wrap  container ${i == 0 ? 'py-[15px]': 'pb-[15px]'}`}>
                {/* { */}
                    {/* // <div className={`w-full md:basis-full`}> */}
                        {/* <div> */}
                            {(data.data) && <>
                                {data && data.category && <Title title_class={'w-full'} data={data} seeMore={true} />}
                                <div className={`md:flex gap-[15px]  no_scroll grid grid-cols-5 w-full`}>
                                    <Cards isHome={'/podcast/'} data={data.data} check={true} border_none={true} width={'w-[100%]'} height={'h-[220px]'} flex={'flex-[0_0_calc(20%_-_10px)] md:flex-[0_0_calc(70%_-_10px)]'} />
                                </div>
                            </>
                            }
                        {/* </div> */}
                    {/* // </div> */}
                {/* } */}
            </div>
        </>
    )
}