import { Col, Nav, ButtonGroup, Dropdown } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { openModal, setCurrentChannel } from '../state/ui/uiSlice'
import { PlusSquare } from "react-bootstrap-icons"
import { useTranslation } from 'react-i18next'

const ChannelButton = ({ isCurrentChannel, handleChannelClick, channelName, channelId }) => (
  <button
    type='button'
    className={`w-100 rounded-0 text-start text-truncate btn ${isCurrentChannel && 'btn-secondary'}`}
    onClick={handleChannelClick(channelId)}
  >
    <span className='me-1'>#</span>
    {channelName}
  </button>
)

const ChannelItem = ({ channel }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { selectedChannelId } = useSelector((state) => state.ui.chat)
  const isCurrentChannel = channel.id === selectedChannelId
  const isRemovable = channel.removable

  const handleChannelClick = (id) => () => {
    dispatch(setCurrentChannel(id))
  }

  const handleDeleteClick = (id) => (e) => {
    e.preventDefault()
    dispatch(openModal({ type: 'removeChannel', extra: { channelId: id } }))
  }

  const handleRenameClick = (id) => (e) => {
    e.preventDefault()
    dispatch(openModal({ type: 'renameChannel', extra: { channelId: id } }))
  }

  return (
    <Nav.Item as={'li'} className='w-100'>{
      isRemovable ?
        <Dropdown as={ButtonGroup} className='d-flex'>
          <ChannelButton
            channelId={channel.id}
            channelName={channel.name}
            isCurrentChannel={isCurrentChannel}
            handleChannelClick={handleChannelClick}
          />

          <Dropdown.Toggle split variant={isCurrentChannel ? 'secondary' : null} id="dropdown-split-basic" >
            <span className='visually-hidden'>Управление каналом</span>
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="#" onClick={handleDeleteClick(channel.id)}>{t('channels.remove')}</Dropdown.Item>
            <Dropdown.Item href="#" onClick={handleRenameClick(channel.id)}>{t('channels.rename')}</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        :
        <ChannelButton
          channelId={channel.id}
          channelName={channel.name}
          isCurrentChannel={isCurrentChannel}
          handleChannelClick={handleChannelClick}
        />
    }
    </Nav.Item>
  )
}

const ChannelsList = ({ channels }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const handleAddChannelClick = () => {
    dispatch(openModal({ type: 'addChannel' }))
  }

  return (
    <Col xs={4} md={2} className='border-end px-0 bg-light flex-column h-100 d-flex'>
      <div className='d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4'>
        <b>{t('channels.title')}</b>
        <button type='button' className='p-0 text-primary btn btn-group-vertical' onClick={handleAddChannelClick}>
          <PlusSquare size={20} />
          <span className='visually-hidden'>+</span>
        </button>
      </div>
      <Nav variant="pills" as={'ul'} className="flex-column px-2 mb-3 overflow-auto h-100 d-block">
        {channels.map((channel) => (
          <ChannelItem key={channel.id} channel={channel} />
        ))}
      </Nav>
    </Col >
  )
}

export default ChannelsList