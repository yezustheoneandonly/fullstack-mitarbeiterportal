import { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form';
import { Input, Form, DatePicker, Button, CheckPicker } from 'rsuite'
import { AuthService } from '../api/api.js';
import 'rsuite/dist/rsuite.css';
import '../styles/addEmployee.css'
import { ProjectService } from '../api/api.js';


const Createproject = () => {
  const { control, handleSubmit, formState: { errors } } = useForm();

  const ProjectInstance = new ProjectService();

  const UserInstance = new AuthService();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    UserInstance.getAllUser().then(data => setUsers(data)).catch(error => console.log(error));
  }, []);


  const memberData = users.map(
    item => ({ label: `${item.firstName} ${item.lastName}`, value: item._id })
  );


  const onSubmit = (data) => {
    const updatedMembers = data.members.map(member => ({ userId: member }));
    data.members = updatedMembers;
    try {
      ProjectInstance.createProject(data)
        .then((response) => { console.log(response); })
        .then(window.location.reload())
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <Form className='addEm' onSubmit={handleSubmit(onSubmit)}>
      <h2 style={{ marginBottom: '20px' }}>Create Project</h2>
      <Controller
        name="name"
        control={control}
        defaultValue=""
        rules={{ required: true }}
        render={({ field }) => (
          <Input {...field} placeholder="Projectname" style={{ marginBottom: '10px' }} />
        )}
      />
      {errors.projectname && <p>Projectname is required</p>}

      <Controller
        name="description"
        control={control}
        defaultValue=""
        rules={{ required: true }}
        render={({ field }) => (
          <Input {...field} as="textarea" rows={4} placeholder="Description" style={{ marginBottom: '10px' }} />
        )}
      />
      {errors.description && <p>Description is required</p>}

      <Controller
        name="deadline"
        control={control}
        defaultValue=""
        rules={{ required: true }}
        render={({ field }) => (
          <DatePicker {...field} placeholder="Deadline" style={{ marginBottom: '10px', }} value={field.value ? new Date(field.value) : null}
            onChange={(date) => field.onChange(date)} />
        )}
      />
      {errors.deadline && <p>Deadline is required</p>}

      <Controller
        name="members"
        control={control}
        defaultValue={[]}
        render={({ field }) => (
          <CheckPicker
            {...field}
            data={memberData}
            style={{ width: 224 }}
            virtualized
          />
        )}
      />

      <Button appearance="primary" type="submit" style={{ color: 'bisque', backgroundColor: '#00684A', marginTop: '1rem' }}>
        Submit
      </Button>
    </Form>
  );
};

export default Createproject;