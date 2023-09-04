import {configureStore} from "@reduxjs/toolkit";
import {roomApi} from "./services/roomApi";
import {playerApi} from "./services/playerApi";
import {calendarApi} from "./services/calendarApi";


export const store = configureStore({
    reducer: {
        [calendarApi.reducerPath]: calendarApi.reducer,
        [roomApi.reducerPath]: roomApi.reducer,

    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(calendarApi.middleware,roomApi.middleware),
})

