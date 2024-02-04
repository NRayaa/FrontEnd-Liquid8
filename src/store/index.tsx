import { combineReducers, configureStore } from '@reduxjs/toolkit';
import themeConfigSlice from './themeConfigSlice';
import { usersApi } from './services/usersApi';
import { inboundDataProcessApi } from './services/inboundDataProcessApi';
import { productOldsApi } from './services/productOldsApi';
import { checkProduct } from './services/checkProduct';
import { categoriesApi } from './services/categoriesApi';
import { colorTagApi } from './services/colorTagApi';
import { riwayatApi } from './services/riwayatApi';
import { productNewApi } from './services/productNewApi';
import { bundleProductApi } from './services/bundleProductApi';
import { promoApi } from './services/promoApi';
import { palletApi } from './services/palletApi';
import { listProductApi } from './services/listProductAPI';
import { listDumpApi } from './services/listDumpApi';
import { listRoleApi } from './services/listRoleApi';

const rootReducer = combineReducers({
    themeConfig: themeConfigSlice,
    [usersApi.reducerPath]: usersApi.reducer,
    [inboundDataProcessApi.reducerPath]: inboundDataProcessApi.reducer,
    [productOldsApi.reducerPath]: productOldsApi.reducer,
    [checkProduct.reducerPath]: checkProduct.reducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    [colorTagApi.reducerPath]: colorTagApi.reducer,
    [riwayatApi.reducerPath]: riwayatApi.reducer,
    [productNewApi.reducerPath]: productNewApi.reducer,
    [bundleProductApi.reducerPath]: bundleProductApi.reducer,
    [promoApi.reducerPath]: promoApi.reducer,
    [palletApi.reducerPath]: palletApi.reducer,
    [listProductApi.reducerPath]: listProductApi.reducer,
    [listDumpApi.reducerPath]: listDumpApi.reducer,
    [listRoleApi.reducerPath]: listRoleApi.reducer,
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
            .concat(riwayatApi.middleware)
            .concat(productNewApi.middleware)
            .concat(promoApi.middleware)
            .concat(bundleProductApi.middleware)
            .concat(palletApi.middleware)
            .concat(listProductApi.middleware)
            .concat(listDumpApi.middleware)
            .concat(listRoleApi.middleware),
});

export type IRootState = ReturnType<typeof rootReducer>;
