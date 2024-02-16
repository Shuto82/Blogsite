import React, { useState } from 'react';
import RichTextEditor from 'react-rte';
import './TextEditor.css'

export const TextEditor = ({story,setStory}) => {
  const [value, setValue] = useState( RichTextEditor.createValueFromString(story, 'html') );
  
  const onChange = (value) => {
    setValue(value);
    setStory(value.toString('html'))
  };
console.log(value.toString('html'));
console.log(story,value);

  return <RichTextEditor value={value} onChange={onChange} />;
};