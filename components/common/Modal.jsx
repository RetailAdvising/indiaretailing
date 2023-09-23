import React, { useEffect, useState } from 'react'
import Rodal from 'rodal';
import { useForm } from 'react-hook-form';
import styles from '@/styles/Components.module.scss'
// include styles
import 'rodal/lib/rodal.css';
import LogIn from '../Auth/LogIn';
import SignUp from '../Auth/SignUp';
import Comments from '../Category/Comments';
import Image from 'next/image';
import { addComment, commentList,report } from '@/libs/api'
import { useRouter } from 'next/router';
import AlertUi from './AlertUi';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Modal({ modal, hide, visible, data, cur, store_comments }) {
    const [sort, setSort] = useState(false);
    const [sortbyVal, setSortByVal] = useState('Newest');
    const [pageno, setPageno] = useState(1);
    const [comments, setComments] = useState([]);
    const [noData,setNoData] = useState(false)
    const [isSuccessPopup,setIsSuccessPopup] =  useState(false)
    const [alertMessage,setAlertMessage] =  useState("")

    const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm();

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
    function show_alert(message) {
        setAlertMessage({message:message})
        setIsSuccessPopup(true)
    }

    useEffect(() => {
        if (cur && pageno == 1) {
            commentslist();
        }
    }, [pageno])


    function checkValid() {
        if (!localStorage['apikey']) {
            router.push('/login')
        }
    }


    async function commentslist() {
        setNoData(!noData)
        let param = { ref: cur.name, page_no: pageno, page_size: 10 };
        let resp = await commentList(param);
        // console.log(resp)
        if (resp.message && resp.message.length != 0) {
            setComments(resp.message);
            setTimeout(() => {
                setNoData(false)
            }, 200);
        } else{
            setTimeout(() => {
                setNoData(false)
            }, 200);
        }
    }
    async function check(form_data) {
        console.log(localStorage.apikey)
        if(localStorage.apikey &&  localStorage.apikey!= 'undefined'){
            let params = {
                "comment_id": cur,
                "report_type":form_data.report,
                "report":form_data.report,
                "new":1,
                "update":1,
                // "report_id":"ss"
                }
            let resp = await report(params)
            if (resp){
                hide(resp);
            }
        }else{
            show_alert("Need To sign In To Report This Comment")
        }
    }
    const closeModal = () => {
        setIsSuccessPopup(false)
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
                element.value = '';
                toast.success("The comment will appear once it's been approved by IndiaRetailing");
                // console.log(resp.message);
                // resp.message["is_liked"] = 0
                // resp.message["likes"] = 0
                // resp.message["is_disliked"] = 0
                // resp.message["dislikes"] = 0
                // setComments(c => [...c, resp.message])
                
                // let array  = []
                // array.push(resp['message']);
                // cur.comments = [...comments, ...array];
                // store_comments(cur);
            }
        }
    }




    return (
        <div className={`${modal == 'report' ? 'report_cmt_popup' : ''}`}>
             {/* <div> */}
                <ToastContainer position={'bottom-right'} autoClose={2000}  />
            {/* </div> */}
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
                            <div className={`flex justify-between py-[20px] px-[15px]  bg-[#e21b22]`}>
                                <h6 className='text-[18px] font-semibold text-[#fff]'>All Comments</h6>
                                {/* <div className='dropdowns w-[130px] cursor-pointer pr-[40px]'>
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
                                    </div>
                                </div> */}
                            </div>
                            <div className='flex justify-between gap-[10px]'>
                             <div className='flex w-full mt-[10px] items-center'>
                                  <textarea id='addCmt' type='text' row={1} onClick={checkValid} placeholder='Add a comment...' className='comment_box flex-1 pt-[7px] border-none  w-full text-[14px] p-[5px]' />
                                <div className='flex-[0_0_30px] relative'>
                                  <Image src={'/categories/send-arrow.svg'} className='cursor-pointer absolute top-0 m-auto bottom-0' onClick={() => sendMsg('addCmt')} height={22} width={22} alt='send' />
                                </div>
                             </div>   
                            </div>
                            {(comments && comments.length != 0 && !noData) ?
                                <div className='commentPopup '>
                                    {comments.map((res, index) => {
                                        return (
                                            // isLast={index == comments.length - 1}
                                            <Comments load={loadMore} key={index} store_comments={(cur)=>store_comments(cur)} comments={cur} data={res} />
                                        )
                                    })}
                                </div>
                                : noData ? <div className='mt-[15px] h-[70vh] overflow-auto'>
                                    {[0, 1, 2, 3, 4, 5].map((res, index) => {
                                        return (
                                            <Skeleton key={index} />
                                        )
                                    })}
                                </div>
                                :<div className='grid place-content-center h-[50vh]'><h6 className='font-semibold text-[16px]'>No Comments</h6></div>
                            }
                        </Rodal>
                            : modal == 'report' ?
                            <Rodal visible={visible} animation='slideUp' onClose={hide} className='h-[70%]'>
                               <h3 className='text-[18px] font-bold'>Report Comment </h3>
                                {errors ?.report && <p className={`${styles.danger}`}>{errors.report.message}</p>}

                               <form onSubmit={handleSubmit((form_data) => check(form_data))} autoComplete='off'>
                                {
                                    data && data.map(rc=>{
                                        return( <div className='flex items-center gap-[10px] m-[20px]'>
                                                <input type="radio" className='cursor-pointer' id={ rc.name} name={modal} value={ rc.name} {...register('report', { required: { value: true, message: 'Must be Select One Report' }} )}/>
                                                <label for={rc.name} className='cursor-pointer text-[14px]'>{ rc.name}</label>
                                                </div>                                                
                                            )
                                       }
                                       )
                                  } 
                                  <div className='flex gap-[10px] justify-end text-[14px] absolute bottom-[20px] right-[20px]'>
                                    <button className='primary_outline px-[10px] py-[5px] color-red' style={{color:'#e21b22'}} onClick={hide}>Cancel</button>
                                    <input className='primary_button px-[10px] cursor-pointer' type="Submit" />
                                    </div>
                                </form>
                                { isSuccessPopup &&  <AlertUi alertMsg={alertMessage && alertMessage} isOpen={isSuccessPopup} closeModal={closeModal} button_2={"ok"}/>  }                         
                            </Rodal> : 
                            null
            }
        </div>
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