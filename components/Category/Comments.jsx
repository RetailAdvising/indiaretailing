import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { like,dislike,getList } from '@/libs/api';
import Modal from '../common/Modal';
import AlertUi from '../common/AlertUi';

export default function Comments({ data, isLast, load, cmt , store_comments, comments}) {
    const [input, setInput] = useState({ index: -1, show: false })
    const [comment, setComment] = useState()
    const [reportComment, setReporComment] = useState()
    const [selecedComment, setSelecedComment] = useState()
    const [isSuccessPopup,setIsSuccessPopup] =  useState(false)
    const [alertMessage,setAlertMessage] =  useState("")

    function showInputs(index) {
        setInput({ index: index, show: true });
    }
    
    const cardref = useRef(null)
    useEffect(() => {
        setComment(data)
        if (!cardref?.current) return;
        const observer = new IntersectionObserver(([entry]) => {
            if (isLast && entry.isIntersecting) {
                load()
                observer.unobserve(entry.target);
            }
        });

        observer.observe(cardref.current);
    }, [isLast,reportComment])

    const likeCmt = async (comm) => {
        let param = {
            name: comm.name,
            like: comm.is_liked == 1 ?  'No' :'Yes'
        }
        const resp = await like(param);
        if(resp.status == 'Success') {
            setComment(resp.message);
            if(comments){
                let index = comments.comments.findIndex(res=>{return res.name == resp.message.name})
                if(index >= 0){
                    comments['comments'][index] = resp.message
                    store_comments(comments);
                }
            }
        }
        // setComment({...comm,likes:(comm.is_liked && comm.is_liked == 1) ? comm.likes - 1:comm.likes + 1
        //     ,is_liked:(comm.is_liked && comm.is_liked == 1) ? 0 : 1})  ;
        //     if(comm.is_disliked ==1 && comm.is_liked == 0) dislikeCmt(comm);
    }
    const dislikeCmt = async (comm) => {
        console.log(comment);
        let param = {
            name: comm.name,
            dislike: comm.is_disliked == 1 ?  'No' :'Yes'
        }
        const resp = await dislike(param);
        if(resp.status == 'success'){
            setComment(resp.message);
            console.log(comments)
            if(comments.comments){
                let index = comments.comments.findIndex(res=>{return res.name == resp.message.name})
                if(index >= 0){
                    comments['comments'][index] = resp.message
                    store_comments(comments);
                }
            }
          

        }
        // setComment({...comm,dislikes:(comm.is_disliked && comm.is_disliked == 1) ? comm.dislikes - 1:comm.dislikes + 1,
        //     is_disliked:(comm.is_disliked && comm.is_disliked == 1) ? 0 : 1});
        //     console.log(comment);
    }
    const closeModal = () => {
        setIsSuccessPopup(false)
    }
    const report = async (cur_command) => {
        let param = {
            doctype:"Report Type",
            fields:["name","title"]
        }
         let resp = await getList(param)
         if(resp.message) setReporComment(resp.message)
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
    console.log(resp_message);
    setVisible(false)
    if (resp_message && resp_message.message){
        setAlertMessage(resp_message)
        setIsSuccessPopup(true)
    }
  }
  function hide() {
    setVisible(false)
    if (localStorage['roles']) {
      const data = JSON.parse(localStorage['roles']);

      if (data && data.length != 0) {
        data.map(res => {
          if (res.role == 'Member') {
            setValidator(true);
          }
        })
      }
    }
  }
    return (
        <>
                            
        {comment && 
                    <div ref={cardref} className={`transition-all ease-in delay-500 duration-500 last:border-0 ${cmt ? 'p-[10px]' : ''}  ${!isLast ? 'border_bottom' : ''}`}>
                    <div className={`flex gap-3 p10`}>
                        <div>
                            <Image className='rounded-full object-contain' src={'/profit.svg'} height={48} width={48} alt={comment.name} />
                        </div>
                        <div className='max-w-full w-full comment'>
                            {/* | <span>{comment.duration}</span> */}
                            <p className='flex gap-3 '><h6 className='font14_bold'>{comment.comment_by}</h6> </p>
                            <div className='py-2 sub_title' dangerouslySetInnerHTML={{ __html: comment.content }} />
                            <div className='flex justify-between items-center py-[5px]'>
                                <div className='flex gap-3'>
                                    <p className='flex gap-2 items-center sub_title'><span>{comment.likes}</span><Image className='h-[20px] w-[20px]  cursor-pointer' onClick={() => likeCmt(comment)} src={((comment.is_liked && comment.is_liked == 1) || (comment.likes && comment.likes == 1)) ? '/like-active.svg' : '/like.svg'} height={20} width={20} alt={""} /></p>
                                    <p className='flex gap-2 items-center sub_title'><span>{comment.dislikes}</span><Image className='h-[20px] w-[20px]  cursor-pointer' onClick={() => dislikeCmt(comment)} src={((comment.is_disliked && comment.is_disliked == 1) || (comment.dislikes && comment.dislikes == 1)) ? '/dislike-active.svg' : '/dislike.svg'} height={20} width={20} alt={""} /></p>
                                    {/* <p className='sub_title'>Share</p>
                                            <p className='sub_title' onClick={() => showInputs(index)}>Reply</p> */}
                                </div>
                                   { localStorage.apikey && <div>
                                       <Image src={'/flag.svg'} height={16} width={16} alt={"image"} className='cursor-pointer' onClick={()=>report(comment)}/>
                                   </div>}
                              </div>
                                  {reportComment && <Modal modal={modal} show={show} visible={visible} hide={(resp_message)=>hideReport(resp_message)} data={reportComment} cur={selecedComment.name}/>}
                                 { isSuccessPopup &&  <AlertUi alertMsg={alertMessage && alertMessage} isOpen={isSuccessPopup} closeModal={closeModal} button_2={"ok"}/>  }                         
                            {/* {(input.index == index && input.show) &&
                                        <div>
                                            <input type='text' />
                                        </div>
                            } */}
                        </div>
                    </div>
                </div>
        }


        </>
    )
}
