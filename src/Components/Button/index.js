import React from 'react';

const Button = ({onClick, color, content}) => (<button style = {{color}} onClick = {onClick}> {content} </button>);

export default Button;
