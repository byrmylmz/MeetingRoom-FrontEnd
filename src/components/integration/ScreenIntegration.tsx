import React, {useEffect, useState} from 'react';
import {Button, space, Text, useDisclosure} from "@chakra-ui/react";
import {CalendarIcon, ViewOffIcon} from '@chakra-ui/icons'
import socket from '../../SocketioService';
import {useUpdateToolbarMutation, useGetToolbarQuery} from "../../services/tBarApi";
// import EwsIntegrationModal from "./ewsIntegrationModal";
import {useParams} from "react-router-dom";
import {useGetScreensByIdQuery, useGetScreensByRoomIdQuery} from "../../services/screenApi";
import m365 from "../../assets/m365logo.png";
import screenTablet from "../../assets/screenTablet.png";
import mexchange from "../../assets/mexchange.png";


const ScreenIntegration = () => {
    /*
    * Created siraylan calisir
    *
    * */

    //Here for modal
    const {isOpen, onOpen, onClose} = useDisclosure()
    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)
    const obj = {initialRef: initialRef, finalRef: finalRef, isOpen: isOpen, onOpen: onOpen, onClose: onClose};

    //Here rtk query
    const [state, setState] = useState()
    const [code, setCode] = useState()
    const [sData, setSdata] = useState()

    //steate
    const [toolbarStatus, setToolbarStatus] = useState<boolean>()

    //parameter
    const {screenId, roomId} = useParams<{ screenId: string, roomId: string }>()

    console.log(roomId)
    //queries
    // const {data: IToolbar, isSuccess: toolbarSuccess} = useGetToolbarQuery(1)
    const [updateToolbar] = useUpdateToolbarMutation();
    console.log("screendata baslangic")
    const {data: screenData, isSuccess: isScreenSuccess, isLoading} = useGetScreensByIdQuery(screenId!);
    console.log("screendata bitis")


    isLoading && console.log("screendata:", screenData)

    const toolbar = (id: number, status: boolean) => {
        const data = {id: id, status: status, screenId: screenId}
        updateToolbar(data)
        setToolbarStatus(data.status);
    };

    //
    // useEffect(() => {
    //     IToolbar && setToolbarStatus(IToolbar.status)
    // }, [IToolbar]);
    //


    useEffect(() => {


        socket.on("connect", () => {
            console.log("socket connection integration", socket.connected);
        });

        socket.on('exchange', (data) => {
            console.log('Received message from server:', data);
        });

    }, []);

    useEffect(() => {
        if (window.location.search) {
            let params: any = window.location.search.substring(1).split('&').reduce(function (result: any, item) {
                let parts = item.split('=');
                result[parts[0]] = parts[1];
                return result;
            }, {});
            setCode(params['code']);
            setState(params['state']);
        }
    }, [])


    return (
        <div className="space-x-1 py-5">
            <div className="flex flex-wrap px-6  align-middle">
                <img src={screenTablet} className="flex w-20 "/>

                    <h1 className="mb-4 px-6 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">{isScreenSuccess && screenData.screenName}</h1>

            </div>
            <hr
                className="my-6 h-0.5 border-t-0 bg-neutral-100 opacity-100 dark:opacity-50"/>


        </div>
    );
};

export default ScreenIntegration;
