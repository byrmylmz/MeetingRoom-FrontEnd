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
import {Iews} from "../../models/ews.model";
import {useGetEwsIntegrationQuery, useUpdateEwsIntegrationMutation} from "../../services/roomApi";
import {useParams} from "react-router-dom";

interface IProps {
    isOpen: boolean;
    onClose: () => void;
    refetch:any;
}



function EwsDialogCreate(props: IProps) {

    const isOpen = props.isOpen;
    const onClose = props.onClose;

    const {screenId,roomId} = useParams<{screenId:string,roomId:string | undefined}>();

    const {data:ewsData, isSuccess,refetch:ewsRefetch,} = useGetEwsIntegrationQuery(roomId!);
    const [updateEwsIntegration]=useUpdateEwsIntegrationMutation();
    const {
        register,
        handleSubmit,
        watch,
        formState: {isSubmitting},
    } = useForm<Iews>()

    const onSubmit: SubmitHandler<Iews> = async (data) => {
        const dataWithId={...data,roomId:roomId};
        try {
            await updateEwsIntegration(dataWithId);
            await props.refetch();
            onClose();
        } catch (error) {
            console.error('Error in form submission.', error);
        }
    };

    return (
        <>
            <Modal

                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay/>
                <ModalContent>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <ModalHeader>Ews Integration Information</ModalHeader>
                        <ModalCloseButton/>
                        <ModalBody pb={6}>

                            <FormControl>
                                <FormLabel>User Name</FormLabel>
                                <Input {...register("userName")} defaultValue={ewsData == null ? '' :ewsData.userName}/>
                            </FormControl>

                            <FormControl mt={4}>
                                <FormLabel>Password</FormLabel>
                                <Input {...register("password")} defaultValue={ewsData == null ? '' :ewsData.password}/>
                            </FormControl>

                            <FormControl mt={4}>
                                <FormLabel>Domain</FormLabel>
                                <Input {...register("domain")} defaultValue={ewsData == null ? '' :ewsData.domain}/>
                            </FormControl>

                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme='blue' mr={3} isLoading={isSubmitting} type='submit'>
                                Update
                            </Button>
                            <Button onClick={onClose}>Cancel</Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
        </>
    )
}

export default EwsDialogCreate;
