import { useState } from 'react'
import { Tab } from '@headlessui/react'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Example({ categories, setTabs, tab, }) {
    // let [categories] = useState({
    //     Recent: [
    //         {
    //             id: 1,
    //             title: 'Does drinking coffee make you smarter?',
    //             date: '5h ago',
    //             commentCount: 5,
    //             shareCount: 2,
    //         },
    //         {
    //             id: 2,
    //             title: "So you've bought coffee... now what?",
    //             date: '2h ago',
    //             commentCount: 3,
    //             shareCount: 2,
    //         },
    //     ],
    //     Popular: [
    //         {
    //             id: 1,
    //             title: 'Is tech making coffee better or worse?',
    //             date: 'Jan 7',
    //             commentCount: 29,
    //             shareCount: 16,
    //         },
    //         {
    //             id: 2,
    //             title: 'The most innovative things happening in coffee',
    //             date: 'Mar 19',
    //             commentCount: 24,
    //             shareCount: 12,
    //         },
    //     ],
    //     Trending: [
    //         {
    //             id: 1,
    //             title: 'Ask Me Anything: 10 answers to your questions about coffee',
    //             date: '2d ago',
    //             commentCount: 9,
    //             shareCount: 5,
    //         },
    //         {
    //             id: 2,
    //             title: "The worst advice we've ever heard about coffee",
    //             date: '4d ago',
    //             commentCount: 1,
    //             shareCount: 2,
    //         },
    //     ],
    // })


    console.log(categories)

    return (
        <>
            {/* <div className="w-full max-w-md px-2 py-16 sm:px-0">
            <Tab.Group>
                <Tab.List className="flex space-x-1 p-1">
                    {Object.keys(categories).map((category) => (
                        <Tab
                            key={category}
                            className={({ selected }) =>
                                classNames(
                                    'w-full py-2.5 text-sm font-medium leading-5 text-[#b5b5b5]',

                                    selected
                                        ? 'bg-white text-red font-semibold border-b-[1px] border-[red]'
                                        : ''
                                )
                            }
                        >
                            {category}
                        </Tab>
                    ))}
                </Tab.List>
                <Tab.Panels className="mt-2">
                    <div className={`border p-[10px] rounded-[5px]`}><List check={true} titleClamp={'line-clamp-2'} isHome={'/news/'} imgFlex={'flex-[0_0_calc(40%_-_10px)]'} data={data.data[c.cid].data} imgWidth={"w-full"} imgHeight={"h-[125px]"} borderRadius={"rounded-[10px]"} /></div>

                    {Object.values(categories).map((posts, idx) => (
                        <Tab.Panel
                            key={idx}
                            className={classNames(
                                'rounded-xl bg-white p-3',
                                'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
                            )}
                        >
                            <ul>
                                {posts.map((post) => (
                                    <li
                                        key={post.id}
                                        className="relative rounded-md p-3 hover:bg-gray-100"
                                    >
                                        <h3 className="text-sm font-medium leading-5">
                                            {post.title}
                                        </h3>

                                        <ul className="mt-1 flex space-x-1 text-xs font-normal leading-4 text-gray-500">
                                            <li>{post.date}</li>
                                            <li>&middot;</li>
                                            <li>{post.commentCount} comments</li>
                                            <li>&middot;</li>
                                            <li>{post.shareCount} shares</li>
                                        </ul>

                                        <a
                                            href="#"
                                            className={classNames(
                                                'absolute inset-0 rounded-md',
                                                'ring-blue-400 focus:z-10 focus:outline-none focus:ring-2'
                                            )}
                                        />
                                    </li>
                                ))}
                            </ul>
                        </Tab.Panel>
                    ))}
                </Tab.Panels>
            </Tab.Group>
        </div>
         */}

            <div className='flex items-center'>
                {/* <p onClick={() => setTabs(categories)} className={`${tab == categories ? 'text-red font-semibold border-b-[1px] border-red' : ''}`}>{categories}</p> */}
                {categories && categories.length != 0 && <div className='flex items-center'>
                    {categories.map((res, i) => {
                        return (
                            <h6 className={`${tab == res ? 'text-red font-semibold' : ''}`} key={i} onClick={() => setTabs(res)}>{res}</h6>
                        )
                    })}


                </div>}
            </div>









        </>
    )
}
