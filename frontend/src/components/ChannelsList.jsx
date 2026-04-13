import { Col, Nav } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentChannel } from '../state/ui/uiSlice'

const ChannelsList = ({ channels, className }) => {
  const dispatch = useDispatch()
  const { selectedChannelId } = useSelector((state) => state.ui.chat)

  const handleChannelClick = (id) => () => {
    dispatch(setCurrentChannel(id))
  }

  return (
    <Col xs={4} md={2} className={className}>
      <div className='d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4'>
        <b>Каналы</b>
      </div>
      <Nav variant="pills" as={'ul'} className="flex-column px-2 mb-3 overflow-auto h-100 d-block">
        {channels.map((channel) => {
          const isCurrentChannel = channel.id === selectedChannelId

          return (
            <Nav.Item as={'li'} className='w-100' key={channel.id}>
              <button
                type='button'
                className={`w-100 rounded-0 btn text-start ${isCurrentChannel && 'btn-secondary'}`}
                onClick={handleChannelClick(channel.id)}
              >
                <span className='me-1'>#</span>
                {channel.name}
              </button>
            </Nav.Item>
          )
        })}
      </Nav>
    </Col>
  )
}

export default ChannelsList