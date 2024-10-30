import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { fetchBusiness } from '../../api/business'

// const userAuthFromLocalStorage = () => {
//   const isAuth = localStorage.getItem('isAuth')

//   if (isAuth && JSON.parse(isAuth) === true) {
//     return true
//   }

//   return false
// }



const initialState = {
  business: [],
  status: 'idle',
}

export const getBusiness = createAsyncThunk(
  'business/getBusiness',
  async (_,{ rejectWithValue }) => {
    try {
   
      const response = await fetchBusiness()
    
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const businessSlice = createSlice({
  name: 'business',
  initialState,
  reducers: {
   
  }, extraReducers(builder) {
    builder
      .addCase(getBusiness.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getBusiness.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.business = action.payload
        
      })
      .addCase(getBusiness.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
})


// export const { f} = businessSlice.actions
export const selectBusiness = (state) => state.business.business
export const selectBusinessStatus = (state) => state.business.status

export default businessSlice.reducer
