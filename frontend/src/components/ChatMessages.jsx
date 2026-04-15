const ChatMessages = ({ messages }) => {
  return (
    <div className='chat-messages overflow-auto px-5'>
      {messages.map((message) => (
        <div key={message.id} className="mb-2 text-break">
          <b>{message.username}</b>
          :{' '}
          {message.body}
        </div>
      ))}
    </div>
  )
}

export default ChatMessages