const Notifications = ({ message, typeMessage }) => {
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

  if (!message) return null

  return (
    <div style={typeMessage === 'error' ? errorStyle : successStyle}>
      {message}
    </div>
  )
}

export default Notifications
