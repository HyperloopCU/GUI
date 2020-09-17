import React from 'react';
import DateTimePicker from 'react-datetime-picker';
import { nameHook } from '../../HelperFunctions/helperFunctions';
import axios from "axios"; 
const SearchLogs = () => {

    const [names, loading] = nameHook();
    const [searchNames, setSearchNames] = React.useState([]);
    const [start, setStart] = React.useState(new Date());
    const [end, setEnd] = React.useState(new Date());
    const [data, setData] = React.useState(null); 

    React.useEffect(() => {
        const getData = async ()=>{
            let {data} = await axios.get(`http://localhost:8080/getData?start=${start.toISOString()}&end=${end.toISOString()}&names=${searchNames.join(",")}`)
            setData(data); 
        }
        getData(); 
    }, [end, start, searchNames]);


    const handleSelectClick = ({target:{value}}) => {
        if (searchNames.includes(value))
            setSearchNames(searchNames.filter(x => x !== value));
        else
            setSearchNames([...searchNames, value])
    }

    return (
        <div>
            <DateTimePicker onChange={setStart} value ={start} />
            <DateTimePicker onChange={setEnd} value ={end} />

            <select multiple onClick={handleSelectClick} value={searchNames}>
                {loading ? <option>Loading</option> : names.map(x => <option value={x}>{x}</option>)}
            </select>
            {data != null ? data.map(x=><p>name : {x.type} value : {x.data} </p>) : <input type ="hidden" />}
        </div>)
}

export default SearchLogs; 