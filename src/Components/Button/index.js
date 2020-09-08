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
