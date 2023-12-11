import React, { useState } from 'react';
import {Modal, Form, Button} from 'react-bootstrap';
import {FormGroup} from 'react-bootstrap';
import { addSleep } from '../services/sleepService';
import { DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';



const AddSleepModal = (props) => {
    const [start, setStart] = useState(null);
    const [end, setEnd] = useState(null);
    const handleSubmit = (e) => {
        e.preventDefault();
        addSleep({start: start, end: end})
        .then((result)=>{
            props.setupdated(true);
            setStart(null)
            setEnd(null)
        },
        (error)=>{
            console.log(error);
        })
    }
    return(
        <div className="container">
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered >
            <Form onSubmit={handleSubmit}>
            <div className="modal-header border-0"></div>
            <div className="modal-content border-0">
            <div style={{ justifyContent:'center', alignItems:'center', display:"flex", flexDirection: "row" }}>
            <FormGroup controlId="start">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker label="Start Time" maxDateTime={end} onChange={(newvalue) => setStart(newvalue)}/>
            </LocalizationProvider>
            </FormGroup>
            <FormGroup controlId="end">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker label="End Time" minDateTime={start} onChange={(newvalue) => setEnd(newvalue)}/>
            </LocalizationProvider>
            </FormGroup>
            </div>
            </div>
            <div className="modal-footer border-0">
            <FormGroup >
            <Button variant="primary" type="submit" onClick={props.onHide}>
            Submit
            </Button>
            </FormGroup>
            </div>
            </Form>
            </Modal>
        </div>
    );

};

export default AddSleepModal;