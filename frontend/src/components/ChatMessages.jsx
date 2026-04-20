import { useEffect } from 'react'
import { animateScroll } from 'react-scroll'

const ChatMessages = ({ messages, selectedChannelId }) => {
  useEffect(() => {
    animateScroll.scrollToBottom({
      containerId: 'messages-box',
      duration: 0,
    })
  }, [selectedChannelId, messages?.length])

  return (
    <div className='chat-messages overflow-auto px-5' id='messages-box'>
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