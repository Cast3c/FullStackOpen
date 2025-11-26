import { createSlice } from "@reduxjs/toolkit"

const initialState = 'Welcome to Anecdotes app'

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers:{
        setMessage(state, action){
            return action.payload
        },
        clearMessage(){
            return ''
        }
    }
})

export const { setMessage, clearMessage } = notificationSlice.actions

export const showMessage = (message, time = 5) => {
    return dispatch => {
        dispatch(setMessage(message))
        setTimeout(() => {
            dispatch(clearMessage())
        }, time * 1000)
    }
}

export default notificationSlice.reducer