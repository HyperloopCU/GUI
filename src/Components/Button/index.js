import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { default as Btn } from "@material-ui/core/Button";


const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
        borderRadius: "5em",
        color: ({ color }) => color,
        minHeight: "112px",
        width: "200%",
        fontSize:"150%"
    },
    input: {
        display: 'none',
    },
}));

const Button = ({ onClick, color, content }) => {
    const classes = useStyles({ color });
    return (
        <Btn variant="outlined" color="Default" className={classes.button} onClick={onClick}> {content} </Btn>
    )


};

export default Button;

/*

<div onClick={onClick}>
        <svg height="250" width="250">
            <defs>
                <filter id="f4" x="-40%" y="-40%" width="200%" height="200%">
                    <feOffset result="offOut" in="SourceGraphic" dx="20" dy="20" />
                    <feColorMatrix result="matrixOut" in="offOut" type="matrix"
                        values="0.2 0 0 0 0 0 0.2 0 0 0 0 0 0.2 0 0 0 0 0 1 0" />
                    <feGaussianBlur result="blurOut" in="matrixOut" stdDeviation="10" />
                    <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
                </filter>
            </defs>
            <circle cx="50%" cy="50%" r="33%" stroke="black" stroke-width="3" fill={color} filter="url(#f4)" />
            <text x="50%" y="50%" fill="white" stroke-width="3" text-anchor="middle" font-size="150%" dy="5">{content}</text>
  Sorry, your browser does not support inline SVG.
        </svg>

    </div>


*/
