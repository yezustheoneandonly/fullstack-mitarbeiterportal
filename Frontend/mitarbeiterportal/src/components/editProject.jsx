
import { useForm, Controller } from 'react-hook-form';
import { Input, Form, DatePicker, Button, CheckPicker } from 'rsuite'

import { ProjectService } from '../api/api.js';
import 'rsuite/dist/rsuite.css';
import '../styles/addEmployee.css'



const Editproject = ({ project, users }) => {

  const ProjectInstance = new ProjectService();
  const { control, handleSubmit, formState: { errors } } = useForm();

  const memberData = users.map(
    item => ({ label: `${item.firstName} ${item.lastName}`, value: item._id })
  );

  const defaultValues = project.members.map(member => member.userId.toString());

  const onSubmit = async (data) => {
    const updatedMembers = data.members.map(member => ({ userId: member }));
    data.members = updatedMembers;
    data._id = project._id;
    try {
      await ProjectInstance.updateProject(data)
        .then(
          window.location.reload()
        )
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <Form className='addEm' onSubmit={handleSubmit(onSubmit)}>
      <h2 style={{ marginBottom: '20px' }}>Edit Project</h2>
      <Controller
        name="name"
        control={control}
        defaultValue={project.name}
        rules={{ required: true }}
        render={({ field }) => (
          <Input {...field} placeholder="Projectname" style={{ marginBottom: '10px' }} />
        )}
      />
      {errors.projectname && <p>Projectname is required</p>}

      <Controller
        name="description"

        control={control}
        defaultValue={project.description}
        rules={{ required: true }}
        render={({ field }) => (
          <Input {...field} as="textarea" rows={4} placeholder="Description" style={{ marginBottom: '10px' }} />
        )}
      />
      {errors.description && <p>Description is required</p>}

      <Controller
        name="deadline"
        control={control}
        defaultValue={project.deadline}
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
        defaultValue={defaultValues}
        render={({ field }) => (
          <CheckPicker
            {...field}
            data={memberData}
            style={{ width: 224 }}
            virtualized
            checked={memberData.map(option => field.value.some(member => member.value === option.value))}
          />
        )}
      />


      <Button appearance="primary" type="submit" style={{ color: 'bisque', backgroundColor: '#00684A', marginTop: '1rem' }}>
        Submit
      </Button>
    </Form>
  );
};

export default Editproject;