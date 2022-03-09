import React from 'react';
import '../index.css';

export default function Temp(props) {
  return (
    <div className='Temp'>
      <span className='Temp'>{props.Temp}</span>
    </div>
  );
}
