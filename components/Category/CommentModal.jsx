import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    Button,
    ModalFooter,
    ModalBody,
    useDisclosure,
    ModalCloseButton,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
export default function CommentModal({ hides1, element, msgChange }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    useEffect(() => {

        
        // if (document.readyState === 'complete') {
        onPageLoad();
        onOpen()
        // } else {
        //     window.addEventListener('load', onPageLoad);
        //     // Remove the event listener when component unmounts
        //     return () => window.removeEventListener('load', onPageLoad);
        // }
    }, [])

    let [msgs, setMsgs] = useState('');
    let [email, setEmail] = useState('')
    let [name, setName] = useState('')
    const onPageLoad = () => {
        console.log('onPageLoad')
        if (element && localStorage && localStorage['full_name']) {
            msgs = element
            setMsgs(msgs)
            email = localStorage['userid']
            setEmail(email)
            name = localStorage['full_name']
            setName(name)
            // console.log(el.value)

        }

        if( localStorage && localStorage['full_name']){
            email = localStorage['userid']
            setEmail(email)
            name = localStorage['full_name']
            setName(name) 
        }
    }

    const closeModal = async (type) => {
        hides1(type, msgs)
    }

    const changingMessage = (e) => {
        if (e.target.value && e.target.value != '') {
            msgs = e.target.value
            setMsgs(msgs)
            // msgChange(e.target.value)
        }

    }

    return (
        <>
            {/* <Button onClick={onOpen}>Open Modal</Button> */}

            <Modal isOpen={isOpen} onClose={() => closeModal('close')}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Comment</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <div>
                            <div className={`flex gap-5`}>
                                <div className='block'>
                                    <label htmlFor='name' className='pb-[5px]'>Name</label>
                                    <input type='text' value={name} readOnly className='rounded-[5px] p-[5px] w-full h-[40px]' name='name' id='name' />
                                </div>
                                <div className='block'>
                                    <label htmlFor='email' className='pb-[5px]'>Email</label>
                                    <input type='text' value={email} readOnly className='rounded-[5px] p-[5px] w-full h-[40px]' name='email' id='email' />
                                </div>
                            </div>
                            <div className='grid py-[10px]'>
                                <label htmlFor='message1' className='pb-[5px]'>Message</label>
                                <textarea type='text' value={msgs} onChange={(e) => changingMessage(e)} className='rounded-[5px] border p-[5px] ' name='message1' id='message1' />
                            </div>
                        </div>
                    </ModalBody>

                    <ModalFooter>
                        <button className='primary_button h-[35px] w-[85px]' onClick={() => closeModal('save')}>
                            Submit
                        </button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}