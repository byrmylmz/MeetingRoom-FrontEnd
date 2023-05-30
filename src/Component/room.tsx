import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { useForm, SubmitHandler } from "react-hook-form";
import "../style.css";

interface IFormInput {
  firstName: string;
  lastName: string;
  age: number;
}

function Room() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({
    defaultValues: {
      example: "",
      exampleRequired: ""
    }
  });

  return (
    <>
      <Tabs
        defaultActiveKey="profile"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="home" title="Home">
        <form
      onSubmit={handleSubmit((data) => {
        alert(JSON.stringify(data));
      })}
    >
      <label>Example</label>
      <input {...register("example")} defaultValue="test" />
      <label>ExampleRequired</label>
      <input
        {...register("exampleRequired", { required: true, maxLength: 10 })}
      />
      {errors.exampleRequired && <p>This field is required</p>}
      <input type="submit" />
    </form>
        </Tab>
        <Tab eventKey="profile" title="Profile">
          Tab content for Profile
        </Tab>
        <Tab eventKey="contact" title="Contact" disabled>
          Tab content for Contact
        </Tab>
      </Tabs>
    </>
  );
}

export default Room;
