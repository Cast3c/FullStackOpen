import { useNotification } from '../contexts/notificationContext'

const Notifications = () => {
  const [notification] = useNotification()

  const notificationStyle = {
    padding: '10px',
    borderRadius: '5px',
    marginBottom: '10px',
    borderStyle: 'solid',
    borderWidth: '2px'
  }

  const error = {
    ...notificationStyle,
    color: 'red',
    backgroundColor: '#ffebee',
    borderColor: 'red'
  }

  const success = {
    ...notificationStyle,
    color: 'green',
    backgroundColor: '#e8f5e9',
    borderColor: 'green'
  }

  if (!notification) return null

  return (
    <div style={notification.typeMessage === 'error' ? error : success}>
      {notification.message}
    </div>
  )
}

export default Notifications
