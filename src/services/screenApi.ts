import {baseApiSlice} from "./baseApiSlice";
import {IScreen} from "../models/screen.model";

const _playerApi = baseApiSlice.enhanceEndpoints({addTagTypes: ['Player']})
export const screenApi = _playerApi.injectEndpoints({

    endpoints: (builder) => (
        {

            getAllScreens: builder.query<IScreen[], void>({
                query: () => `/screen`,
            }),

            addScreen: builder.mutation<void, IScreen>({
                query: screen => ({
                    url: `/screens`,
                    method: 'POST',
                    body: {...screen}
                }),
                invalidatesTags: ['Player']
            }),

            getScreensByRoomId: builder.query<IScreen[], string>({
                query: (roomId) => `/room/${roomId}/screens`
            })


        })
})

export const {
    useGetAllScreensQuery,
    useAddScreenMutation,
    useGetScreensByRoomIdQuery,
} = screenApi;
