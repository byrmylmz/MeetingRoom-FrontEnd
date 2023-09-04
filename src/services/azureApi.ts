import {IAzure} from "../models/azure.model";
import {baseApiSlice} from "./baseApiSlice";

const _azureApi =baseApiSlice.enhanceEndpoints({addTagTypes:['Azure']})
export const azureApi = _azureApi.injectEndpoints({

    endpoints: (builder) => (
        {

            getAllAzure: builder.query<IAzure[], void>({
                query: () => `/player`,
            }),

            addAzure: builder.mutation<void, IAzure>({
                query: player => ({
                    url: `/player`,
                    method: 'POST',
                    body: {...player}
                }),
                invalidatesTags:['Azure']
            }),



        })
})

export const {
    useGetAllAzureQuery,
    useAddAzureMutation,
} = azureApi;
