import React from 'react';


const Table = ({ data }) => {

    return (
        <table>
            <tr>
                <th>Type</th>
                <th>Data</th>
                <th>Time Stamp</th>
            </tr>
            {data.map(({type,data,createdAt}) => <tr><td>{type}</td><td>{data}</td><td>{new Date(createdAt).toLocaleString('en-US',{timeZone:'America/New_York'})}</td></tr>)}
        </table>
    );
}


export default Table; 