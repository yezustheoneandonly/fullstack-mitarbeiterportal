import { Calendar } from 'rsuite';
import 'rsuite/dist/rsuite.css';
import '../styles/calendar.css'
import { AuthService, ProjectService } from '../api/api.js';
import { useEffect, useState } from 'react';


const Kalender = () => {

  // ################User Birthdays################
  const UserInstance = new AuthService();
  const [users, setUsers] = useState([]);


  useEffect(() => {
    UserInstance.getAllUser().then(data => setUsers(data)).catch(error => console.log(error));
  }, []);


  function getBirthdayList(date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const birthdays = [];

    users.forEach(user => {
      const userBirthday = new Date(user.birthday);
      const userDay = userBirthday.getDate();
      const userMonth = userBirthday.getMonth() + 1;

      if (userDay === day && userMonth === month) {
        birthdays.push({
          time: 'All day',
          title: `${user.firstName} ${user.lastName}'s Birthday`
        });
      }
    });

    return birthdays;
  }

  // ###############Deadlines####################
  const ProjectInstance = new ProjectService();
  const [projects, setProjects] = useState([]);


  useEffect(() => {
    ProjectInstance.getAllProject().then(data => { setProjects(data) }).catch(error => console.log(error));
  }, []);

  function getDeadlineList(date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const deadlines = [];

    projects.forEach(project => {
      const projectDeadline = new Date(project.deadline);
      const projectDay = projectDeadline.getDate();
      const projectMonth = projectDeadline.getMonth() + 1;

      if (projectDay === day && projectMonth === month) {
        deadlines.push({
          title: `${project.name}'s Deadline`
        });
      }
    });

    return deadlines;
  }


  // #######################################



  function renderCell(date) {
    const birthdayList = getBirthdayList(date);
    const deadlineList = getDeadlineList(date);

    if (birthdayList.length) {
      return (
        <div className="kalender__cell">
          {
            birthdayList.map((birthday, index) => (
              <p style={{ fontSize: "0.7rem" }} key={index}>{birthday.title}</p>
            ))
          }
        </div>
      );
    } else if (deadlineList.length) {
      return (
        <div>
          {
            deadlineList.map((deadline, index) => (
              <p style={{ fontSize: "0.7rem" }} key={index}>{deadline.title}</p>
            ))
          }
        </div>
      );
    }

    return null;
  }



  return <Calendar bordered renderCell={renderCell} />;
};

export default Kalender