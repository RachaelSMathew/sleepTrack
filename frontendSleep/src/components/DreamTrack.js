import "../App.css";
import dayjs from "dayjs";
import React, { useEffect, useState } from 'react';
import { RiDeleteBin5Line } from 'react-icons/ri';
import EditableTextItem from './EditableTextItem';
import AddDreamModal from "./AddDreamModal";
import { Button } from 'react-bootstrap'
import Table from 'react-bootstrap/Table';
import  'bootstrap/dist/css/bootstrap.css';
import { getDream, deleteDreams } from '../services/dreamServices';
import DoughnutChart from "../components/DoughnutChart";

const DreamTrack = () => {
  const [addModalShow, setAddModalShow] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const [dreams, setDreams] = useState([]);

  let colorWheel = ["#A3E4D7", "#5DADE2","#73C6B6", "#DAF7A6", "#FCF3CF", "#F5CBA7"]
  const [data, setData] = useState({
    labels: [
    ],
    datasets: [{
      backgroundColor: ["#A3E4D7", "#5DADE2","#73C6B6", "#DAF7A6", "#FCF3CF", "#F5CBA7"],
      data: [],
    }]
  });
 

  const handleAdd = (e) => {
    e.preventDefault();
    setAddModalShow(true);
  };
  let AddModelClose=()=>setAddModalShow(false);
  const handleDelete = (e, dreamId) => {
    if(window.confirm('Are you sure?')){
        setDreams(dreams => {
            return dreams.filter(item => item.dreamId !== dreamId)
          })
        deleteDreams(dreamId)
        .then((result)=>{
            setIsUpdated(true)
        },
        (error)=>{
            alert("Failed to Delete Student");
        })
    }
  };
  //update the doughnut graph 
  const updateD = (dreams) => {
    let stringLabels = "";
    let mapData = new Map();
    for(let d of dreams) {
      console.log(d);
      stringLabels = stringLabels.concat("," + d.dreamType);
    }
    let stringArr = stringLabels.split(/,| /);
    for(let a of stringArr) {
      if(mapData.has(a)) {
        mapData.set(a, mapData.get(a)+1);
      } else {
        mapData.set(a, 1);
      }
    }
    mapData.delete("")
    let newLabels = Array.from(mapData.keys());
    let newData = Array.from(mapData.values());
    setData({
      labels: [...newLabels],
      datasets: [
          {
            ...data.datasets,
            data: newData,
          }
      ]
    })
  }
  useEffect(() => {
    let mounted = true;
    if(dreams.length && !isUpdated) {
      return;
    }
    getDream()
      .then(data => {
        if(mounted) {
          setDreams(data);
          updateD(data);
        }
      })
    return () => {
      mounted = false;
      setIsUpdated(false);
    }
  }, [isUpdated, dreams])

  return (
    <>
    <div class="container">
    <div class="row">
    <div class="col-sm"  style={{overflow:"auto"}}>
      <Table striped hover="dark" style={{marginTop: 2 + 'em'}} >
        <thead>
          <tr>
          <th scope="col" >Date</th>
          <th scope="col" >Dream Mood</th>
          <th scope="col">Dream Events</th>
          </tr>
        </thead>
        <tbody>
      {dreams.map((stu) =>
          <tr key={stu.dreamId}>
            <th scope="row">{dayjs(stu.dreamDate).format('MMM D')}</th>
            <td>{(stu.dreamType.split(/,| /)).map((sub) =>
                sub == "" || sub == " " ?
                null : 
                <div style={{borderRadius: 60, fontSize: 1+"em", padding: 10, background: colorWheel[Math.floor(Math.random()*6)], display:"inline-block", marginRight: .3+"em", marginTop:.2+"em"}}>{sub} </div>
                )}
              </td>
            <td style={{whiteSpace: "nowrap"}}><EditableTextItem dream = {stu} setUpdated={setIsUpdated} /></td>
            <td>
              <Button variant="warning" 
                onClick={event => handleDelete(event,stu.dreamId)}>
                <RiDeleteBin5Line />
              </Button>
            </td>
          </tr>
        )}
        </tbody>
      </Table>
      <Button variant="info" onClick={handleAdd}>Add A Dream</Button>
      <AddDreamModal 
      show={addModalShow} 
      setupdated={setIsUpdated} 
      onHide={AddModelClose}>
      </AddDreamModal>
    </div>
      <div class="col-sm" style={{marginTop: 3+"em"}}>
        <DoughnutChart chartData={data} />
      </div>
    </div>
    </div>
    </>
  );
};
 
 export default DreamTrack;
