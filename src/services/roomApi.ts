import {IRoom} from "../models/room.model";
import {baseApiSlice} from "./baseApiSlice";
import {IRoomResponse} from "../models/roomResponse.model";
import {IEwsIntegration} from "../models/ewsIntegration.model";

const _roomApi =baseApiSlice.enhanceEndpoints({addTagTypes:['Room']})
export const roomApi = _roomApi.injectEndpoints({

    endpoints: (builder) => (
        {
            getAllRoom: builder.query<IRoom[], void>({
                query: () => `/room`,
            }),

            addRoom: builder.mutation<void, IRoom>({
                query: room => ({
                    url: `/room`,
                    method: 'POST',
                    body: {...room}
                }),

            }),

            getRoomById:builder.query<IRoomResponse,string>({
                query:(roomId)=>`/room/${roomId}`
            }),


            deleteRoom: builder.mutation<void,number>({
                query:(roomId)=>({
                    url: `/room/${roomId}`,
                    method: 'DELETE',
                })
            }),

                disconnectM365: builder.mutation<void,string>({
                query:(roomId)=>({
                    url: `/room/disconnect/m365/${roomId}`,
                    method: 'DELETE',
                })
            }),

            disconnectEws: builder.mutation<void,string>({
                query:(roomId)=>({
                    url: `/room/disconnect/ews/${roomId}`,
                    method: 'DELETE',
                })
            }),

            updateEwsIntegration: builder.mutation<void, IEwsIntegration>({
                query: ews => ({
                    url: `/room/${ews.roomId}/ews`,
                    method: 'POST',
                    body: ews
                }),
            }),

            getEwsIntegration: builder.query<IEwsIntegration, string>({
                query: (roomId) => `/room/${roomId}/ews`
            }),


        })
})

export const {
    useGetAllRoomQuery,
    useGetRoomByIdQuery,
    useAddRoomMutation,
    useDeleteRoomMutation,
    useUpdateEwsIntegrationMutation,
    useGetEwsIntegrationQuery,
    useDisconnectEwsMutation,
    useDisconnectM365Mutation
} = roomApi;
