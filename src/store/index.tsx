import { combineReducers, configureStore } from '@reduxjs/toolkit';
import themeConfigSlice from './themeConfigSlice';
import { usersApi } from './services/usersApi';
import { inboundDataProcessApi } from './services/inboundDataProcessApi';
import { productOldsApi } from './services/productOldsApi';
import { checkProduct } from './services/checkProduct';
import { categoriesApi } from './services/categoriesApi';
import { colorTagApi } from './services/colorTagApi';
import { riwayatApi } from './services/riwayatApi';

const rootReducer = combineReducers({
    themeConfig: themeConfigSlice,
    [usersApi.reducerPath]: usersApi.reducer,
    [inboundDataProcessApi.reducerPath]: inboundDataProcessApi.reducer,
    [productOldsApi.reducerPath]: productOldsApi.reducer,
    [checkProduct.reducerPath]: checkProduct.reducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    [colorTagApi.reducerPath]: colorTagApi.reducer,
    [riwayatApi.reducerPath]: riwayatApi.reducer,
});

export default configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(usersApi.middleware)
            .concat(productOldsApi.middleware)
            .concat(inboundDataProcessApi.middleware)
            .concat(checkProduct.middleware)
            .concat(categoriesApi.middleware)
            .concat(colorTagApi.middleware)
            .concat(riwayatApi.middleware),
});

export type IRootState = ReturnType<typeof rootReducer>;
