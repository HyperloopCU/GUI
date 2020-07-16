import React from 'react';

const defaultStyle = {
    'textAlign': 'center',
    'fontFamily': 'Roboto, sans-serif',
    'fontSize': '25px',
    'borderRadius': '5px',
    'boxShadow': '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
    'padding': '1px'
}

const selectedStyle = {
    'background': "#00FF00",
    'fontWeight': '700'
}

const unselectedStyle = {
    'background': "#FFFFFF",
    'fontWeight': '300'
}

//{selected ? { ...defaultStyle, ...selectedStyle } : { ...defaultStyle, ...unselectedStyle }}
const StateCard = ({selected,title,subs}) => {
    return (<div style={defaultStyle}>
        <p style = {selected === null ? selectedStyle:unselectedStyle}>{title}</p>
        {subs.map((sub,i) => {
            return <p style = {selected === i ? selectedStyle:unselectedStyle}>{sub.name}</p>
        })}
    </div>)
}

export default StateCard;
