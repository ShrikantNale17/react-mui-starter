import { configureStore } from '@reduxjs/toolkit';
import CardSlice from '../../components/card/card-slice/CardSlice';

export default configureStore({
    reducer: {
        posts: CardSlice,
    }
})