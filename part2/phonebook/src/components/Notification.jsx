const Notification = ({ message, type }) => {
  
  const notificationClass = type === "error" ? "error" : "success";
  
  if (message === null) {
    return null;
  }
  return (
    <div className={notificationClass}>
      {message}
    </div>
  )
}

export default Notification;