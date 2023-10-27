import React,{useRef,useEffect} from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    useDisclosure,
    ModalFooter,
    ModalBody,
    Box,
    Button,
    ModalCloseButton,
} from '@chakra-ui/react'
export default function ModPopup() {
    const { isOpen, onOpen, onClose } = useDisclosure()

    useEffect(()=>{
        onOpen()
    },[])

    return (
        <>
            
            {/* <Button mt={4} onClick={onOpen}>
                Open Modal
            </Button> */}
            <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Modal Title</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <h6>sknskmslcm</h6>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button variant='ghost'>Secondary Action</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
