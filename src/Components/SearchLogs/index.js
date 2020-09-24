import React from 'react';
import axios from "axios";
import DateTimePicker from 'react-datetime-picker';
import Graph from "./Graph";
import Table from "./Table";
import Button from "../Button";
import Header from "../Header";
import { nameHook } from '../../HelperFunctions/helperFunctions';
const SearchLogs = () => {

    const [names, loading] = nameHook();
    const [searchNames, setSearchNames] = React.useState([]);
    const [start, setStart] = React.useState(new Date());
    const [end, setEnd] = React.useState(new Date());
    const [data, setData] = React.useState(null);
    const [viewGraph, setViewGraph] = React.useState(false);

    React.useEffect(() => {
        const getData = async () => {
            let { data } = await axios.get(`http://localhost:8080/getData?start=${start.toISOString()}&end=${end.toISOString()}&names=${searchNames.join(",")}`)
            setData(data);
        }
        if (start != null && end != null && searchNames.length > 0)
            getData();
    }, [end, start, searchNames]);


    const handleSelectClick = ({ target: { value } }) => {
        if (searchNames.includes(value))
            setSearchNames(searchNames.filter(x => x !== value));
        else
            setSearchNames([...searchNames, value])
    }

    return (
        <div style={{ fontFamily: 'Roboto, sans-serif' }}>
            <Header isServer={false} />
            <div style ={{paddingTop:"45px"}}>
                <DateTimePicker onChange={setStart} value={start} />
                <DateTimePicker onChange={setEnd} value={end} />

                <select multiple onClick={handleSelectClick} value={searchNames} style={{ width: "15em", height:"13em" }}>
                    {loading ? <option>Loading</option> : names.map(x => <option value={x}>{x}</option>)}
                </select>
                <div style={{ width: "5em" }}>
                    <Button onClick={() => setViewGraph(!viewGraph)} color='Blue' content="Toggle Graph and List" />
                </div>
                {data != null && !viewGraph ? <Table data={data.sort(({ type: a }, { type: b }) => a - b)} /> : <input type="hidden" />}
                {data != null && viewGraph ? <div style={{ width: '90%' }}> <Graph data={data} names={searchNames} /> </div> : <input type="hidden" />}
            </div>
        </div>)
}

export default SearchLogs; 