import React from "react";
import { ReactComponent as ReactLogoServer } from './server.svg';
import { Link } from "react-router-dom";


const styles = {
    nav: {
        border: "1px solid black",
        backgroundColor: "#1e1e1c",
        color: "#ffffff",
        display: "flex",
        width: "100%",
        fontFamily: 'Roboto, sans-serif',

    },
    ol: {
        display: "flex",
        flexDirection: "row",
        listStyleType: "none",
        flexWrap: "nowrap",
        flexGrow: "1",
    },
    item: {
        paddingRight: "5px",
        paddingLeft: "5px"
    },
    itemCenter: {
        flex: "1",
        textAlign: "center"
    },
    itemRight: {
        margin: "auto",
        paddingRight: "1em",
        display: "block"
    }

}

const Header = ({ children, isServer }) => {

    if (children == null)
        children = [<img src={process.env.PUBLIC_URL + '/resources/logo.png'} alt="Cooper Union Hyperloop" width="45em" />];

    return (
        <nav style={styles.nav} className="navbar">
            <ol style={styles.ol}>
                {children.map(x => <li style={styles.item} >{x}</li>)}
                <li style={styles.itemCenter} ><p>Hyperloop GUI</p></li>
                <li style={styles.itemRight}>{isServer ? <Link to="/searchLogs"><ReactLogoServer height="30" /> </Link> : <Link to="/"><img src = {process.env.PUBLIC_URL + '/resources/train.png'} width="30"/></Link>}</li>
            </ol>

        </nav>



    )
}


export default Header; 