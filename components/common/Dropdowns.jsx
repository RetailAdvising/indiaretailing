import React, { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import Link from 'next/link'
// import { Menu } from '@headlessui/react'
export default function Dropdowns({ btn_name, data }) {
    return (
        <>
            <Popover className="relative">
                {({ open }) => (
                    <>
                        <Popover.Button
                            className={`
                ${open ? '' : 'text-opacity-90'}
                group `}
                        >
                            <span>{btn_name}</span>
                        </Popover.Button>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0 translate-y-1"
                            enterTo="opacity-100 translate-y-0"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100 translate-y-0"
                            leaveTo="opacity-0 translate-y-1"
                        >
                            <Popover.Panel className="absolute z-[99] mt-3 bg-white -translate-x-1/2 transform  ">
                                <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                                    <div className=" p-4">
                                        {data.map((res, index) => {
                                            return (
                                                <Link href={res.route ? res.route : ''} key={index}>
                                                    <p className={`${index != data.length - 1 ? 'pb-[15px]' : ''}`}>{res.name}</p>
                                                </Link>
                                            )
                                        })}
                                    </div>
                                </div>
                            </Popover.Panel>
                        </Transition>
                    </>
                )}
            </Popover>
        </>
    )
}
