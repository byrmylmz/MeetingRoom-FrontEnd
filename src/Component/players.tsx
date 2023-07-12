import Table from "react-bootstrap/Table";
//@ts-ignore
import { screenList } from "../datas";

function players() {
  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Player Name</th>
            <th>IP</th>
            <th>Player ID</th>
            <th>Type</th>
            <th>Room</th>
            <th>Status</th>
            <th>Connection</th>
          </tr>
        </thead>
        <tbody>
          
        </tbody>
      </Table>
    </>
  );
}

export default players;
