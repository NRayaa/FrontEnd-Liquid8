import { combineReducers, configureStore } from '@reduxjs/toolkit';
import themeConfigSlice from './themeConfigSlice';
import { usersApi } from './services/usersApi';
import { inboundDataProcessApi } from './services/inboundDataProcessApi';
import { productOldsApi } from './services/productOldsApi';

const rootReducer = combineReducers({
    themeConfig: themeConfigSlice,
    [usersApi.reducerPath]: usersApi.reducer,
    [inboundDataProcessApi.reducerPath]: inboundDataProcessApi.reducer,
    [productOldsApi.reducerPath]: productOldsApi.reducer,
});

export default configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(usersApi.middleware).concat(productOldsApi.middleware).concat(inboundDataProcessApi.middleware),
});

export type IRootState = ReturnType<typeof rootReducer>;
