import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form';
import { Input, Form, DatePicker, Button, Dropdown } from 'rsuite'
import { AuthService } from '../api/api.js';
import 'rsuite/dist/rsuite.css';
import '../styles/addEmployee.css'

const Addemployee = () => {
  const { control, handleSubmit, formState: { errors } } = useForm();
  const [selectedRole, setSelectedRole] = useState('');

  const AuthInstance = new AuthService();


  const onSubmit = async (data) => {

    data = {
      ...data,
      contact: {
        street: data.street,
        city: data.city,
        country: data.country,
        postalCode: data.postalCode,
        phone: data.phone
      }
    };
    delete data.street;
    delete data.city;
    delete data.country;
    delete data.postalCode;
    delete data.phone;

    try {
      const result = await AuthInstance.addUser(data)
      console.log(result);
    } catch (error) {
      console.log(error);
    }


    console.log(data);
  };



  return (
    <Form className='addEm' onSubmit={handleSubmit(onSubmit)}>
      <h2 style={{ marginBottom: '20px' }}>Add Employee</h2>



      <Controller
        name="firstName"
        control={control}
        defaultValue=""
        rules={{ required: true }}
        render={({ field }) => (
          <Input {...field} placeholder="First Name" style={{ marginBottom: '10px' }} />
        )}
      />
      {errors.firstName && <p>First Name is required</p>}

      <Controller
        name="lastName"
        control={control}
        defaultValue=""
        rules={{ required: true }}
        render={({ field }) => (
          <Input {...field} placeholder="Last Name" style={{ marginBottom: '10px' }} />
        )}
      />
      {errors.lastName && <p>Last Name is required</p>}


      <Controller
        name="birthday"
        control={control}
        defaultValue=""
        rules={{ required: true }}
        render={({ field }) => (
          <DatePicker {...field} placeholder="Birthday" style={{ marginBottom: '10px', minWidth: '100%' }} value={field.value ? new Date(field.value) : null}
            onChange={(date) => field.onChange(date)} />
        )}
      />
      {errors.birthday && <p>Birthday is required</p>}

      <Controller
        name="email"
        control={control}
        defaultValue=""
        rules={{ required: true }}
        render={({ field }) => (
          <Input {...field} placeholder="Email" style={{ marginBottom: '10px' }} />
        )}
      />
      {errors.email && <p>Email is required</p>}

      <Controller
        name="street"
        control={control}
        defaultValue=""
        rules={{ required: true }}
        render={({ field }) => (
          <Input {...field} placeholder="Street" style={{ marginBottom: '10px' }} />
        )}
      />
      {errors.street && <p>Street is required</p>}

      <Controller
        name="city"
        control={control}
        defaultValue=""
        rules={{ required: true }}
        render={({ field }) => (
          <Input {...field} placeholder="City" style={{ marginBottom: '10px' }} />
        )}
      />
      {errors.city && <p>City is required</p>}

      <Controller
        name="country"
        control={control}
        defaultValue=""
        rules={{ required: true }}
        render={({ field }) => (
          <Input {...field} placeholder="Country" style={{ marginBottom: '10px' }} />
        )}
      />
      {errors.country && <p>Country is required</p>}

      <Controller
        name="postalCode"
        control={control}
        defaultValue=""
        rules={{ required: true }}
        render={({ field }) => (
          <Input {...field} placeholder="Zip Code" style={{ marginBottom: '10px' }} />
        )}
      />
      {errors.zipCode && <p>Zip Code is required</p>}

      <Controller
        name="phone"
        control={control}
        defaultValue=""
        rules={{ required: true }}
        render={({ field }) => (
          <Input {...field} placeholder="Phone" style={{ marginBottom: '10px' }} />
        )}
      />
      {errors.phone && <p>Phone is required</p>}

      <Controller
        name="role"
        control={control}
        defaultValue=""
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
            <Dropdown.Item eventKey="admin">Admin</Dropdown.Item>
            <Dropdown.Item eventKey="teamlead">Teamlead</Dropdown.Item>
            <Dropdown.Item eventKey="employee">Employee</Dropdown.Item>
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

export default Addemployee;