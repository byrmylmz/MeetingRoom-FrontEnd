import React, {useState} from "react";
import {
    useDeleteRoomMutation,
    useGetAllRoomQuery,
} from "../../services/roomApi";
import AddRoomModal from "./RoomModalCreate";
import {MeetIcon} from "../../assets/icons/meet";
import {GridIcon} from "../../assets/icons/grid";
import {ListIcon} from "../../assets/icons/list";
import {useDisclosure} from "@chakra-ui/react";
import {Link, useNavigate, useParams, useRoutes} from "react-router-dom";
import meetingicon from "../../assets/meeting.png"

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

function RoomList() {
    const [activeTab, setActiveTab] = useState(tabsData[1]);
    const changeTab = (tab: any) => {
        setActiveTab(tab);
    };

    const [isDropDownOpen, setIsDropDownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropDownOpen(!isDropDownOpen);
    };

    const navigate = useNavigate();



    const {data, isSuccess, refetch} = useGetAllRoomQuery();
    const [deleteRoom] = useDeleteRoomMutation();

    const deleteHandler = async (roomId: number,e:React.MouseEvent) => {
        e.stopPropagation();
        try {
            await deleteRoom(roomId);
            await refetch();
        } catch (error) {
            console.log("Error in deleting room", error);
        }
    };

    const handleNavigate= (roomId:number,e:React.MouseEvent)=>{
        e.stopPropagation()
        navigate(`${roomId}/screens`)
    }

    const {isOpen, onOpen, onClose} = useDisclosure();

    return (
        <div className="flex flex-col py-4 overflow-hidden  ">
            <AddRoomModal isOpen={isOpen} onClose={onClose}/>
            <div className="flex items-center px-6 justify-between w-full">
                <button
                    onClick={onOpen}
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Add New Room
                </button>
                <div className="flex bg-gray-100 max-w-fit gap-2 px-1 rounded-[8px]">
                    {tabsData.map((tab) => (
                        <button
                            key={tab.id}
                            className={`${
                                tab.id === activeTab.id ? "bg-gray-200" : "text-gray-400"
                            } px-2 my-1 py-1 rounded-[6px] text-lg font-semibold`}
                            onClick={() => changeTab(tab)}
                        >
                            {tab.icon}
                        </button>
                    ))}
                </div>
            </div>
            <hr
                className="my-6 h-0.5 border-t-0 bg-neutral-100 opacity-100 dark:opacity-50" />
            <div className="w-full h-full flex flex-wrap items-center overflow-y-auto px-4">
                {isSuccess && data.map((room, roomIndex) => (
                    <div  onClick={(e)=>handleNavigate(room.id,e)}
                        key={roomIndex}
                        className="flex items-center rounded w-1/3 p-2 cursor-pointer "
                        style={{
                            width: activeTab.type === "grid" ? "33.3333%" : "100%",
                        }}
                    >
                        <div
                            className="shadow-sm duration-300 hover:shadow-md border border-slate-100 rounded w-full flex items-center px-4 py-2 space-x-2">
                            <div className="text-3xl">
                               <img src={meetingicon} className="w-16" alt="meeting"/>
                            </div>
                            <div className="flex items-center  py-2 px-5 w-full">
                                <div className="w-full space-y-2">
                                    <div className="flex items-center justify-between w-full">
                                        <h1 className="whitespace-nowrap text-xs font-medium text-gray-500">
                                            Room Name:
                                        </h1>
                                        <h1 className="text-sm font-semibold">{room.roomName}</h1>
                                    </div>
                                    <div className="flex items-center justify-between w-full">
                                        <h1 className="whitespace-nowrap text-xs font-medium text-gray-500">
                                            Status:
                                        </h1>
                                        <div className="flex items-center">
                                            <div className="w-2 h-2 rounded-full bg-green-500 mr-1.5"></div>
                                            <h1 className="text-sm font-bold uppercase text-green-500">
                                                Available
                                            </h1>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between w-full">
                                        <h1 className="whitespace-nowrap text-xs font-medium text-gray-500">
                                            Location:
                                        </h1>
                                        <h1 className="text-sm font-semibold">{room.location}</h1>
                                    </div>


                                </div>

                            </div>
                            {/*  */}
                            <div className="flex flex-col space-y-2 item-center justify-center">

                                <div  onClick={(e)=>{deleteHandler(room.id,e)}}
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

        </div>
    );
}

export default RoomList;
