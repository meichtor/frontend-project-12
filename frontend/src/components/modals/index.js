import AddChannel from './AddChannel'
import RenameChannel from './RenameChannel'
import RemoveChannel from './RemoveChannel'

const modals = {
  addChannel: {
    title: 'modals.addChannel.title',
    body: AddChannel,
  },
  renameChannel: {
    title: 'modals.renameChannel.title',
    body: RenameChannel,
  },
  removeChannel: {
    title: 'modals.removeChannel.title',
    body: RemoveChannel,
  },
}

export default modals