import React, { useState } from 'react'
import { Drawer, ButtonToolbar, Button, ButtonGroup, Modal } from 'rsuite';
import { IconCheckbox, IconLogout, IconAtom2, IconExternalLink } from '@tabler/icons-react';
import { useAuth } from '../context/AuthContext.jsx';
import { AuthService } from '../api/api.js';
import Addemployee from './addEmployee.jsx';
import Createproject from './createProject.jsx';
import Kalender from './calendar.jsx';
import 'rsuite/dist/rsuite.css';
import '../styles/drawer.css'


const AuthInstance = new AuthService();

const Drawermenue = () => {
  const [openWithHeader, setOpenWithHeader] = React.useState(false);
  const { logout, user } = useAuth();
  const [showAddemployee, setShowAddemployee] = useState(false);
  const [showCreateproject, setShowCreateproject] = useState(false);
  const [checkedIn, setCheckedIn] = useState(false)
  const [showKalender, setShowKalender] = useState(false)
 
  // fetch aud dem Backend

  // const LoggedUser = new AuthService();
  // const [users, setUsers] = useState([]);

  // useEffect(() => {
  //   LoggedUser.getAllUser().then(data => setUsers(data)).catch(error => console.log(error));
  // }, []);

  // const loggedNameData = users.map((user) => ({
  //   firstName: user.firstName,
  //   lastName: user.lastName,
  // }));

  // ############################


  const [open, setOpen] = useState(false);
  const handleClose = () => { setOpen(false), setShowAddemployee(false); setShowCreateproject(false), setShowKalender(false); };

 
  const toggleCheckINOut = () => {
    try {
      AuthInstance.checkInOut()
      setCheckedIn(!checkedIn)
    } catch (error) {
      console.log(error);
    }
  }

  const handleAddEmployeeClick = () => {
    setOpen(true)
    setShowCreateproject(false);
    setShowAddemployee(true);
    setShowKalender(false);
  };

  const handleCreateprojectClick = () => {
    setOpen(true)
    setShowAddemployee(false);
    setShowCreateproject(true);
    setShowKalender(false);
  };

  const handleKalenderClick = () => {
    setOpen(true)
    setShowKalender(true);
    setShowCreateproject(false);
    setShowAddemployee(false);
  }

  return (
    <>
      <ButtonToolbar>
        <Button className='openBttn' onClick={() => setOpenWithHeader(true)}><IconAtom2 className='openUp' size={20} /></Button>
      </ButtonToolbar>

      <Drawer open={openWithHeader} onClose={() => setOpenWithHeader(false)}>

        <Drawer.Header style={{ backgroundColor: '#001E2B', borderColor: 'bisque' }} >
          <Drawer.Title style={{ color: 'bisque', }} >{user.firstName} {user.lastName}</Drawer.Title>


          {checkedIn ? <Button appearance="primary" style={{ color: 'bisque', backgroundColor: '#00684A', marginLeft: '1rem', marginBottom: '10px' }} onClick={toggleCheckINOut} active>
            Check out <IconExternalLink className='checkout' size={20} />
          </Button> : <Button appearance="primary" style={{ color: 'bisque', backgroundColor: '#00684A', marginLeft: '1rem', marginBottom: '10px' }} onClick={toggleCheckINOut} active>
            Check in <IconCheckbox className='checkin' size={20} />
          </Button>
          }

        </Drawer.Header>

        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: '#001E2B', }}>
          <div style={{ flex: '1 1 auto', overflow: 'auto', }}>


            <ButtonGroup style={{ display: 'flex', flexDirection: 'column', marginTop: '30px', width: '500px', marginLeft: '50px', }} vertical>
              {user.role === "admin" && <Button appearance="primary" style={{ color: 'bisque', backgroundColor: '#00684A', marginLeft: '1rem', marginBottom: '10px', height: '80px', fontSize: '20px' }} active onClick={handleAddEmployeeClick}>
                Add Employee
              </Button>}

              {user.role === "admin" && <Button appearance="primary" style={{ color: 'bisque', backgroundColor: '#00684A', marginLeft: '1rem', marginBottom: '10px', height: '80px', fontSize: '20px' }} active onClick={handleCreateprojectClick}>
                Create Project
              </Button>}
              {user.role === "teamlead" && <Button appearance="primary" style={{ color: 'bisque', backgroundColor: '#00684A', marginLeft: '1rem', marginBottom: '10px', height: '80px', fontSize: '20px' }} active onClick={handleCreateprojectClick}>
                Create Project
              </Button>}
              <Button appearance="primary" style={{ color: 'bisque', backgroundColor: '#00684A', marginLeft: '1rem', marginBottom: '10px', height: '80px', fontSize: '20px' }} active onClick={handleKalenderClick}>
                Calendar
              </Button>

            </ButtonGroup>
          </div>

          <div className='logoutbttn' style={{ flex: '0 0 auto', display: 'flex', justifyContent: 'center', padding: '10px' }}>
            <Button appearance="primary" style={{ color: 'bisque', backgroundColor: '#00684A', marginLeft: '1rem' }} active onClick={logout}>
              Log out <IconLogout className='checkout' size={20} />
            </Button>
          </div>

        </div>
      </Drawer>
      <Modal open={open} backdrop={true} onClose={handleClose} className='positionAdd'>
        {showAddemployee && (
          <Addemployee />
        )
        }
        {showCreateproject && (
          <Createproject />
        )}
        {showKalender && (
          <Kalender />
        )}
      </Modal>
    </>
  );
};

export default Drawermenue 