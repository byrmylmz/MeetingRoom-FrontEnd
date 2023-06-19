import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect } from "react"
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';




function Integration() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm();

  let selectedTemplate = watch("theme")


  const onSubmit = (data: any) => {
    console.log(data)
  }

  return (
    <>

      <Form.Group className="mb-3" controlId="formBasicRoomName">
        <Form.Label>Server URL</Form.Label>
        <Form.Control type="roomname" placeholder="Server URL" {...register("ssURL", { required: true })} />
        {errors["ssURL"] && <small className="text-red-600">
          Room Name is required.
        </small>}
      </Form.Group>

    </>
  );
}

export default Integration;

