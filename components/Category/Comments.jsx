import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { like, dislike, getList, addComment } from '@/libs/api';
import Modal from '../common/Modal';
import AlertUi from '../common/AlertUi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ModPopup from './ModPopup'
import CommentModal from './CommentModal'
export default function Comments({ data, isLast, load, comments, route, updatedCmt, cur, isModal, hide, noScroll }) {
    const [input, setInput] = useState({ index: -1, show: false })
    const [comment, setComment] = useState()
    const [reportComment, setReporComment] = useState()
    const [selecedComment, setSelecedComment] = useState()
    const [isSuccessPopup, setIsSuccessPopup] = useState(false)
    const [alertMessage, setAlertMessage] = useState("")
    function showInputs(index) {
        setInput({ index: index, show: true });
    }

    const cardref = useRef(null)
    useEffect(() => {
        // setComment(data)
        if (!cardref?.current) return;
        const observer = new IntersectionObserver(([entry]) => {
            if (isLast && entry.isIntersecting) {
                load()
                observer.unobserve(entry.target);
            }
        });

        observer.observe(cardref.current);
    }, [isLast, reportComment])

    const likeCmt = async (comm, index) => {
        // console.log(route)
        if((localStorage || !localStorage) && !localStorage['apikey'] && !localStorage['secret']){
            setAlertMessage({message: 'Do you want to like this comment ? you need to login.'})
            setIsSuccessPopup(true)
            return
        }
        let param = {
            name: comm.name,
            like: comm.is_liked == 1 ? 'No' : 'Yes'
        }
        comm['is_liked'] == 1 ? 0 : 1
        const resp = await like(param);
        if (resp.status == 'Success') {
            // console.log(comm)
            updatedCmt(comm, route, index)
            // setComment(resp.message);
            // if (comments) {
            //     let index = comments.comments.findIndex(res => { return res.name == resp.message.name })
            //     if (index >= 0) {
            //         comments['comments'][index] = resp.message
            //         // store_comments(comments); john
            //     }
            // }
        }
        // setComment({...comm,likes:(comm.is_liked && comm.is_liked == 1) ? comm.likes - 1:comm.likes + 1
        //     ,is_liked:(comm.is_liked && comm.is_liked == 1) ? 0 : 1})  ;
        //     if(comm.is_disliked ==1 && comm.is_liked == 0) dislikeCmt(comm);
    }
    const dislikeCmt = async (comm, index) => {
        // console.log(comment);
        // console.log(route)
        if((localStorage || !localStorage) && !localStorage['apikey'] && !localStorage['secret']){
            setAlertMessage({message: 'Do you want to dislike this comment ? you need to login.'})
            setIsSuccessPopup(true)
            return
        }
        let param = {
            name: comm.name,
            dislike: comm.is_disliked == 1 ? 'No' : 'Yes'
        }
        comm['is_disliked'] == 1 ? 0 : 1
        const resp = await dislike(param);
        if (resp.status == 'success') {
            // setComment(resp.message);
            // console.log(comm)
            updatedCmt(comm, route, index)
            // if (comments.comments) {
            //     let index = comments.comments.findIndex(res => { return res.name == resp.message.name })
            //     if (index >= 0) {
            //         comments['comments'][index] = resp.message
            //         store_comments(comments);
            //     }
            // }


        }
        // setComment({...comm,dislikes:(comm.is_disliked && comm.is_disliked == 1) ? comm.dislikes - 1:comm.dislikes + 1,
        //     is_disliked:(comm.is_disliked && comm.is_disliked == 1) ? 0 : 1});
        //     console.log(comment);
    }
    const closeModal = () => {
        setIsSuccessPopup(false)
    }
    const report = async (cur_command) => {
        // noScroll(false);
        if((localStorage || !localStorage) && !localStorage['apikey'] && !localStorage['secret']){
            setAlertMessage({message: 'Do you want to report this comment ? you need to login.'})
            setIsSuccessPopup(true)
            return
        }
        let param = {
            doctype: "Report Type",
            fields: ["name", "title"]
        }
        let resp = await getList(param)
        if (resp.message) setReporComment(resp.message)
        //  console.log(reportComment);

        setSelecedComment(cur_command)
        show()
    }

    // Modal Popup
    const [modal, setModal] = useState('')
    const [visible, setVisible] = useState(false)

    function show() {
        setVisible(true);
        setModal('report')
    }

    const hideReport = (resp_message) => {
        // console.log(resp_message);
        setVisible(false)

        if (resp_message && resp_message.message) {
            toast.success(resp_message.message);
            // setAlertMessage(resp_message)
            // setIsSuccessPopup(true)
        }
    }

    let [mod, setMod] = useState(false)
    function hides() {
        mod = true
        setMod(mod)
        // setVisible(false)
        // if (localStorage['roles']) {
        //     const data = JSON.parse(localStorage['roles']);

        //     if (data && data.length != 0) {
        //         data.map(res => {
        //             if (res.role == 'Member') {
        //                 setValidator(true);
        //             }
        //         })
        //     }
        // }
    }

    let [showPopup, setShowPopup] = useState(false)
    let [cmtVal, setCmtVal] = useState('')
    async function sendMsg(id) {
        if((localStorage || !localStorage) && !localStorage['apikey'] && !localStorage['secret']){
            setAlertMessage({message: 'Do you want to comment this article ? you need to login.'})
            setIsSuccessPopup(true)
            return
        }
        let element = document.getElementById(id + cur.name);
        // console.log(element, 'element')
        if (element.value && element.value != '') {
            cmtVal = element.value;
            setCmtVal(cmtVal)
            showPopup = true
            setShowPopup(showPopup)

        }else{
            cmtVal = element.value;
            setCmtVal(cmtVal)
        }
    }

    const hides1 = (type, data) => {
        showPopup = false;
        setShowPopup(showPopup)
        if (type == 'save') {
            submitMsg(data)
        }
    }

    const msgChange = (val) => {
        let element = document.getElementById('cmt' + cur.name).value = val;
    }

    const submitMsg = async (data) => {
        // let param = { article: cur.name, comment: element.value };
        let element = document.getElementById('cmt' + cur.name);
        element.value = data
        let param = { article: cur.name, comment: data };
        let resp = await addComment(param);
        if (resp.message) {

            toast.success("The comment will appear once it's been approved by IndiaRetailing");

            setTimeout(() => {
                element.value = '';
            }, 200);
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

    // console.log(comment)
    return (
        <>
            <ToastContainer position={'bottom-right'} autoClose={2000} />
            {data && false &&
                data.map((comment, index) => {
                    return (
                        // < div ref={cardref} className={`transition-all ease-in delay-500 duration-500 last:border-0 ${cmt ? 'p-[10px]' : ''}  ${!isLast ? 'border_bottom' : ''}`}>
                        <div key={index} className={`flex gap-3 p10`}>
                            <div>
                                <Image className='rounded-full object-contain' src={'/profit.svg'} height={48} width={48} alt={comment.name} />
                            </div>
                            <div className='max-w-full w-full comment'>
                                {/* | <span>{comment.duration}</span> */}
                                <p className='flex gap-3 '><h6 className='font14_bold'>{comment.comment_by}</h6> </p>
                                <div className='py-2 sub_title' dangerouslySetInnerHTML={{ __html: comment.content }} />
                                <div className='flex justify-between items-center py-[5px]'>
                                    <div className='flex gap-3'>
                                        {/* || (comment.likes && comment.likes == 1) */}
                                        <p className='flex gap-2 items-center sub_title'><span>{comment.likes}</span><Image className='h-[20px] w-[20px]  cursor-pointer' onClick={() => likeCmt(comment, index)} src={(comment.is_liked && comment.is_liked == 1) ? '/like-active.svg' : '/like.svg'} height={20} width={20} alt={""} /></p>
                                        {/* || (comment.dislikes && comment.dislikes == 1) */}
                                        <p className='flex gap-2 items-center sub_title'><span>{comment.dislikes}</span><Image className='h-[20px] w-[20px]  cursor-pointer' onClick={() => dislikeCmt(comment, index)} src={(comment.is_disliked && comment.is_disliked == 1) ? '/dislike-active.svg' : '/dislike.svg'} height={20} width={20} alt={""} /></p>
                                        {/* <p className='sub_title'>Share</p>
                                                <p className='sub_title' onClick={() => showInputs(index)}>Reply</p> */}
                                    </div>
                                    {localStorage.apikey && <div>
                                        <Image src={'/flag.svg'} height={16} width={16} alt={"image"} className='cursor-pointer' onClick={() => report(comment)} />
                                    </div>}
                                </div>
                                {reportComment && <Modal modal={modal} show={show} visible={visible} hide={(resp_message) => hideReport(resp_message)} data={reportComment} cur={selecedComment.name} />}
                                {isSuccessPopup && <AlertUi alertMsg={alertMessage && alertMessage} isOpen={isSuccessPopup} closeModal={closeModal} button_2={"ok"} />}
                                {/* {(input.index == index && input.show) &&
                                            <div>
                                                <input type='text' />
                                            </div>
                                  } */}
                            </div>
                        </div>
                        // </div >
                    )
                })
            }

            {/* {mod && <ModPopup />} */}

            {isModal && <div className={`flex justify-between p-[20px_15px] `}>
                <h6 className='text-[18px] font-semibold '>All Comments</h6>
                <div>
                    <Image src={'/categories/close.svg'} onClick={hide} className='cursor-pointer ' height={22} width={22} alt='close' />
                </div>
            </div>}
            <div className={`relative ${isModal ? 'mx-[10px]' : ''}`}>
                <input onClick={hides} type='text' autoComplete='off' placeholder='Add a Comment' className={`w-full h-[45px] rounded-[5px] p-[0_10px]`} id={`cmt` + cur.name} />
                <Image src={'/categories/send-01.svg'} onClick={() => sendMsg('cmt')} className='cursor-pointer absolute top-0 m-auto bottom-0 right-[10px]' height={22} width={22} alt='send' />
            </div>
            {showPopup && <CommentModal type={''} hides1={(type, data) => hides1(type, data)} element={cmtVal} msgChange={(val) => msgChange(val)} />}
            {data && data.length != 0 && <div className={`${isModal ? '' : 'border rounded-[5px]'} p-[10px]  my-[10px]`}>
                {data.map((res, i) => {
                    return (
                        <div key={res.comment_by + i} className={`flex gap-[10px]  mb-[10px] ${i != data.length - 1 ? 'border_bottom pb-[10px]' : ''}`}>
                            <div className={` ${isModal ? 'flex-[0_0_calc(12%_-_10px)]' : 'flex-[0_0_calc(6%_-_10px)] md:flex-[0_0_calc(13%_-_10px)]'}`}>
                                <Image height={45} width={45} className='rounded-full object-contain' alt={res.name} src={'/profit.svg'} />
                            </div>
                            <div className={`${isModal ? 'flex-[0_0_calc(88%_-_10px)]' : 'flex-[0_0_calc(94%_-_10px)] md:flex-[0_0_calc(87%_-_10px)]'}`}>
                                <h6 className='text-[17px] font-semibold'>{res.comment_by}</h6>
                                <div className='pb-[5px] sub_title !text-[14px]' dangerouslySetInnerHTML={{ __html: res.content }} />
                                <div className='flex justify-between items-center py-[5px]'>
                                    <div className='flex gap-3'>
                                        <p className='flex gap-[5px] items-center sub_title'><span className='text-[13px]'>{res.likes}</span><Image className='h-[16px] w-[16px]  cursor-pointer' onClick={() => likeCmt(res, i)} src={(res.is_liked && res.is_liked == 1) ? '/like-active.svg' : '/like.svg'} height={20} width={20} alt={""} /></p>
                                        <p className='flex gap-[5px] items-center sub_title'><span className='text-[13px]'>{res.dislikes}</span><Image className='h-[16px] w-[16px]  cursor-pointer' onClick={() => dislikeCmt(res, i)} src={(res.is_disliked && res.is_disliked == 1) ? '/dislike-active.svg' : '/dislike.svg'} height={20} width={20} alt={""} /></p>
                                    </div>
                                    <div>
                                        <Image src={'/flag.svg'} height={16} width={16} alt={"image"} className='cursor-pointer' onClick={() => report(res)} />
                                    </div>
                                </div>
                                {reportComment && <Modal modal={modal} show={show} visible={visible} hide={(resp_message) => hideReport(resp_message)} data={reportComment} cur={selecedComment.name} />}
                                {isSuccessPopup && <AlertUi alertMsg={alertMessage && alertMessage} isOpen={isSuccessPopup} closeModal={closeModal} button_2={"ok"} />}
                            </div>
                        </div>
                    )
                })}
            </div>}
        </>
    )
}


// const Alert = () => {
//     const { isOpen, onOpen, onClose } = useDisclosure()
//     const finalRef = useRef(null)

//     return (
//         <>
//             <Box ref={finalRef} tabIndex={-1} aria-label='Focus moved to this box'>
//                 Some other content that'll receive focus on close.
//             </Box>

//             <Button mt={4} onClick={onOpen}>
//                 Open Modal
//             </Button>
//             <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
//                 <ModalOverlay />
//                 <ModalContent>
//                     <ModalHeader>Modal Title</ModalHeader>
//                     <ModalCloseButton />
//                     <ModalBody>
//                        <h6>sknskmslcm</h6>
//                     </ModalBody>

//                     <ModalFooter>
//                         <Button colorScheme='blue' mr={3} onClick={onClose}>
//                             Close
//                         </Button>
//                         <Button variant='ghost'>Secondary Action</Button>
//                     </ModalFooter>
//                 </ModalContent>
//             </Modal>
//         </>
//     )
// }