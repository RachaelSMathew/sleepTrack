import React, { useEffect, useState } from 'react';
import "../App.css";
import { FaEdit } from 'react-icons/fa';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { getSleep, deleteSleep } from '../services/sleepService';
import { Button } from 'react-bootstrap'
import AddSleepModal from "./AddSleepModal";
import Table from 'react-bootstrap/Table';
import  'bootstrap/dist/css/bootstrap.css';
import dayjs from "dayjs";
import UpdateSleepModal from "./UpdateSleepModal";
import LineChart from "../components/LineChart";

//taken from https://dev.to/madanlal/how-to-sort-array-of-object-using-object-keys-in-javascript-58f1
function sortDataBy (data, byKey){
  let sortedData;
  if(byKey == 'name'){
    sortedData = data.sort(function(a,b){
      let x = a.name.toLowerCase();
      let y = b.name.toLowerCase();
      if(x>y){return 1;}
      if(x<y){return -1;}
      return 0;
    });
  } else{
    sortedData = data.sort(function(a,b){
      return a.age - b.age;
    })
  }
  return sortedData;
}

const SleepTrack = (props) => {
  const [sleep, setSleep] = useState([]);
  const [addModalShow, setAddModalShow] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);
  const [editSleep, setEditSleep] = useState([]);
  const [isUpdated, setIsUpdated] = useState(false);

  const [data, setData] = useState({
    labels: [],
    datasets: [
        {
          borderColor: [
            '#f6cba7',
          ],
          backgroundColor: [
            '#f6cba7'
          ],
          data: [],
        }
    ]
  })
  const updateS = (data) => {
      let dataN = sortDataBy(data, 'start');
      let nLabels = []
      let nTime = []
      for(let d of dataN){
        let startDate = dayjs(d.start.substring(0, d.start.indexOf("T"))).format('MMM D \'YY')
        nLabels.push(startDate);
        nTime.push(dayjs(d.end).diff(dayjs(d.start), 'hours', true)); 
      }

      setData({
          ...data,
          labels: nLabels,
          datasets: [
              {
                ...data.datasets,
                data: nTime,
              }
          ]
      })
  }
  const handleUpdate = (e, stu) => {
      e.preventDefault();
      setEditModalShow(true);
      setEditSleep(stu);
  };

  const handleAdd = (e) => {
      e.preventDefault();
      setAddModalShow(true);
  };

  const handleDelete = (e, sleepId) => {
      if(window.confirm('Are you sure?')){
          setSleep(sleep => {
              return sleep.filter(item => item.sleepId !== sleepId)
            })
          deleteSleep(sleepId)
          .then((result)=>{
              setIsUpdated(true)
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
          data = data.filter((x) => x.username === props.username)
          console.log(data)
          setSleep(data);
          updateS(data)
        }
      })
    return () => {
      mounted = false;
      setIsUpdated(false);
    }
    }, [isUpdated, sleep])

    let AddModelClose=()=>setAddModalShow(false);
    let EditModelClose=()=>setEditModalShow(false);
    //<div class="row" and div class = "container" used to add margins to components on pages 
   return(
    <div className="container-fluid side-container">
    <div class="container">
    <div class="row"> 
    <div class="col-sm">
    <Table striped hover="dark" style={{marginTop: 2 + 'em'}}>
      <thead>
          <tr>
          <th scope="col">Date</th>
          <th scope="col">Start Time</th>
          <th scope="col">End Time</th>
          </tr>
      </thead>
      <tbody>
          {sleep.map((stu) => 
          <tr key={stu.sleepId}>
            <th scope="row">{dayjs(stu.start.substring(0, stu.start.indexOf("T"))).format('MMM D')}</th>
              <td>{dayjs(stu.start).format('hh:mm a')}</td>
              <td>{dayjs(stu.end).format('hh:mm a')}</td>
              <td>
                <Button 
                  className="btn-warning"
                  onClick={event => handleDelete(event,stu.sleepId)}>
                  <RiDeleteBin5Line />
                </Button>
                <Button className="btn btn-info"
                  style={{marginLeft: 2 + 'em'}}
                  onClick={event => handleUpdate(event,stu)}>
                  <FaEdit />
                </Button>
                <UpdateSleepModal show={editModalShow} sleep={editSleep} setupdated={setIsUpdated}
                  onHide={EditModelClose}>
                </UpdateSleepModal>
                </td>
            </tr>)}
        </tbody>
    </Table>
    <Button className="btn-info" onClick={handleAdd}>Add Sleep</Button>
    <AddSleepModal 
      show={addModalShow} 
      setupdated={setIsUpdated} 
      onHide={AddModelClose}
      username={props.username} >
    </AddSleepModal>
    </div>
    </div>
    <div class="row">
    <div class="col-sm">
    <LineChart chartData={data} />
    </div>
    </div>
    </div>
    </div>
   );
 };
 
 export default SleepTrack;
