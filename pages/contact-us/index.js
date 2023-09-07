import React from 'react';
import footer from '@/libs/footer';
import Image from 'next/image';
import RootLayout from '@/layouts/RootLayout';

export default function Contact() {
 
    return (
      <RootLayout>
            <div className={`footer`}>
                <div className='container gap-11 p-[30px_0px] md:p-[15px] '>
                    {footer.footer.section_1 && <div className={`flex-[0_0_calc(25%_-_10px)] md:flex-[0_0_calc(100%_-_10px)] flex flex-row`}>
                    <div className="basis-2/6">
                            <h6 className='font-bold pb-1'>{footer.footer.section_1.addresstitle}</h6>
                            <p className='address font-normal'>{footer.footer.section_1.address}</p>

                            <h6 className='font-bold pb-1 pt-2'>{footer.footer.section_1.addresstitle1}</h6 >
                            <p className='address font-normal'>{footer.footer.section_1.address1}</p>
                            </div>
                            <div className="basis-2/6">
                            <span className='flex flex-row mt-2.5 gray-text'>
                                <Image src={footer.footer.section_1.phoneicon} height={18} width={18} alt={"image"} className='mr-3 m-0.5' />
                                <a href={`tel:${footer.footer.section_1.phonenumber}`} className='hover:text-[red]'>{footer.footer.section_1.phonenumber}</a>
                            </span>
                            <span className='flex flex-row mt-2.5 gray-text'>
                                <Image src={footer.footer.section_1.mailicon} height={18} width={18} alt={"image"} className='mr-3 m-0.5' />
                                <a href={`mailto:${footer.footer.section_1.mail}`} className='hover:text-[red]'>{footer.footer.section_1.mail}</a>
                            </span>
                            </div>
                            <div className="basis-2/6">
                            <h6 className='text-[16px] font-semibold pb-[10px] pt-[20px]'>Our Social Media</h6>
                            <div className='flex items-center gap-[15px] py-[10px]'>
                                {footer.footer.section_1.socials && footer.footer.section_1.socials.map((res, index) => {
                                    return (
                                        <div key={index}><a href={res.link} target='_blank'><Image src={res.icon} height={20} width={25} alt='icon' className='h-[34px] w-[34px]' /></a></div>
                                    )
                                })}
                            </div>
                            </div>

                            {/* <p className='text-[16px] font-semibold py-3'>Download Indiaretailing App</p>
                            <div className='flex gap-[15px] items-center'>
                                <Image src={'/footer/play-store.svg'} className='h-[32px] w-[101px]' height={15} width={20} alt={'app-store'} />
                                <Image src={'/footer/app-store.svg'} className='h-[32px] w-[101px]' height={15} width={20} alt={'app-store'} />
                            </div> */}
                        </div>
                    }
                </div>
            </div>
      </RootLayout>
    )
}


