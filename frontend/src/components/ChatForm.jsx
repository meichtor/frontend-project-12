import { Form, InputGroup, Button } from "react-bootstrap"
import { ArrowRightSquare } from "react-bootstrap-icons"

const ChatFrom = () => {
  return (
    <Form noValidate className="py-1 border rounded-2">
      <InputGroup>
        <Form.Control
          placeholder="Введдите сообщение"
          aria-label="Новое сообщение"
          aria-describedby="basic-addon1"
          className="border-0 p-0 ps-2"
        />
        <Button type="submit" variant="outline-secondary" id="button-addon1">
          <ArrowRightSquare size={20} />
          <span className="visually-hidden">Отправить</span>
        </Button>
      </InputGroup>
    </Form>
  )
}

export default ChatFrom