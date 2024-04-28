import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form';
import { Input, Form, DatePicker, Button, Dropdown } from 'rsuite'
import { AuthService } from '../api/api.js';
import 'rsuite/dist/rsuite.css';
import '../styles/addEmployee.css'

const Editemployee = ({ user }) => {
  const { control, handleSubmit, formState: { errors } } = useForm();
  const [selectedRole, setSelectedRole] = useState('');

  const AuthInstance = new AuthService();

  const onSubmit = async (data) => {
    data._id = user._id;
    try {
      await AuthInstance.updateUser(data)
        .then(() => window.location.reload())
    } catch (error) {
      console.log(error);
    }
  };



  return (
    <Form className='addEm' onSubmit={handleSubmit(onSubmit)}>
      <h2 style={{ marginBottom: '20px' }}>Edit Employee</h2>
      <Controller
        name="firstName"
        control={control}
        defaultValue={user.firstName}
        rules={{ required: true }}
        render={({ field }) => (
          <Input {...field} placeholder="First Name" style={{ marginBottom: '10px' }} />
        )}
      />
      {errors.firstName && <p>First Name is required</p>}

      <Controller
        name="lastName"
        control={control}
        defaultValue={user.lastName}
        rules={{ required: true }}
        render={({ field }) => (
          <Input {...field} placeholder="Last Name" style={{ marginBottom: '10px' }} />
        )}
      />
      {errors.lastName && <p>Last Name is required</p>}

      <Controller
        name="birthday"
        control={control}
        defaultValue={user.birthday}
        rules={{ required: true }}
        render={({ field }) => (
          <DatePicker {...field} placeholder="Birthday" style={{ marginBottom: '10px', }} value={field.value ? new Date(field.value) : null}
            onChange={(date) => field.onChange(date)} />
        )}
      />
      {errors.birthday && <p>Birthday is required</p>}

      <Controller
        name="email"
        control={control}
        defaultValue={user.email}
        rules={{ required: true }}
        render={({ field }) => (
          <Input {...field} placeholder="Email" style={{ marginBottom: '10px' }} />
        )}
      />
      {errors.email && <p>Email is required</p>}

      <Controller
        name="street"
        control={control}
        defaultValue={user.contact.street}
        rules={{ required: true }}
        render={({ field }) => (
          <Input {...field} placeholder="Street" style={{ marginBottom: '10px' }} />
        )}
      />
      {errors.street && <p>Street is required</p>}

      <Controller
        name="city"
        control={control}
        defaultValue={user.contact.city}
        rules={{ required: true }}
        render={({ field }) => (
          <Input {...field} placeholder="City" style={{ marginBottom: '10px' }} />
        )}
      />
      {errors.city && <p>City is required</p>}

      <Controller
        name="country"
        control={control}
        defaultValue={user.contact.country}
        rules={{ required: true }}
        render={({ field }) => (
          <Input {...field} placeholder="Country" style={{ marginBottom: '10px' }} />
        )}
      />
      {errors.country && <p>Country is required</p>}

      <Controller
        name="postalCode"
        control={control}
        defaultValue={user.contact.postalCode}
        rules={{ required: true }}
        render={({ field }) => (
          <Input {...field} placeholder="Zip Code" style={{ marginBottom: '10px' }} />
        )}
      />
      {errors.zipCode && <p>Zip Code is required</p>}

      <Controller
        name="phone"
        control={control}
        defaultValue={user.contact.phone}
        rules={{ required: true }}
        render={({ field }) => (
          <Input {...field} placeholder="Phone" style={{ marginBottom: '10px' }} />
        )}
      />
      {errors.phone && <p>Phone is required</p>}

      <Controller
        name="password"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <Input {...field} placeholder="Password" style={{ marginBottom: '10px' }} />
        )}
      />
      {errors.password && <p>First Name is required</p>}

      <Controller
        name="role"
        control={control}
        defaultValue={user.role}
        rules={{ required: true }}
        render={({ field }) => (
          <Dropdown
            {...field}
            title={selectedRole || "Select Role"}
            onSelect={(eventKey) => {
              setSelectedRole(eventKey);
              field.onChange(eventKey);
            }}
          >
            <Dropdown.Item eventKey="Admin">Admin</Dropdown.Item>
            <Dropdown.Item eventKey="Teamlead">Teamlead</Dropdown.Item>
            <Dropdown.Item eventKey="Employee">Employee</Dropdown.Item>
          </Dropdown>
        )}
      />
      {errors.role && <p>Role is required</p>}

      <Button appearance="primary" type="submit" style={{ color: 'bisque', backgroundColor: '#00684A', marginTop: '1rem' }}>
        Submit
      </Button>
    </Form>
  );
};

export default Editemployee;