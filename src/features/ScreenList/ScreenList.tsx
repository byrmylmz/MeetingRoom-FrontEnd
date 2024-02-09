import {Link, useNavigate, useParams} from "react-router-dom";
import m365 from '../../assets/m365logo.png';
import mexchange from '../../assets/mexchange.png';

import {
    useDeleteScreenMutation,
    useGetScreensByRoomIdQuery,
} from "../../services/screenApi";
import {useDisclosure} from "@chakra-ui/react";
import React, {useState} from "react";
import AddScreenModal from "./ScreenDialogCreate";
import {ListIcon} from "../../assets/icons/list";
import {GridIcon} from "../../assets/icons/grid";
import {MeetIcon} from "../../assets/icons/meet";
import {useDisconnectEwsMutation, useDisconnectM365Mutation, useGetRoomByIdQuery} from "../../services/roomApi";
import EwsDialogCreate from "./EwsDialogCreate";

interface Tab {
    id: string;
    title: string;
    type: string;
    icon: JSX.Element;
}

const tabsData: Tab[] = [
    {
        id: "1",
        title: "Tab 1",
        type: "list",
        icon: <ListIcon/>,
    },
    {
        id: "2",
        title: "Tab 2",
        type: "grid",
        icon: <GridIcon/>,
    },
];

