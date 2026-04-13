import { Container, Row, Alert, Col } from 'react-bootstrap'
import { useGetChannelsQuery } from '../state/channels/channelsApi'
import { useGetMessagesQuery } from '../state/messages/messagesApi'
import ChannelsList from '../components/ChannelsList'
import Loader from '../components/Loader'
import { useSelector } from 'react-redux'
import ChatHeader from '../components/ChatHeader'
import ChatMessages from '../components/ChatMessages'
import ChatFrom from '../components/ChatForm'

export default function ChatPage() {
  const {
    data: channels,
    isLoading: isChannelsLoading,
    isError: isChannelsError,
    error: channelsError,
    refetch: refetchChannel,
  } = useGetChannelsQuery()

  const {
    data: messages,
    isLoading: isMessagesLoading,
  } = useGetMessagesQuery()

  const { selectedChannelId } = useSelector((state) => state.ui.chat)


  if (isChannelsLoading || isMessagesLoading) {
    return <Loader />
  }

  if (isChannelsError) {
    return (
      <Alert variant="danger" className="m-3">
        <Alert.Heading>Ошибка</Alert.Heading>
        <p>{channelsError?.data?.message || 'Попробуйте обновить страницу'}</p>
        <Button variant="outline-danger" onClick={refetchChannel}>
          Попробовать снова
        </Button>
      </Alert>
    )
  }

  const currentChannel = channels.find(({ id }) => id === selectedChannelId)
  const messagesCount = messages.length

  return (
    <Container className='my-4 h-100 rounded shadow'>
      <Row className='relative h-100 bg-white flex-md-row'>
        <ChannelsList
          channels={channels}
          className={'border-end px-0 bg-light flex-column h-100 d-flex'}
        />
        <Col className="col p-0 h-100">
          <div className='d-flex flex-column h-100'>
            <ChatHeader channel={currentChannel} messagesCount={messagesCount} />
            <ChatMessages />
            <div className='mt-auto px-5 py-3'>
              <ChatFrom />
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  )
}