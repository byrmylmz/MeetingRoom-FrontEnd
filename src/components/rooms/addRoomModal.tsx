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
import {useForm, SubmitHandler} from "react-hook-form";
import {IRoom} from "../../models/room.model";
import {useAddRoomMutation, useGetAllRoomQuery} from "../../services/roomApi";

interface IProps {
    initialRef: any,
    finalRef: any,
    isOpen: any,
    onClose: any,
}


function AddRoomModal(props: IProps) {
    const initialRef = props.initialRef;
    const finalRef = props.finalRef;
    const isOpen = props.isOpen;
    const onClose = props.onClose;

    const [addRoom] = useAddRoomMutation();
    const { refetch } = useGetAllRoomQuery();


    const {
        register,
        handleSubmit,
        watch,
        formState: {errors, isSubmitting},
    } = useForm<IRoom>()

    const onSubmit: SubmitHandler<IRoom> = async (data) => {
        try {
            await addRoom(data);
            await refetch();
            onClose();
        } catch (error) {
            console.error('Error in form submission.', error);
        }
    };

    return (
        <>
            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay/>
                <ModalContent>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <ModalHeader>Add new Room</ModalHeader>
                        <ModalCloseButton/>
                        <ModalBody pb={6}>

                            <FormControl>
                                <FormLabel>Room name</FormLabel>
                                <Input {...register("roomName")} placeholder='Room name'/>
                            </FormControl>

                            <FormControl mt={4}>
                                <FormLabel>Room Status</FormLabel>
                                <Input {...register("roomStatus")} placeholder='Room status'/>
                            </FormControl>

                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme='blue' mr={3} isLoading={isSubmitting} type='submit'>
                                Save
                            </Button>
                            <Button onClick={onClose}>Cancel</Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
        </>
    )
}

export default AddRoomModal;
