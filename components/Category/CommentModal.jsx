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
import { useEffect } from 'react'
export default function CommentModal({hides1 }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    useEffect(() => {
        onOpen()
    }, [])

    const closeModal = async (type) => {
        console.log(type)
        hides1(type,'')
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
                                    <input type='text' className='rounded-[5px] p-[5px] w-full h-[40px]' name='name' id='name' />
                                </div>
                                <div className='block'>
                                    <label htmlFor='email' className='pb-[5px]'>Email</label>
                                    <input type='text' className='rounded-[5px] p-[5px] w-full h-[40px]' name='email' id='email' />
                                </div>
                            </div>
                            <div className='grid py-[10px]'>
                                <label htmlFor='message' className='pb-[5px]'>Message</label>
                                <textarea type='text' className='rounded-[5px] border p-[5px] ' name='message' id='message' />
                            </div>
                        </div>
                    </ModalBody>

                    <ModalFooter>
                        <Button className='primary_button' mr={3} onClick={() => closeModal('save')}>
                            Submit
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}