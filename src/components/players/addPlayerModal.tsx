import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton, Button, FormControl, FormLabel, Input,
} from '@chakra-ui/react'
import React from "react";

interface IProps{
    initialRef: any,
    finalRef:any,
    isOpen:any,
    onClose:any,
}

function AddPlayerModal(props:IProps) {
    const initialRef=props.initialRef;
    const finalRef=props.finalRef;
    const isOpen=props.isOpen;
    const onClose=props.onClose;

    return (
        <>
            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add new Player</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Player name</FormLabel>
                            <Input ref={initialRef} placeholder='Player name' />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Room Type</FormLabel>
                            <Input placeholder='Player type' />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3}>
                            Save
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default AddPlayerModal;
