import { useState } from 'react';
import { Popover, Form, Input, InputGroup, Button } from 'rsuite';
import EyeIcon from '@rsuite/icons/legacy/Eye';
import EyeSlashIcon from '@rsuite/icons/legacy/EyeSlash';
import AvatarIcon from '@rsuite/icons/legacy/Avatar';
import { useAuth } from '../context/AuthContext.jsx';

import 'rsuite/dist/rsuite.css';
import '../styles/login.css'


const LogIn = () => {
   const { login } = useAuth();

   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [visible, setVisible] = useState(false);

   const handleChange = () => {
      setVisible(!visible);
   };
   const handleEmailChange = (value) => {
      setEmail(value);
   };
   const handlePasswordChange = (value) => {
      setPassword(value);
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      const user = { email, password };
      try {
         login(user);
      } catch (error) {
         console.log(error)
      }
   };

   return (
      <Form onSubmit={handleSubmit}>
         <Popover className='logInContainer' title="Login" visible>

            <InputGroup className="input-group-margin" >
               <InputGroup.Addon>
                  <AvatarIcon />
               </InputGroup.Addon>
               <Input
                  value={email}
                  onChange={handleEmailChange}
               />
            </InputGroup>


            <InputGroup className="input-group-margin" >
               <Input
                  type={visible ? 'text' : 'password'}
                  value={password}
                  onChange={handlePasswordChange}
               />
               <InputGroup.Button style={{ backgroundColor: 'bisque' }} onClick={handleChange}>
                  {visible ? <EyeIcon /> : <EyeSlashIcon />}
               </InputGroup.Button>
            </InputGroup>



            <Button appearance="primary" style={{ color: 'bisque', backgroundColor: '#00684A', marginLeft: '1rem' }} active onClick={handleSubmit}>
               Login
            </Button>

         </Popover>
      </Form>
   );
};

export default LogIn;