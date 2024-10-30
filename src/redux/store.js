import { configureStore } from '@reduxjs/toolkit'
import authSlice from './slices/authSlice'
import businessSlice from './slices/businesSlice'
import reviewsSlice from './slices/reviewsSlice'

export const store = configureStore({
  reducer: {
    auth: authSlice,
    business: businessSlice,
    reviews: reviewsSlice,
  },
})
