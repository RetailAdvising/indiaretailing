import React from 'react'
import footer from '@/libs/footer';
import Image from 'next/image';
export default function MainFooter() {

    return (
        <>
            <div className={`footer`}>
                <div className='container md:flex-wrap flex gap-11 p30 '>
                    {footer.footer.section_1 &&
                        <div className={`flex-[0_0_calc(25%_-_10px)] md:flex-[0_0_calc(100%_-_10px)]`}>
                            <Image src={footer.footer.section_1.image} height={100} width={250} alt={"image"} />
                            <p className='font-bold	pb-1'>{footer.footer.section_1.addresstitle}</p>
                            <p className='address font-normal	'>{footer.footer.section_1.address}</p>

                            <p className='font-bold pb-1 pt-2'>{footer.footer.section_1.addresstitle1}</p>
                            <p className='address font-normal	'>{footer.footer.section_1.address1}</p>

                            <span className='flex flex-row mt-2.5 gray-text'>
                                <Image src={footer.footer.section_1.phoneicon} height={18} width={18} alt={"image"} className='mr-3 m-0.5' />
                                <a href='tel:{footer.footer.section_1.phonenumber}' className='hover:text-[red]'>{footer.footer.section_1.phonenumber}</a>
                            </span>
                            <span className='flex flex-row mt-2.5 gray-text'>
                                <Image src={footer.footer.section_1.mailicon} height={18} width={18} alt={"image"} className='mr-3 m-0.5' />
                                <a href='mailto:{footer.footer.section_1.mail}' className='hover:text-[red]'>{footer.footer.section_1.mail}</a>
                            </span>
                            <p className='text-[16px] font-semibold pb-[10px] pt-[20px]'>Our Social Media</p>
                            <div className='flex items-center gap-[15px] py-[10px]'>
                                {footer.footer.section_1.socials && footer.footer.section_1.socials.map((res, index) => {
                                    return (
                                        <div key={index}><a href='{res.link}' target='_blank'><Image src={res.icon} height={20} width={25} alt='icon' className='h-[34px] w-[34px]' /></a></div>
                                    )
                                })}
                            </div>

                            <p className='text-[16px] font-semibold py-3'>Download Indiaretailing App</p>
                            <div className='flex gap-[15px] items-center'>
                                <Image src={'/footer/play-store.svg'} className='h-[32px] w-[101px]' height={15} width={20} alt={'app-store'} />
                                <Image src={'/footer/app-store.svg'} className='h-[32px] w-[101px]' height={15} width={20} alt={'app-store'} />
                            </div>
                        </div>
                    }

                    {(footer.footer.section_2 && footer.footer.section_2.child_data) && <div className={`grid grid-cols-4 md:grid-cols-2 gap-[100px_20px] md:gap-5 md:flex-[0_0_calc(100%_-_10px)] flex-[0_0_calc(75%_-_10px)] `}>
                        {footer.footer.section_2.child_data.map((res, index) => {
                            return (
                                <div key={index} className={`list_div leading-[2.5]`}>
                                    <h6 className='text-[15px] font-semibold'>{res.title}</h6>
                                    {res.data && res.data.map((res, index) => {
                                        return (
                                            <a href='{res.link}' target='_blank' key={index}><p className='sub_title hover:text-[red]'>{res}</p></a>
                                        )
                                    })}
                                </div>
                            )
                        })}
                    </div>
                    }
                </div>
            </div>
            <p className='copy_write'>{footer.footer.copy_write}<a href='{footer.footer.copy_link}' className='hover:text-[red]'> {footer.footer.copy_link_text}</a>. All Rights Reserved</p>

            
        </>
    )
}


