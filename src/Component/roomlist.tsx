import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { useForm, SubmitHandler } from "react-hook-form";

function Roomlist() {

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors }
      } = useForm();
    
  const onSubmit = (data: any) => {
    console.log(data);
  };


  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <td>3</td>
            <td colSpan={2}>Larry the Bird</td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </Table>

      <Button variant="primary" type="button" onClick={handleSubmit(onSubmit)}>
        Save
      </Button>
    </>
  );
}

export default Roomlist;