import React from 'react';
import footer from '@/libs/footer';
import Image from 'next/image';
import { check_Image } from '@/libs/api';
export default function MainFooter({ footerData }) {
    console.log(footerData)

    return (
        <>
            {/* <div className={`footer`}>
                <div className='container md:flex-wrap flex gap-11 p-[30px_0px] md:p-[13px]'>
                    {footer.footer.section_1 && <div className={`flex-[0_0_calc(25%_-_10px)] md:flex-[0_0_calc(100%_-_10px)]`}>
                            <Image src={footer.footer.section_1.image} height={66} width={200} alt={"image"} />
                            <h6 className='font-medium pb-1 text-[13px]'>{footer.footer.section_1.addresstitle}</h6>
                            <p className='address font-normal text-[13px]'>{footer.footer.section_1.address}</p>

                            <h6 className='font-medium pb-1 pt-2 text-[13px]'>{footer.footer.section_1.addresstitle1}</h6>
                            <p className='address font-normal text-[13px]'>{footer.footer.section_1.address1}</p>

                            <span className='flex flex-row mt-2.5 gray-text'>
                                <Image src={footer.footer.section_1.phoneicon} height={18} width={18} alt={"image"} className='mr-2 m-0.5' />
                                <a href={`tel:${footer.footer.section_1.phonenumber}`} className='hover:text-[red] text-[12px]'>{footer.footer.section_1.phonenumber}</a>
                            </span>
                            <span className='flex flex-row mt-2.5 gray-text'>
                                <Image src={footer.footer.section_1.mailicon} height={18} width={18} alt={"image"} className='mr-2 m-0.5' />
                                <a href={`mailto:${footer.footer.section_1.mail}`} className='hover:text-[red] text-[12px]'>{footer.footer.section_1.mail}</a>
                            </span>
                            <h6 className='text-[16px] font-semibold pb-[10px] pt-[20px]'>Our Social Media</h6>
                            <div className='flex items-center gap-[13px] py-[10px]'>
                                {footer.footer.section_1.socials && footer.footer.section_1.socials.map((res, index) => {
                                    return (
                                        <div key={index}><a href={res.link} target='_blank'><Image src={res.icon} height={20} width={25} alt='icon' className='h-[34px] w-[34px]' /></a></div>
                                    )
                                })}
                            </div>

                            <h6 className='text-[16px] font-semibold py-3'>Download Indiaretailing App</h6>
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
                                    <h6 className='text-[15px] font-semibold mb-3'>{res.title}</h6>
                                    {(res.footerlinks && res.footerlinks.length != 0) && res.footerlinks.map((item, index) => {
                                        return (
                                            <a href={item.link} key={index}><p className='sub_title pb-2 hover:text-[red]'>{item.footerlink}</p></a>
                                        )
                                    })}
                                </div>
                            )
                        })}
                    </div>
                    }
                </div>
            </div>
            <p className='copy_write md:p-[15px_25px] mb-[10px]'>{footer.footer.copy_write}<a href={`${footer.footer.copy_link}`} className='hover:text-[red]'> {footer.footer.copy_link_text}</a>. All Rights Reserved</p> */}

            <div className='footer lg:mt-[30px]'>
                {footerData && <div className={` container flex md:block gap-[20px] py-[20px] md:px-[30px] `}>
                    {footerData.items && footerData.items.map((footer_item, index) => {
                        return (
                            <div key={index} className={`flex-[0_0_${100 / footerData.items.length}%] ${'md:flex md:flex-wrap md:mb-[10px]'}`}>
                                {footer_item.items && footer_item.items.map((item, i) => {
                                    return (
                                        <div key={i}>
                                            {/* // <> */}
                                            {item.section_name == 'Footer Contact' &&
                                                <div className={` flex-[0_0_calc(25%_-_10px)] md:flex-[0_0_calc(100%_-_10px)]`}>
                                                    <Image src={check_Image(item.logo)} height={66} width={200} alt={"image"} className='mb-[20px]' />
                                                    <h6 className='font-medium pb-1 text-[13px]'>{item.title}</h6>
                                                    <p className='address font-normal text-[13px]'>{item.address_content}</p>
                                                    <span className='flex flex-row mt-2.5 gray-text'>
                                                        <Image src={check_Image(item.phone_icon)} height={18} width={18} alt={"image"} className='mr-2 m-0.5' />
                                                        <a href={`tel:${item.phonenumber}`} className='hover:text-[red] text-[12px]'>{item.phone_no}</a>
                                                    </span>
                                                    <span className='flex flex-row mt-2.5 gray-text'>
                                                        <Image src={check_Image(item.email_icon)} height={19} width={19} alt={"image"} className='mr-2 m-0.5' />
                                                        <a href={`mailto:${item.email_id}`} className='hover:text-[red] text-[12px]'>{item.email_id}</a>
                                                    </span>
                                                </div>}
                                            {item.section_name == 'Social Links' &&
                                                <>
                                                    <div className='md:flex-[0_0_calc(100%_-_10px)]' >
                                                        <h6 className='text-[16px] font-semibold pb-[10px] pt-[20px] '>Our Social Media</h6>
                                                        <div className='flex items-center gap-[13px] py-[10px]'>
                                                            {item.social_links && item.social_links.map((res, index) => {
                                                                return (
                                                                    <div key={index}><a href={res.link_url} target='_blank'><Image src={check_Image(res.icon)} height={20} width={25} alt='icon' className='h-[34px] w-[34px]' /></a></div>
                                                                )
                                                            })}
                                                        </div>
                                                    </div>
                                                    <div className='md:flex-[0_0_calc(100%_-_10px)]' >
                                                        <h6 className='text-[16px] font-semibold py-3'>Download Indiaretailing App</h6>
                                                        <div className='flex gap-[15px] items-center'>
                                                            <Image src={'/footer/play-store.svg'} className='h-[32px] w-[101px]' height={15} width={20} alt={'app-store'} />
                                                            <Image src={'/footer/app-store.svg'} className='h-[32px] w-[101px]' height={15} width={20} alt={'app-store'} />
                                                        </div>
                                                    </div>
                                                </>

                                            }

                                            {item.section_name == "Menu" &&
                                                <div className={`list_div leading-[2.5] ${(i % 2 == 0) ? 'min-h-[290px]' : ''} md:flex-[0_0_calc(50%_-_20px)] md:min-h-[20px]  md:mr-[20px]`} >
                                                    <h6 className='text-[15px] font-semibold mb-3'>{item.title}</h6>
                                                    {(item.menus && item.menus.length != 0) && item.menus.map((item, index) => {
                                                        return (
                                                            <a target={item.title == 'Events' ? '_blank' : '_self'} href={item.redirect_url} key={index}><p className='sub_title pb-2 hover:text-[red]'>{item.menu_label}</p></a>
                                                        )
                                                    })}
                                                </div>
                                            }
                                        </div>
                                        // {/* </> */ }
                                    )
                                })}
                            </div>

                        )
                    })}
                </div>}
            </div>
            <p className='copy_write md:p-[15px_25px] my-[10px]'>{footer.footer.copy_write}<a href={`${footer.footer.copy_link}`} className='hover:text-[red]'> {footer.footer.copy_link_text}</a>. All Rights Reserved</p>
        </>
    )
}


