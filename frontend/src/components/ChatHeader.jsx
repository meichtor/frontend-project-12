import { useTranslation } from 'react-i18next'

const ChatHeader = ({ channel, messagesCount }) => {
  const { t } = useTranslation()

  return (
    <div className='bg-light mb-4 p-3 shadow-sm small'>
      <p className='m-0'>
        <b># {channel.name ?? '-'}</b>
      </p>
      <span className='text-muted'>{t('chat.messagesCount', { count: messagesCount })}</span>
    </div>
  )
}

export default ChatHeader