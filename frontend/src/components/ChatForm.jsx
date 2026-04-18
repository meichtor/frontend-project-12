import { Form, InputGroup, Button, Spinner } from "react-bootstrap"
import { ArrowRightSquare } from "react-bootstrap-icons"
import { useAddMessageMutation } from '../state/messages/messagesApi';
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

const ChatForm = () => {
  const { t } = useTranslation()
  const { selectedChannelId } = useSelector((state) => state.ui.chat)
  const { username } = useSelector((state) => state.user)
  const [addMessage, { isLoading }] = useAddMessageMutation()
  const [inputMessage, setInputMessage] = useState('')
  const inputRef = useRef(null);
  const submitDisabled = inputMessage === '' || isLoading

  const handleChangeMessage = (e) => {
    const { value } = e.target
    setInputMessage(value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const body = inputMessage.trim()

    const message = {
      channelId: selectedChannelId,
      body,
      username,
    }

    try {
      await addMessage(message).unwrap()
      setInputMessage('')
    } catch (err) {
      console.error(`${t('errors.sending')}:`, err)
      toast.error(t('validation.networkError'), {
        position: 'top-right'
      })
    }
  }

  useEffect(() => {
    if (!isLoading && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isLoading])

  return (
    <Form noValidate className="py-1 border rounded-2" onSubmit={handleSubmit}>
      <InputGroup>
        <Form.Control
          ref={inputRef}
          name="new message"
          placeholder={t('chat.placeholder')}
          aria-label={t('chat.newMessage')}
          aria-describedby="basic-addon1"
          className="border-0 p-0 ps-2"
          value={inputMessage}
          onChange={handleChangeMessage}
          disabled={isLoading}
        />
        <Button type="submit" variant="outline-secondary" id="button-addon1" disabled={submitDisabled}>
          {isLoading ?
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
            :
            <ArrowRightSquare size={20} />
          }
          <span className="visually-hidden">{t('chat.send')}</span>
        </Button>
      </InputGroup>
    </Form>
  )
}

export default ChatForm