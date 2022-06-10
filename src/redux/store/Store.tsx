import { configureStore } from '@reduxjs/toolkit';
import CardSlice from '../../components/card/card-slice/CardSlice';
import UserSlice from '../../components/user/user-slice/UserSlice';
import SavedPostSlice from '../../pages/saved-posts/savePost-slice/SavedPostSlice';

const store = configureStore({
    reducer: {
        user: UserSlice,
        posts: CardSlice,
        savedPosts: SavedPostSlice,
    }
})

export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
