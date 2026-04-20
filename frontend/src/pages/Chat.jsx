import { Container, Row, Alert, Col, Button } from 'react-bootstrap'
import { useGetChannelsQuery } from '../state/channels/channelsApi'
import { useGetMessagesQuery } from '../state/messages/messagesApi'
import ChannelsList from '../components/ChannelsList'
import Loader from '../components/ui/Loader'
import { useSelector } from 'react-redux'
import ChatHeader from '../components/ChatHeader'
import ChatMessages from '../components/ChatMessages'
import ChatForm from '../components/ChatForm'
import { useTranslation } from 'react-i18next'
import { Navigate } from 'react-router'

export default function ChatPage() {
  const { t } = useTranslation()
  const { selectedChannelId, defaultChannelId } = useSelector(state => state.ui.chat)
  const {
    data: channels,
    isLoading: isChannelsLoading,
    isError: isChannelsError,
    error: channelsError,
    refetch: refetchChannels,
  } = useGetChannelsQuery()
  const {
    data: allMessages,
    isLoading: isMessagesLoading,
    isError: isMessagesError,
    error: messagesError,
    refetch: refetchMessages,
  } = useGetMessagesQuery()

  if (messagesError?.status === 401 || channelsError?.status === 401) {
    return <Navigate to="/login" />
  }

  if (isChannelsLoading || isMessagesLoading) {
    return (
      <Container className="my-4 w-100 d-flex justify-content-center align-items-center h-100 rounded shadow">
        <Loader />
      </Container>
    )
  }

  if (isChannelsError || isMessagesError) {
    const message = isChannelsError ? channelsError?.data?.message : messagesError?.data?.message
    const refetch = isChannelsError ? refetchChannels : refetchMessages

    return (
      <Container className="my-4 w-100 h-100">
        <Alert variant="danger" className="m-3">
          <Alert.Heading>{t('errors.error')}</Alert.Heading>
          <p>{message || t('errors.tryReload')}</p>
          <Button className="mt-3" variant="outline-danger" onClick={refetch}>
            {t('errors.retry')}
          </Button>
        </Alert>
      </Container>
    )
  }

  const currentChannel = channels.find(({ id }) => id === selectedChannelId) ?? defaultChannelId
  const channelMessages = allMessages.filter(({ channelId }) => channelId === selectedChannelId)
  const messagesCount = channelMessages.length

  return (
    <Container className="my-4 h-100 rounded shadow overflow-hidden">
      <Row className="relative h-100 bg-white flex-md-row">
        <ChannelsList channels={channels} />
        <Col className="col p-0 h-100">
          <div className="d-flex flex-column h-100">
            <ChatHeader channel={currentChannel} messagesCount={messagesCount} />
            <ChatMessages messages={channelMessages} selectedChannelId={selectedChannelId} />
            <div className="mt-auto px-5 py-3">
              <ChatForm />
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  )
}
