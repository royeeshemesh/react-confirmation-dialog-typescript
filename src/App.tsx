import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useState} from 'react';
import Table from "react-bootstrap/Table";
import DeleteButton from "./DeleteButton";
import ConfirmationModalContextProvider from "./modalConfirmationContext";
import people from './people.json';

type People = {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    gender: string;
    ip_address: string;
}

function App() {
    const [list, setList] = useState<People[]>(people);

    const remove = (id: number) => {
        list.splice(list.findIndex(person => person.id === id), 1);
        setList([...list]);
    };

    const getRows = () => list.map(person => (
        <tr key={person.id}>
            <td>{person.first_name}</td>
            <td>{person.last_name}</td>
            <td>{person.email}</td>
            <td>{person.gender}</td>
            <td>{person.ip_address}</td>
            <td>
                <DeleteButton onClick={() => remove(person.id)} className="btn btn-danger">Delete</DeleteButton>
            </td>
        </tr>
    ));

    return (
        <ConfirmationModalContextProvider>
            <div className="App">
                <Table bordered striped className="w-auto m-auto">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Gender</th>
                        <th>IP Address</th>
                        <th/>
                    </tr>
                    </thead>
                    <tbody>
                    {getRows()}
                    </tbody>
                </Table>

            </div>
        </ConfirmationModalContextProvider>
    );
}

export default App;
