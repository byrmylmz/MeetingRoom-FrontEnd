import Form from "react-bootstrap/Form";
import { SubmitHandler, useForm } from "react-hook-form";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

import Modal from "react-bootstrap/Modal";

function Integration() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log(data)
  }
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Tabs
        defaultActiveKey="Main"
        id="RoomAdd"
        className="mb-3"
      >
        <Tab eventKey="Mintyfi" className="min-h-[400px]" title="Mintyfi">

          <Form.Group className="mb-3" controlId="formBasicRoomName">
            <Form.Label>Room Name</Form.Label>
            <Form.Control type="roomname" placeholder="Meeting Room" {...register("roomname", { required: true })} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicCapacity">
            <Form.Label>Capacity</Form.Label>
            <Form.Control type="capacity" placeholder="Capacity" {...register("capacity")} />
          </Form.Group>
        </Tab>
        <Tab eventKey="Office 365" className="min-h-[400px]" title="Office 365">

          <Form.Group className="mb-3" controlId="formBasicRoomName">
            <Form.Label>Room Name</Form.Label>
            <Form.Control type="roomname" placeholder="Meeting Room" {...register("roomname", { required: true })} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicCapacity">
            <Form.Label>Capacity</Form.Label>
            <Form.Control type="capacity" placeholder="Capacity" {...register("capacity")} />
          </Form.Group>
        </Tab>
        <Tab eventKey="GSuite" className="min-h-[400px]" title="GSuite">

          <Form.Group className="mb-3" controlId="formBasicRoomName">
            <Form.Label>Room Name</Form.Label>
            <Form.Control type="roomname" placeholder="Meeting Room" {...register("roomname", { required: true })} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicCapacity">
            <Form.Label>Capacity</Form.Label>
            <Form.Control type="capacity" placeholder="Capacity" {...register("capacity")} />
          </Form.Group>
        </Tab>

      </Tabs>
      <Button variant="primary" type="button" onClick={handleSubmit(onSubmit)}>
        Save
      </Button>
    </>
  );
}

export default Integration;
