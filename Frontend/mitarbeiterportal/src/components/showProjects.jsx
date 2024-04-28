import { useEffect, useState } from 'react'
import { Panel, Table, Modal, Button } from 'rsuite';
import { IconSettings } from '@tabler/icons-react';
import { AuthService, ProjectService } from '../api/api.js';
import { useAuth } from '../context/AuthContext.jsx';
import Editproject from './editProject.jsx';
import 'rsuite/dist/rsuite.css';
import '../styles/showproject.css'




const ShowProjects = () => {

    const [projects, setProjects] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);
    const [open, setOpen] = useState(false);

    const { user } = useAuth();
    const { HeaderCell, Cell, Column } = Table;
    const ProjectInstance = new ProjectService();
    const UserInstance = new AuthService();

    const handleClose = () => { setOpen(false) };

    const toggleEdit = (project) => {
        setSelectedProject(project);
        setOpen(true)
    }

    useEffect(() => {
        ProjectInstance.getAllProject().then(data => { setProjects(data) }).catch(error => console.log(error));
    }, []);

    useEffect(() => {
        UserInstance.getAllUser().then(data => setUsers(data)).catch(error => console.log(error));
    }, []);

    return (
        <>
            <Panel header="Active Projects" bodyFill bordered >
                <Table height={400} data={projects}>
                    <Column flexGrow={1} align="center" fixed>
                        <HeaderCell>Name</HeaderCell>
                        <Cell dataKey="name" />
                    </Column>

                    <Column flexGrow={2} fixed>
                        <HeaderCell>Description</HeaderCell>
                        <Cell dataKey="description" />
                    </Column>

                    <Column flexGrow={1}>
                        <HeaderCell>Deadline</HeaderCell>
                        <Cell dataKey="deadline" >
                            {(rowData) => new Date(rowData.deadline).toLocaleDateString()}
                        </Cell>
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

                    {user.role === "teamlead" &&
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
                {selectedProject && <Editproject project={selectedProject} users={users} />}
            </Modal>
        </>
    );
};

export default ShowProjects