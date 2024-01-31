import React from "react";
import {useDeleteRoomMutation, useGetAllRoomQuery} from "../../services/roomApi";
import {Link} from "react-router-dom";
import AddRoomModal from "./addRoomModal";
import {
    Button,
    useDisclosure
} from '@chakra-ui/react'

function RoomsList() {

    const {isOpen, onOpen, onClose} = useDisclosure()
    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)
    const obj = {initialRef: initialRef, finalRef: finalRef, isOpen: isOpen, onOpen: onOpen, onClose: onClose};

    const {data, isSuccess,refetch} = useGetAllRoomQuery();
    const[deleteRoom]=useDeleteRoomMutation();
    const deleteHandler=async(roomId:number)=>{
        try{
            await deleteRoom(roomId)
            await refetch();
        }catch (error){
            console.log('Error in deleting room',error)
        }

    }
    return (
        <div>
            <AddRoomModal {...obj}/>
            <div className="w-full">
                <div className="sm:flex items-center justify-between py-2">
                    <Button colorScheme='teal' onClick={onOpen}>Add New Room</Button>
                </div>
                <div className="bg-white shadow-md rounded ">
                    <table className="min-w-max w-full table-auto">
                        <thead>
                        <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                            <th className="py-3 px-6 text-left">Rooms</th>
                            <th className="py-3 px-6 text-left">Client</th>
                            <th className="py-3 px-6 text-center">Users</th>
                            <th className="py-3 px-6 text-center">Status</th>
                            <th className="py-3 px-6 text-center">Actions</th>
                        </tr>
                        </thead>
                        <tbody className="text-gray-600 text-sm font-light">
                        {isSuccess && data.map(room => (
                            <tr className="border-b border-gray-200 hover:bg-gray-100" key={room.id}>
                                <td className="py-3 px-6 text-left whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="mr-2">
                                            <img className="w-8 h-8" src="https://img.icons8.com/color/room.png"
                                                 alt=""/>
                                        </div>
                                        <span className="font-medium">{room.roomName}</span>
                                    </div>
                                </td>
                                <td className="py-3 px-6 text-left">
                                    <div className="flex items-center">
                                        <div className="mr-2">
                                            <img className="w-6 h-6 rounded-full"
                                                 src="https://randomuser.me/api/portraits/men/1.jpg" alt=""/>
                                        </div>
                                        <span>Eshal Rosas</span>
                                    </div>
                                </td>
                                <td className="py-3 px-6 text-center">
                                    <div className="flex items-center justify-center">
                                        <img
                                            className="w-6 h-6 rounded-full border-gray-200 border transform hover:scale-125"
                                            src="https://randomuser.me/api/portraits/men/1.jpg" alt=""/>
                                        <img
                                            className="w-6 h-6 rounded-full border-gray-200 border -m-1 transform hover:scale-125"
                                            src="https://randomuser.me/api/portraits/women/2.jpg" alt=""/>
                                        <img
                                            className="w-6 h-6 rounded-full border-gray-200 border -m-1 transform hover:scale-125"
                                            src="https://randomuser.me/api/portraits/men/3.jpg" alt=""/>
                                    </div>
                                </td>
                                <td className="py-3 px-6 text-center">
                                    <span
                                        className="bg-purple-200 text-purple-600 py-1 px-3 rounded-full text-xs">Active</span>
                                </td>
                                <td className="py-3 px-6 text-center">
                                    <div className="flex item-center justify-center">
                                        <Link to={`${room.id}/screens`}>
                                            <div
                                                className="w-5 mr-2 transform hover:text-purple-500 hover:scale-125 hover:cursor-pointer">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                     stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                                                </svg>
                                            </div>
                                        </Link>
                                        <Link to={`update/${room.id}`}>
                                            <div
                                                className="w-5 mr-2 transform hover:text-purple-500 hover:scale-125 hover:cursor-pointer">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                     stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/>
                                                </svg>
                                            </div>
                                        </Link>

                                        <div  onClick={()=>{deleteHandler(room.id)}}
                                            className="w-5 mr-2 transform hover:text-purple-500 hover:scale-125 hover:cursor-pointer">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                 stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                                            </svg>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default RoomsList;
