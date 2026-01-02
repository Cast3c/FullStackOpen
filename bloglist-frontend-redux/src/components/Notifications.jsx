import { useSelector } from 'react-redux'

const Notifications = () => {

  const notificationStyle = {
    padding: '10px',
    borderRadius: '5px',
    marginBottom: '10px',
    borderStyle: 'solid',
    borderWidth: '2px'
  }

  const errorStyle = {
    ...notificationStyle,
    color: 'red',
    backgroundColor: '#ffebee',
    borderColor: 'red'
  }

  const successStyle = {
    ...notificationStyle,
    color: 'green',
    backgroundColor: '#e8f5e9',
    borderColor: 'green'
  }

  const notification = useSelector(state => state.notification)
  console.log('Notification state:',notification)

  if (!notification) return null

  return (
    <div style={ notification.typeMessage === 'error' ? errorStyle : successStyle }>
      { notification.message }
    </div>
  )
}

export default Notifications
