import {configureStore} from "@reduxjs/toolkit";
import {roomApi} from "./services/roomApi";


export const store = configureStore({
    reducer: {
        [roomApi.reducerPath]: roomApi.reducer,

    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(roomApi.middleware),

})

