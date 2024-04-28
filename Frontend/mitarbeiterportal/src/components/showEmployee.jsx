import { useEffect, useState } from 'react'
import { Panel, Table, Button, Modal } from 'rsuite';
import { IconSettings } from '@tabler/icons-react';
import { AuthService } from '../api/api.js';
import { useAuth } from '../context/AuthContext.jsx';
import Editemployee from './editEmloyee.jsx';

const { HeaderCell, Cell, Column } = Table;


import 'rsuite/dist/rsuite.css';
import '../styles/showproject.css'


const ShowEmployee = () => {
    const [users, setUsers] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const { user } = useAuth();
    const UserInstance = new AuthService();


    useEffect(() => {
        UserInstance.getAllUser().then(data => setUsers(data)).catch(error => console.log(error));
    }, []);

    const handleClose = () => { setOpen(false) };

    const toggleEdit = (user) => {
        setSelectedUser(user);
        setOpen(true)

    }



    return (
        <>
            <Panel header="Employee's" bordered bodyFill>
                <Table height={400} data={users}>
                    <Column flexGrow={1} align="center" fixed>
                        <HeaderCell>First Name</HeaderCell>
                        <Cell dataKey="firstName" />
                    </Column>

                    <Column flexGrow={1} fixed>
                        <HeaderCell>Last Name</HeaderCell>
                        <Cell dataKey="lastName" />
                    </Column>

                    <Column flexGrow={1}>
                        <HeaderCell>Role</HeaderCell>
                        <Cell dataKey="role" />
                    </Column>

                    <Column flexGrow={1}>
                        <HeaderCell>Email</HeaderCell>
                        <Cell dataKey="email" />
                    </Column>

                    {user.role === "admin" &&
                        <Column flexGrow={0.5}>
                            <HeaderCell>Options</HeaderCell>
                            <Cell>
                                {rowData => (
                                    <Button appearance="primary" style={{ color: 'bisque', backgroundColor: '#00684A', borderRadius: '15px', height: '35px' }}
                                        onClick={() => toggleEdit(rowData)} active>
                                        <IconSettings className='settings' size={20} />Edit
                                    </Button>
                                )}

                            </Cell>
                        </Column>
                    }
                </Table>
            </Panel>

            <Modal open={open} backdrop={true} onClose={handleClose} className='positionAdd'>
                {selectedUser && <Editemployee user={selectedUser} />}
            </Modal>
        </>
    );
};

export default ShowEmployee