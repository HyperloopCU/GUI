import React from 'react';
import Chart from 'chart.js';

const Graph = ({ data, names }) => {

    const canvas = React.useRef(null);
    const [colorList, setColorList] = React.useState([]);
    const [myChart, setChart] = React.useState(null);

    React.useEffect(() => {
        if (canvas.current == null)
            return false;
        const ctx = canvas.current.getContext("2d");
        let chartData = data.map(({ data, type, createdAt }) => ({ type, data, createdAt: new Date(createdAt) }));
        chartData = chartData.sort(({ createdAt: a }, { createdAt: b }) => a - b);
        const datasets = names.map(name => {
            const oTypeOnly = chartData.filter(({ type }) => type === name);
            const newColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
            if (!colorList.find(({ n }) => n === name))
                setColorList([...colorList, { n: name, color: newColor }]);
            return { data: oTypeOnly.map(({ createdAt, data }) => ({ x: createdAt, y: Number(data) })), label: name, fill: false, borderColor: colorList.find(({ n }) => n === name) ? colorList.find(({ n }) => n === name).color : newColor }
        });
        if (myChart == null) {
            const c = new Chart(ctx, {
                type: "line",
                data: {
                    labels: chartData.map(({ createdAt }) => createdAt.toLocaleString('en-US',{timeZone:'America/New_York'})).filter((x,i,arr)=>arr.indexOf(x) === i),
                    datasets
                },
            });
            setChart(c);
        } else {
            const newChart = myChart; 
            newChart.data.datasets = datasets; 
            newChart.update(); 
            setChart(newChart); 
        }
    }, [canvas, data])

    return (
        <canvas ref={canvas} width="50" height="50" />
    )
}

export default Graph; 