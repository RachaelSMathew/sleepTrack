import React, { useState } from 'react';
import {Modal, Button} from 'react-bootstrap';
import {FormGroup} from 'react-bootstrap';
import { addDream } from '../services/dreamServices';
import dayjs from "dayjs";
import TextField from '@mui/material/TextField';
import CloseButton from 'react-bootstrap/CloseButton';


const AddDreamModal = (props) => {
    const [dreamThing, setdreamThing] = useState(null);

    //dream type- emotions a dream gave you(happy, sad, mad, confusing)
    const [text, setText] = useState("Moods of your dream (hit enter)"); //single dream type
    const [dreamType, setDreamType] = useState(''); //whole stirng of all dream type 
  
    function handleChange(e) {
      setText(e.target.value);
    }
  
    function handleSubmitType(e) {
      e.preventDefault();
      if(!dreamType.includes(text)) {
        setDreamType(dreamType+","+text);
      }
      setText("");
    }

    const removeSub = (sub) => {
        setDreamType(dreamType.replace("\"", "").replace(sub, "")); 
    }
    const handleSubmit = () => {
        addDream({dreamDate: dayjs(), dreamType: dreamType, dreamThing: dreamThing})
        .then((result)=>{
            props.setupdated(true);
            setDreamType("")
            setdreamThing(null)
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
            <div className="modal-header border-0"></div>
            <div className="modal-content border-0">
            <div style={{ justifyContent:'center', alignItems:'center', display:"flex", flexDirection: "row" }}>
            <div class="modal-content border-0">
            <div class="modal-header border-0">
                <h5 class="modal-title" id="exampleModalLabel">What dream did you have last night?</h5>
            </div>

      <div class="modal-body">
          <form onSubmit={handleSubmitType}>
            <div style={{flexWrap: "wrap", display: "inline-flex"}}>
                {(dreamType.split(/,| /)).map((sub, index) =>
                sub == "" || sub == " " ?
                null : 
                <div key={index} style={{borderRadius: 60, fontSize: 1.2+"em", padding: 10, background: "#ade185", }}>{sub} <CloseButton onClick={() => removeSub(sub)}/></div>
                )}
                </div>
                <TextField fullWidth 
                style={{marginTop:1+"em"}}
                id="outlined-basic" 
                label="Type of Dream" 
                variant="outlined" 
                value={text}
                onChange={handleChange}
                />
            </form>
          <div class="form-group" style={{ paddingTop: 1 +'em' }}>
            <TextField
                fullWidth
                id="outlined-multiline-static"
                label="Dream Thing"
                multiline
                rows={4}
                onChange={(newvalue) => setdreamThing(newvalue.target.value)}
            />
          </div>
      </div>
            </div>
            </div>
            </div>
            <div className="modal-footer border-0">
            <FormGroup >
            <Button variant="primary" type="submit" onClick={() => {
                if(dreamType != "" && dreamThing != null) { // you can only submit if both fields of modal are filled in 
                    handleSubmit()
                    props.onHide()
                }
            }}>
            Submit
            </Button>
            </FormGroup>
            </div>
            </Modal>
        </div>
    );

};

export default AddDreamModal;