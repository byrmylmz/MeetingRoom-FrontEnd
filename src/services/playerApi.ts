import {IPlayer} from "../models/player.model";
import {baseApiSlice} from "./baseApiSlice";

const _playerApi =baseApiSlice.enhanceEndpoints({addTagTypes:['Player']})
export const playerApi = _playerApi.injectEndpoints({

    endpoints: (builder) => (
        {

            getAllPlayer: builder.query<IPlayer[], void>({
                query: () => `/player`,
            }),

            addPlayer: builder.mutation<void, IPlayer>({
                query: player => ({
                    url: `/player`,
                    method: 'POST',
                    body: {...player}
                }),
                invalidatesTags:['Player']
            }),



        })
})

export const {
    useGetAllPlayerQuery,
    useAddPlayerMutation,
} = playerApi;
