import React, { Fragment, useEffect, useState } from 'react'
import { Popover, Transition } from '@headlessui/react'
import Image from 'next/image';
import { WhatsappShareButton, LinkedinShareButton, TwitterShareButton, FacebookShareButton } from 'react-share'
import { useRouter } from 'next/router';
import { checkMobile } from '@/libs/api'
import { ToastContainer, toast } from 'react-toastify';

// import { Menu } from '@headlessui/react'
export default function Dropdowns({ data, img, width, share, setting, element, type, link, updateShare, noScroll }) {
    const router = useRouter();


    const settings = async (data) => {
        if (data.name == 'More Stories') {
            // router.push('/' + router.asPath.split('/')[1] + '/' + router.asPath.split('/')[2])
            router.push('/categories/' + link)
        } else if (data.name == 'Copy Link') {
            // console.log('https://indiaretail.vercel.app' + router.asPath)
            let str = 'https://indiaretail.vercel.app' + router.asPath
            // let str = 'https://indiaretail.vercel.app/' + router.asPath.split('/')[1]
            await navigator?.clipboard?.writeText(str);
            // navigator?.clipboard?.writeText(str);
            toast.success("Link copied successfully")
            // copyToClipboard(str);
        } else if (data.name == 'Comment') {
            // let el = document.getElementById(element)
            let el = document.getElementsByClassName(element)
            let doc = Array.from(el)
            noScroll(isMobile ? false : true);
            for (let index = 0; index < doc.length; index++) {
                const element = doc[index];
                // console.log(element)
                element.scrollIntoView({ block: 'center', behavior: 'smooth', inline: 'nearest' })
            }
            // console.log(el)
            // console.log(doc)
            // el && window.scrollTo(0, 10000)
            // el && el.scrollIntoView({ block: 'center', behavior: 'smooth', inline: 'nearest' })
            // (doc) && doc.scrollIntoView({ block: 'end', behavior: 'smooth', inline: 'nearest' })
            // window.location.href= el && el
        }
    }

    function Position(obj) {
        var currenttop = 0;
        if (obj.offsetParent) {
            do {
                currenttop += obj.offsetTop;
            } while ((obj = obj.offsetParent));
            return [currenttop];
        }
    }


    // async function copyToClipboard(text) {
    //     if (!navigator.clipboard) {
    //       console.error('undefined navigator.clipboard');
    //       return;
    //     }
    //     await navigator?.clipboard?.writeText(text).then(function() {
    //       console.log('Async: Copying to clipboard was successful!');
    //     }, function(err) {
    //       console.error('Async: Could not copy text: ', err);
    //     });
    //   }

    //   function getCurrentURL() {
    //       $parameters.URL = window.location.href.split('?')[0];

    //       var params = window.location.href.split('?')[1];
    //       $parameters.Parameters = params ? params : '';

    //       return $parameters.URL;
    //   }

    //   var currentURL = getCurrentURL();



    const [isMobile, setIsMobile] = useState()
    useEffect(() => {
        // console.log(router)
        checkIsMobile();
        window.addEventListener('resize', checkIsMobile)
        return () => {
            window.removeEventListener('resize', checkIsMobile);
        };
    }, [])

    const checkIsMobile = async () => {
        let isMobile = await checkMobile();
        (!isMobile && !share && setting) && noScroll(true)
        setIsMobile(isMobile);
        // !isMobile && noScroll(true);
    }

    const myAccounts = (data) => {
        if (data.name == 'Logout') {
            localStorage.clear();
            router.push('/login')
        } else if (data.name == 'Profile') {
            router.push(isMobile ? data.mob_route : data.route)
        }
    }

    // const [title, setTitle] = useState()
    // const [description, setDescription] = useState()
    // const [image, setImage] = useState()
    // const onClick = async () => {
    //     // Be sure to check for the "none" state, so we don't trigger an infinite loop.
    //     // if (url === "none") {
    //     //   const newUrl = await getUrFromService();
    //     //   setUrl(newUrl);
    //     // }
    //     // console.log('btn clicked...')
    //     let titles = document.querySelector('meta[property="og:title"]')
    //     let desc = document.querySelector('meta[property="og:description"]')
    //     let images = document.querySelector('meta[property="og:image"]')
    //     // console.log(titles.getAttribute('content'))
    //     setTitle(titles.getAttribute('content'))
    //     // console.log(desc.getAttribute('content'))
    //     setDescription(desc.getAttribute('content'))
    //     // console.log(images.getAttribute('content'))
    //     setImage(images.getAttribute('content'))
    // };

    // Whenever "url" changes and we re-render, we manually fire the click event on the button, and then re-set the url.
    // useEffect(() => {
    //     // if (url !== "none") {
    //     //   shareButton.current?.click();
    //     //   setUrl("none");
    //     // }
    //     if (typeof window != 'undefined') {
    //         let titles = document.querySelector('meta[property="og:title"]')
    //         let desc = document.querySelector('meta[property="og:description"]')
    //         let images = document.querySelector('meta[property="og:image"]')
    //         setTitle(titles.getAttribute('content'))
    //         // console.log(images,'meta image')
    //         setDescription(desc.getAttribute('content'))
    //         setImage(images.getAttribute('content'))
    //     }

    // }, []);



    return (
        <>
            {/* ${share ? 'w-[17px]' : type == 'head' ? 'w-[auto]' : 'w-[8px]'} */}
            <Popover className={`relative `}>
                {({ open }) => (
                    <>
                        <Popover.Button className={`${open ? '' : ''} lg:border-[1px] border-slate-100 rounded-[5px] h-[32px] lg:w-[32px] flex items-center justify-center bg-[#e9e9e9]`}>
                            {/* <span>{btn_name}</span> */}
                            <div className='flex gap-[10px] items-center'>
                                {/*  */}
                                <Image src={share ? '/share1.svg' : img} height={share ? 18 : 5.5} width={share ? 18 : 5.5} alt='img' className={`object-contain ${share ? 'h-[15px] w-[15px]' : 'h-[16px]'}`} />
                                {(localStorage['full_name'] && type == 'head') && <p className='text-[14px] font-semibold'>{localStorage['full_name']}</p>}
                            </div>
                        </Popover.Button>

                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0 translate-y-1"
                            enterTo="opacity-100 translate-y-0"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100 translate-y-0"
                            leaveTo="opacity-0 translate-y-1">
                            {/* absolute md:left-[-55px] z-[99] rounded-[10px] mt-3 bg-white -translate-x-1/2 transform */}
                            <Popover.Panel className={`arrow_ absolute z-[99] rounded-[10px] mt-[8px]  bg-white md:right-0  transform  ${type == 'tag' ? 'lg:!right-0 ' : 'lg:left-0'}`}>
                                <div className={`overflow-hidden ${width} shadow-[0_0_5px_#dddddd91] rounded-[7px_10px_10px_10px] bg-[#fff]`}>
                                    <div className="p-[7px]">
                                        {!share ? <>
                                            {data.map((res, index) => {
                                                return (
                                                    <div onClick={() => setting ? settings(res) : type == 'head' ? myAccounts(res) : null} className={`cursor-pointer flex items-center justify-between rounded-[5px] hover:bg-[#f1f1f1] p-[8px_10px]`} key={index}>
                                                        <div className='flex items-center gap-[5px]'>
                                                            {res.icon && <div className='h-[17px] flex items-center justify-center'><Image className='object-contain h-[18px] w-[18px]' src={res.icon} height={20} alt={res.name} width={20} /></div>}
                                                            <p className={`${(index != data.length - 1 && !res.icon) ? '' : ''} mb-[1px] text-[14px] ${(router.asPath.split('/')[1] == 'news' && res.name == 'Comment') ? 'hidden' : ''}`}>{res.name}</p>
                                                        </div>

                                                        <div className='flex items-center justify-center h-[18px]'><Image className='h-[11px] w-[5px] object-contain' src={'/forwardIcon.svg'} height={5} width={5} alt='View All' /></div>

                                                    </div>
                                                )
                                            })}
                                        </> : <>
                                            {data && data.map((res, index) => {
                                                return (
                                                    <div key={index} onClick={() => updateShare(link)} className='flex items-center justify-between rounded-[5px] hover:bg-[#f1f1f1] p-[8px_10px] cursor-pointer'>
                                                        <div className='flex items-center gap-[5px]'>
                                                            {res.name == 'Linkedin' &&
                                                                // title={title}  summary={description}   source={image}
                                                                <LinkedinShareButton 
        
                                                                 url={'https://indiaretail.vercel.app/' + (type == 'tag' ? link.route : type == 'articles' ? router.asPath.split('/')[1] : type == 'books' ? router.asPath.split('/')[1] + '/' + router.asPath.split('/')[2] + '/' + link.route : router.asPath.split('/')[1] + '/' + link.route)} className='flex items-center gap-[10px]'>
                                                                    <span className='h-[18px] w-[18px]'><Image src={res.icon} className='h-[18px] w-[18px] object-contain' height={40} width={40} alt={'imgs'} /></span>
                                                                    <p className={'text-[14px]'}>{res.name}</p>
                                                                </LinkedinShareButton>
                                                                // <a target='_blank' href={`http://www.linkedin.com/shareArticle?mini=true&url=https://indiaretail.vercel.app/${(type == 'tag' ? link.route : type == 'articles' ? router.asPath.split('/')[1] : type == 'books' ? router.asPath.split('/')[1] + '/' + router.asPath.split('/')[2] + '/' + link.route : router.asPath.split('/')[1] + '/' + link.route)}&submitted-image-url=${image}&title=${title}&summary=${description}&source=${(type == 'tag' ? link.route : type == 'articles' ? router.asPath.split('/')[1] : type == 'books' ? router.asPath.split('/')[1] + '/' + router.asPath.split('/')[2] + '/' + link.route : router.asPath.split('/')[1] + '/' + link.route)}`} >Linedin</a>
                                                                // <a target='_blank' href={`https://www.linkedin.com/sharing/share-offsite/?url=https://indiaretail.vercel.app/${(type == 'tag' ? link.route : type == 'articles' ? router.asPath.split('/')[1] : type == 'books' ? router.asPath.split('/')[1] + '/' + router.asPath.split('/')[2] + '/' + link.route : router.asPath.split('/')[1] + '/' + link.route)}&title=${title}&summary=${description}&source=${image}`}>
                                                                //     Share on LinkedIn
                                                                // </a>
                                                            }
                                                            {res.name == 'Facebook' && <FacebookShareButton  url={'https://indiaretail.vercel.app/' + (type == 'tag' ? link.route : type == 'articles' ? router.asPath.split('/')[1] : type == 'books' ? router.asPath.split('/')[1] + '/' + router.asPath.split('/')[2] + '/' + link.route : router.asPath.split('/')[1] + '/' + link.route)} className='flex items-center gap-[10px]'>
                                                                <span className='h-[18px] w-[18px]'><Image src={res.icon} className='h-[18px] w-[18px] object-contain' height={40} width={40} alt={'imgs'} /></span>
                                                                <p className={'text-[14px]'}>{res.name}</p>
                                                            </FacebookShareButton>}
                                                            {res.name == 'Twitter' && <TwitterShareButton url={'https://indiaretail.vercel.app/' + (type == 'tag' ? link.route : type == 'articles' ? router.asPath.split('/')[1] : type == 'books' ? router.asPath.split('/')[1] + '/' + router.asPath.split('/')[2] + '/' + link.route : router.asPath.split('/')[1] + '/' + link.route)} className='flex items-center gap-[10px]'>
                                                                <span className='h-[18px] w-[18px]'><Image src={res.icon} className='h-[18px] w-[18px] object-contain' height={40} width={40} alt={'imgs'} /></span>
                                                                <p className={'text-[14px]'}>{res.name}</p>
                                                            </TwitterShareButton>}
                                                            {res.name == 'Whatsapp' && <WhatsappShareButton
                                                               
                                                                // openShareDialogOnClick={url !== "none"}
                                                                // url={url}
                                                                 url={'https://indiaretail.vercel.app/' + (type == 'tag' ? link.route : type == 'articles' ? router.asPath.split('/')[1] : type == 'books' ? router.asPath.split('/')[1] + '/' + router.asPath.split('/')[2] + '/' + link.route : router.asPath.split('/')[1] + '/' + link.route)} className='flex items-center gap-[10px]'>
                                                                <span className='h-[18px] w-[18px]'><Image src={res.icon} className='h-[18px] w-[18px] object-contain' height={40} width={40} alt={'imgs'} /></span>
                                                                <p className={'text-[14px]'}>{res.name}</p>
                                                            </WhatsappShareButton>}
                                                        </div>

                                                        <div className='flex items-center justify-center h-[18px]'><Image className='h-[11px] w-[5px] object-contain' src={'/forwardIcon.svg'} height={5} width={5} alt='View All' /></div>

                                                    </div>
                                                )
                                            })}
                                        </>

                                        }
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

