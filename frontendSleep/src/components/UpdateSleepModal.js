import React, { useState } from 'react';
import {Modal, Form, Button} from 'react-bootstrap';
import {FormGroup} from 'react-bootstrap';
import { updateSleep } from '../services/sleepService';
import { DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';


const UpdateSleepModal = (props) => {
    const [start, setStart] = useState(dayjs(props.sleep.start));
    const [end, setEnd] = useState(dayjs(props.sleep.end));
    const handleSubmit = (e) => {
        e.preventDefault();
        updateSleep(props.sleep.sleepId, {start: start, end: end})
        .then((result)=>{
            props.setupdated(true);
        },
        (error)=>{
            alert(error);
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
            <div style={{ justifyContent:'center', alignItems:'center', display:"flex", flexDirection: "row" }}>
                                <FormGroup controlId="start">
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DateTimePicker label="Start Time"  defaultValue={dayjs(props.sleep.start)} onChange={(newvalue) => setStart(newvalue)}/>
                                </LocalizationProvider>
                            </FormGroup>
                            <FormGroup controlId="end">
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateTimePicker label="End Time" defaultValue={dayjs(props.sleep.end)} onChange={(newvalue) => setEnd(newvalue)}/>
                            </LocalizationProvider>
                            </FormGroup>
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
}
export default UpdateSleepModal;