const ScreenList: React.FC = () => {
    const [activeTab, setActiveTab] = useState(tabsData[0]);
    const {isOpen: isOpenEws, onOpen: onOpenEws, onClose: onCloseEws} = useDisclosure();
    const {isOpen: isOpenScreen, onOpen: onOpenScreen, onClose: onCloseScreen} = useDisclosure();

    const changeTab = (tab: any) => {
        setActiveTab(tab);
    };

    const navigate = useNavigate();

    const {roomId} = useParams<{ roomId: string | undefined  }>();
    const {data, isSuccess, refetch} = useGetScreensByRoomIdQuery(roomId!);
    const {data: roomData, isSuccess: roomDataSuccess, refetch: roomDataRefetch} = useGetRoomByIdQuery(roomId!);

    const [deleteScreen] = useDeleteScreenMutation();
    const [disconnectM365] = useDisconnectM365Mutation();
    const [disconnectEws] = useDisconnectEwsMutation();

    const deleteHandler = async (screenId: number, e: React.MouseEvent) => {
        e.stopPropagation();
        try {
            await deleteScreen(screenId);
            await refetch();
        } catch (error) {
            console.log(error);
        }
    };

    const deleteM365 = async (roomId: string | undefined ) => {

        try {
            roomId && await disconnectM365(roomId);
            await roomDataRefetch();
        } catch (error) {
            console.log(error);
        }
    };

    const deleteEws = async (roomId: string | undefined) => {

        try {
            roomId && await disconnectEws(roomId);
            await roomDataRefetch();
        } catch (error) {
            console.log(error);
        }
    };


    // @ts-ignore
    return (
        <div className="flex flex-col py-5 overflow-hidden">
            <AddScreenModal isOpen={isOpenScreen} onClose={onCloseScreen}/>
            <EwsDialogCreate isOpen={isOpenEws} onClose={onCloseEws} refetch={roomDataRefetch}/>
            <div className="flex items-center px-6 justify-between w-full">

                {/*<a href="#" className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add friend</a>*/}

                <button
                    onClick={onOpenScreen}
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Add New Screen
                </button>


            </div>
            <hr
                className="my-6 h-0.5 border-t-0 bg-neutral-100 opacity-100 dark:opacity-50"/>
            <div className="w-full h-full flex flex-wrap items-center mt-4 overflow-y-auto px-4">
                {isSuccess && data.map((screen, screenIndex) => (
                    <div
                        key={screenIndex}
                        className="flex items-center rounded w-1/3 p-2"
                        style={{
                            width: "33.3333%"
                        }}
                    >
                        <div
                            className="shadow-sm duration-300 hover:shadow-md border border-gray-200  rounded-lg w-full flex items-center px-4 py-2 space-x-2 ">
                            <div className="text-3xl">
                                <MeetIcon/>
                            </div>

                            <div className="flex items-center p-2 w-full">
                                <div className="w-full space-y-2">
                                    <div className="flex items-center justify-between w-full">
                                        <h1 className="whitespace-nowrap text-xs font-medium text-gray-500">
                                            Screen Name:
                                        </h1>
                                        <h1 className="text-sm font-semibold">{screen.screenName}</h1>
                                    </div>
                                    <div className="flex items-center justify-between w-full">
                                        <h1 className="whitespace-nowrap text-xs font-medium text-gray-500">
                                            Mqtt Toolbar:
                                        </h1>
                                        <div className="flex items-center">
                                            <div className="w-2 h-2 rounded-full bg-green-500 mr-1.5"></div>
                                            <h1 className="text-sm font-bold uppercase text-green-500">
                                                {screen.toolbar_status ? "On" : "Off"}
                                            </h1>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between w-full">
                                        <h1 className="whitespace-nowrap text-xs font-medium text-gray-500">
                                            Screen Type:
                                        </h1>
                                        <h1 className="text-sm font-semibold">{screen.screenType}</h1>
                                    </div>
                                    <div className="flex items-center justify-between w-full">
                                        <h1 className="whitespace-nowrap text-xs font-medium text-gray-500">
                                            Screen Pin Code:
                                        </h1>
                                        <h1 className="text-sm font-semibold">{roomData && roomData.pinCode}</h1>
                                    </div>
                                </div>
                            </div>
                            {/*  */}
                            <div className="flex flex-col space-y-2 item-center justify-center">

                                <div onClick={(e) => {
                                    deleteHandler(screen.id, e)
                                }}
                                     className="w-5 mr-2 transform hover:text-purple-500 hover:scale-125 hover:cursor-pointer">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                                    </svg>
                                </div>
                            </div>
                            {/*    */}
                        </div>
                    </div>
                ))}
            </div>

            <hr
                className="my-12 h-0.5 border-t-0 bg-neutral-100 opacity-100 dark:opacity-50"/>

            <div className="flex flex-wrap px-6 space-x-6 ">

                <div
                    className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 hover:shadow-md">
                    <div className="flex justify-end px-4 pt-4">

                        <div id="dropdown"
                             className="z-10 hidden text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                            <ul className="py-2" aria-labelledby="dropdownButton">
                                <li>
                                    <a href="#"
                                       className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Edit</a>
                                </li>
                                <li>
                                    <a href="#"
                                       className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Export
                                        Data</a>
                                </li>
                                <li>
                                    <a href="#"
                                       className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Delete</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="flex flex-col items-center pb-10">
                        <img className="p-5  " src={m365} alt="m365"/>
                        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">Office 365
                            (Outlook) </h5>
                        <div className="flex mt-4 md:mt-6 flex-col space-y-4">
                            <div className="flex justify-center">
                                {roomDataSuccess && roomData.m365 ? "connected" : "not connected"}
                            </div>
                            <button onClick={() => deleteM365(roomId)}
                                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700 ms-3">Disconnect
                            </button>
                            <a className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700 ms-3"
                               href={`https://login.microsoftonline.com/common/oauth2/v2.0/authorize?` +
                                   `client_id=469e5942-bf76-44f3-8c77-272988660c36` +
                                   `&response_type=code` +
                                   `&redirect_uri=http://localhost:3000/redirect` +
                                   // `&redirect_uri=https://screenapi.mintyfi.com/redirect` +
                                   `&response_mode=query` +
                                   `&scope=openid%20offline_access%20https%3A%2F%2Fgraph.microsoft.com%2Fcalendars.read%20https%3A%2F%2Fgraph.microsoft.com%2Fuser.read` +
                                   `&state=rooms-${roomId}-screens&prompt=consent`} rel="noopener noreferrer">
                                Connect
                            </a>
                        </div>
                    </div>
                </div>
                {/*  ews  */}
                <div
                    className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 hover:shadow-md">
                    <div className="flex justify-end px-4 pt-4">

                        <div id="dropdown"
                             className="z-10 hidden text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                            <ul className="py-2" aria-labelledby="dropdownButton">
                                <li>
                                    <a href="#"
                                       className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Edit</a>
                                </li>
                                <li>
                                    <a href="#"
                                       className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Export
                                        Data</a>
                                </li>
                                <li>
                                    <a href="#"
                                       className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Delete</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="flex flex-col items-center pb-10">
                        <img className="p-5 w-28 " src={mexchange} alt="m365"/>
                        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">Exchange server </h5>
                        {/*<span className="text-sm text-gray-500 dark:text-gray-400">Visual Designer</span>*/}
                        <div className="flex mt-4 md:mt-6 flex flex-col space-y-4 justify-center">
                            <div className="flex justify-center">
                                {roomDataSuccess && roomData.ews ? "connected" : "not connected"}
                            </div>
                            <button onClick={() => deleteEws(roomId)}
                                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700 ms-3">Disconnect
                            </button>
                            <a href="#" onClick={onOpenEws}
                               className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700 ms-3">Connect</a>
                        </div>
                    </div>
                </div>
                {/*  ews  */}
            </div>


        </div>
    );
};

export default ScreenList;
