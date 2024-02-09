import {baseApiSlice} from "./baseApiSlice";
import {IScreen} from "../models/screen.model";


const _playerApi = baseApiSlice.enhanceEndpoints({addTagTypes: ['Screen']})
export const screenApi = _playerApi.injectEndpoints({

    endpoints: (builder) => (
        {
            getAllScreens: builder.query<IScreen[], void>({
                query: () => `/screens`,
            }),

            getScreensById: builder.query<IScreen, string>({
                query: (screenId) => `/screens/${screenId}`
            }),

            addScreen: builder.mutation<void, IScreen>({
                query: screen => ({
                    url: `/screens`,
                    method: 'POST',
                    body: screen
                }),
            }),

            getScreensByRoomId: builder.query<IScreen[], string>({
                query: (roomId) => `/room/${roomId}/screens`
            }),

            deleteScreen: builder.mutation<void, number>({
                query: (screenId) => ({
                    url: `/screens/${screenId}`,
                    method: 'DELETE',
                })
            }),





        })
})

export const {
    useGetAllScreensQuery,
    useGetScreensByIdQuery,
    useAddScreenMutation,
    useGetScreensByRoomIdQuery,
    useDeleteScreenMutation,



} = screenApi;
