import React,{ useEffect, useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { getSleep, deleteSleep } from '../services/sleepService';
import { Button } from 'react-bootstrap'

const Manage = () => {
    const [sleep, setSleep] = useState([]);
    const [addModalShow, setAddModalShow] = useState(false);
    const [editModalShow, setEditModalShow] = useState(false);
    const [editSleep, setEditSleep] = useState([]);
    const [isUpdated, setIsUpdated] = useState(false);

    const handleUpdate = (e, stu) => {
        e.preventDefault();
        setEditModalShow(true);
        setEditSleep(stu);
    };

    const handleAdd = (e) => {
        e.preventDefault();
        setAddModalShow(true);
    };

    const handleDelete = (e, studentId) => {
        if(window.confirm('Are you sure ?')){
            e.preventDefault();
            deleteSleep(studentId)
            .then((result)=>{
                alert(result);
                setIsUpdated(true);
            },
            (error)=>{
                alert("Failed to Delete Student");
            })
        }
    };
    
    useEffect(() => {
        let mounted = true;
        if(sleep.length && !isUpdated) {
         return;
         }
        getSleep()
          .then(data => {
            if(mounted) {
              setSleep(data);
            }
          })
        return () => {
           mounted = false;
           setIsUpdated(false);
        }
      }, [isUpdated, sleep])


    let AddModelClose=()=>setAddModalShow(false);
    let EditModelClose=()=>setEditModalShow(false);

    return(
    <div className="container-fluid side-container">
    <div className="row side-row" >
    <p id="manage"></p>
            <thead>
            <tr>
              <th >ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Registration No</th>
              <th>Email</th>
              <th>Course</th>
              <th>Action</th>
            </tr>
            </thead>
            <tbody>
              { sleep.map((stu) =>

              <tr key={stu.id}>
              <td>{stu.studentId}</td>
              <td>{stu.FirstName}</td>
              <td>{stu.LastName}</td>
              <td>{stu.RegistrationNo}</td>
              <td>{stu.Email}</td>
              <td>{stu.Course}</td>
              <td>

              <Button className="mr-2" variant="danger"
                onClick={event => handleDelete(event,stu.studentId)}>
                    <RiDeleteBin5Line />
              </Button>
              <span>&nbsp;&nbsp;&nbsp;</span>
              <Button className="mr-2"
                onClick={event => handleUpdate(event,stu)}>
                    <FaEdit />
              </Button>
            </td>
            </tr>)}
          </tbody>
            <Button variant="primary" onClick={handleAdd}>
            Add Student
            </Button>
    </div>
    </div>
);

};


export default Manage;