import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm, SubmitHandler } from "react-hook-form";
import {useEffect} from "react"


interface IFormInput {
  firstName: string;
  lastName: string;
  age: number;
}

function Room() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm();



  const onSubmit = (data:any) => {
    console.log(data)
  }

  return (
    <>
      <Tabs
        defaultActiveKey="Main"
        id="RoomAdd"
        className="mb-3"
      >
        <Tab eventKey="Main" title="Main">
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3" controlId="formBasicRoomName">
              <Form.Label>Room Name</Form.Label>
              <Form.Control type="roomname" placeholder="Meeting Room" {...register("roomname",{required : true})} />
              {errors["roomname"] && <small className="text-red-600">
                Room Name is required.
              </small>}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicCapacity">
              <Form.Label>Capacity</Form.Label>
              <Form.Control type="capacity" placeholder="Capacity" {...register("capacity")} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={3} {...register("desc")}  />
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Check me out" {...register("onCheck",{required : true})} />
              {errors["onCheck"] && <small className="text-red-600">
                You must accept this form.
              </small>}
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Tab>
        <Tab eventKey="Theme" title="Theme">
        <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Theme</Form.Label>
              <Form.Select aria-label="Default Theme" {...register("theme",{required : true})} >
                <option>Default Theme</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </Form.Select>
              {errors["select"] && <small className="text-red-600">
                Select field is required.
              </small>}
            </Form.Group>
        </Tab>
        <Tab eventKey="Features" title="Features">
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Label>Hide Meeting Subject</Form.Label>
              <Form.Check type="checkbox" label="Hide Meeting Subject" {...register("onCheck")}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Label>Enable Instant Meeting</Form.Label>
              <Form.Check type="checkbox" label="Enable Instant Meeting" {...register("onCheck")}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Label>Enable End Early</Form.Label>
              <Form.Check type="checkbox" label="Enable End Early" {...register("onCheck")}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Label>Enable Extend Meeting</Form.Label>
              <Form.Check type="checkbox" label="Enable Extend Meeting" {...register("onCheck")}/>
          </Form.Group>
        </Tab>
        <Tab eventKey="Localization" title="Localization">
          Tab content for Contact
        </Tab>
        <Tab eventKey="Integration" title="Integration">
          Tab content for Contact
        </Tab>
        <Tab eventKey="Automation" title="Automation">
          Tab content for Contact
        </Tab>
      </Tabs>
    </>
  );
}

export default Room;
