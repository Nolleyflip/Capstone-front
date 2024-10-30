import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { fetchReviews } from '@/api/reviews'

// const userAuthFromLocalStorage = () => {
//   const isAuth = localStorage.getItem('isAuth')

//   if (isAuth && JSON.parse(isAuth) === true) {
//     return true
//   }

//   return false
// }



const initialState = {
    reviews: [],
    responses:[],
  reviewStatus: 'idle',
  responseStatus: 'idle',
}

export const getReviews = createAsyncThunk(
  'reviews/getReviews',
  async (id,{ rejectWithValue }) => {
    try {
   
      const response = await fetchReviews(id)
    
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const getResponses = createAsyncThunk(
  'reviews/getResponses',
  async (id,{ rejectWithValue }) => {
    try {
   
      const response = await fetchReviews(id)
    
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const addReview = createAsyncThunk(
  'reviews/addReview',
  async (  {id,review}, { rejectWithValue }) => {
    try {
    console.log(id, review)
      // const response = await postReview(id, review)
    
      // return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
   
  }, extraReducers(builder) {
    builder
      .addCase(getReviews.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getReviews.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.reviews = action.payload
        
      })
      .addCase(getReviews.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(addReview.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(addReview.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.reviews = action.payload

      })
      .addCase(addReview.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
})


// export const { f} = businessSlice.actions
export const selectReviews = (state) => state.reviews.reviews
export const selectResponses = (state) => state.reviews.responses
export const selectResponsesStatus = (state) => state.reviews.responsesStatus
export const selectReviewsStatus = (state) => state.reviews.reviewStatus

export default reviewsSlice.reducer
