import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { useForm, SubmitHandler, useFormState } from "react-hook-form";
import { roomList } from "../datas";
import { useEffect, useState } from "react";

function Roomlist() {
  
  const [rooms,setRooms] = useState<any>([])

  useEffect(() => {
    setRooms(roomList)
  },[])
  
  return (
    <>
      <Button variant="primary" type="button" href="../room">
        Add Room
      </Button>
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
          {
            rooms.map((item:any,index:number) => {
              return  <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.fruit}</td>
              <td>{item.size}</td>
              <td>{item.color}</td>
            </tr>
            })
          }
        </tbody>
      </Table>
    </>
  );
}

export default Roomlist;
