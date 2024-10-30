import { createSlice } from '@reduxjs/toolkit'

const userAuthFromLocalStorage = () => {
  const isAuth = localStorage.getItem('isAuth')

  if (isAuth && JSON.parse(isAuth) === true) {
    return true
  }

  return false
}

const userFromLocalStorage = () => {
  const user = JSON.parse(localStorage.getItem('user')) 

  if (user) {
    return JSON.parse(localStorage.getItem('user')) 
  }

  return null
}


const initialState = {
  isAuth: userAuthFromLocalStorage(),
  user: userFromLocalStorage(),
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authenticateUser: (state, action) => {
      state.isAuth = true
      state.user = action.payload
    },
    unauthenticateUser: (state) => {
      state.isAuth = false
      state.user = null
      
    },
  },
  
})

export const { authenticateUser, unauthenticateUser } = authSlice.actions

export default authSlice.reducer
