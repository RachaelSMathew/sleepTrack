// EditableTextItem.js taken from https://medium.com/@zahidbashirkhan/implementing-double-click-to-edit-text-in-react-2e1d4bcb2493
import React, { useState, useEffect, useRef } from 'react';
import { updateDream } from '../services/dreamServices';
import TextField from '@mui/material/TextField';

const EditableTextItem = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(props.dream.dreamThing );
  const inputRef = useRef(null);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleChange = (event) => {
    setText(event.target.value);
  };

  //update dream thing after user clicks away from text field 
  const handleBlur = () => {
    setIsEditing(false);
    updateDream(props.dream.dreamId, {dreamDate: props.dream.dreamDate, dreamThing: text, dreamType: props.dream.dreamType})
        .then((result)=>{
            props.setUpdated(true);
        },
        (error)=>{
            alert(error);
        })
  };

  // Focus the input field when editing starts
  useEffect(() => {
    if (isEditing) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  return (
    <div onDoubleClick={handleDoubleClick}>
      {isEditing ? (
        <TextField
          label="Update Dream"
          multiline
          rows={4}
          type="text"
          value={text}
          onChange={handleChange}
          onBlur={handleBlur}
          ref={inputRef}
        />
      ) : (
        <span>{text}</span>
      )}
    </div>
  );
};

export default EditableTextItem;