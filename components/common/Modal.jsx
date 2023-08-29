import React, { useEffect, useState } from 'react'
import Rodal from 'rodal';

// include styles
import 'rodal/lib/rodal.css';
import LogIn from '../Auth/LogIn';
import SignUp from '../Auth/SignUp';
import Comments from '../Category/Comments';
import Image from 'next/image';
import { addComment, commentList } from '@/libs/api'
import { useRouter } from 'next/router';
export default function Modal({ modal, hide, visible, data, cur }) {
    const [sort, setSort] = useState(false);
    const [sortbyVal, setSortByVal] = useState('Newest');
    const [pageno, setPageno] = useState(1);
    const [comments, setComments] = useState([]);
    const router = useRouter();
   
    function sortBy() {
        setSort(!sort);
        let element = document.getElementById('dropdown');
        sort ? element.classList.add('dropdown-menu-active') : element.classList.remove('dropdown-menu-active');
    }
    const sortby = [{ name: 'Newest' }, { name: 'Oldest' }]

    function setValues(e) {
        setSortByVal(e.name);
        sortBy();
    }


    useEffect(() => {
        if (cur && pageno == 1) {
            commentslist();
        }
    }, [pageno, comments])


    function checkValid() {
        if (!localStorage['apikey']) {
            router.push('/login')
        }
    }


    async function commentslist() {
        let param = { ref: cur.name, page_no: pageno, page_size: 10 };
        let resp = await commentList(param);
        // console.log(resp)
        if (resp.message && resp.message.length != 0) {
            setComments(resp.message);
        } 
    }

    async function loadMore() {
        // console.log('pagination')
        setPageno(pageno + 1);
        commentslist();
    }

    async function sendMsg(id) {
        let element = document.getElementById(id);
        if (element.value && element.value != '') {
            let param = { article: cur.name, comment: element.value };
            let resp = await addComment(param);
            if (resp.message) {
                setComments(c => [...c, resp.message])
                element.value = '';
            }
        }
    }


    return (
        <>
            {/* {show ? <div >
                <h6 >Hello modal</h6>
            </div> : null} */}

            {
                modal == 'login' ?
                    <Rodal visible={visible} animation='slideUp' onClose={hide}>
                        <LogIn hide={hide} isModal={true} />
                    </Rodal>
                    : modal == 'signup' ?
                        <Rodal visible={visible} animation='slideUp' onClose={hide}>
                            <SignUp hide={hide} isModal={true} />
                        </Rodal>
                        : modal == 'comments' ? <Rodal visible={visible} animation='slideRight' onClose={hide}>
                            <div className={`flex justify-between h-[60px]`}>
                                <h6 className='text-[18px] font-semibold'>All Comments</h6>
                                <div className='dropdowns w-[130px] cursor-pointer pr-[40px]'>
                                    <div className='flex items-center gap-[5px]' onClick={sortBy}>
                                        <Image src={'/categories/sort-by.svg'} height={20} width={30} alt="sortBy" className='' />
                                        <p className={`dropdowns transition-all delay-500`} >Sort by</p>
                                    </div>

                                    <div className={`dropdown-menu`} id='dropdown'>
                                        {sortby && sortby.map((res, index) => {
                                            return (
                                                <p key={index} onClick={() => setValues(res)} className={`dropdown-item p-[5px_10px] w-full ${res.name == sortbyVal ? 'activeSort' : ''}`}>{res.name}</p>
                                            )
                                        })}
                                        {/* <p className={`dropdown-item p-[5px_10px] w-full`}>Oldest</p> */}
                                    </div>
                                </div>
                            </div>
                            <div className='flex justify-between gap-[10px]'>
                                <input id='addCmt' type='text' onClick={checkValid} placeholder='Add a comment...' className='border-none border_bottom w-full text-[14px]' />
                                <Image src={'/categories/send-arrow.svg'} className='cursor-pointer' onClick={() => sendMsg('addCmt')} height={20} width={20} alt='send' />
                            </div>
                            {(comments && comments.length != 0) ?
                                <div className='commentPopup '>
                                    {comments.map((res, index) => {
                                        return (
                                            <Comments load={loadMore} key={index} isLast={index == comments.length - 1} data={res} />
                                        )
                                    })}
                                </div>
                                : <div className='mt-[15px] h-[70vh] overflow-auto'>
                                    {[0, 1, 2, 3, 4, 5].map((res, index) => {
                                        return (
                                            <Skeleton key={index} />
                                        )
                                    })}
                                </div>
                            }
                        </Rodal>
                            : null
            }
        </>
    )
}


const Skeleton = () => {
    return (
        <div className="skeleton-blog mb-[15px] flex gap-[15px]">
            <div className='rounded-full h-[42px] bg-[#E5E4E2] w-[42px]'>
            </div>
            <div className='flex flex-col gap-2 w-[90%]'>
                <p className='flex items-center gap-[10px]'><span className='h-[15px] bg-[#E5E4E2] rounded-[5px] w-[120px]'></span>  <span className='h-[15px] bg-[#E5E4E2] rounded-[5px] w-[60px]'></span></p>
                <p className='h-[15px] bg-[#E5E4E2] rounded-[5px] w-full'></p>
                <p className='h-[15px] bg-[#E5E4E2] rounded-[5px] w-full'></p>
                <div className='flex justify-between'>
                    <p className='flex gap-[10px]'><span className='h-[15px] bg-[#E5E4E2] rounded-[5px] w-[40px]'></span><span className='h-[15px] bg-[#E5E4E2] rounded-[5px] w-[40px]'></span><span className='h-[15px] bg-[#E5E4E2] rounded-[5px] w-[40px]'></span><span className='h-[15px] bg-[#E5E4E2] rounded-[5px] w-[40px]'></span></p>
                    <p className='h-[15px] bg-[#E5E4E2] rounded-[5px] w-[40px]'></p>
                </div>
            </div>
        </div>
    )
}