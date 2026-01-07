export const showNotifications = (dispatch, message, typeMessage, duration) => {
  dispatch({
    type: 'SHOW',
    payload: { message, typeMessage }
  })

  setTimeout(() => {
    dispatch({ type: 'CLEAR' })
  }, duration * 1000)
}