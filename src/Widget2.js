import RefreshButton from "./RefreshButton";
import React, {useEffect, useState} from "react";
import {CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip, PointElement, LineElement} from "chart.js";
import {Line} from "react-chartjs-2";
import {useDispatch, useSelector} from "react-redux";
import {fetchWidgetData} from "./reducer";
import {ProgressBar} from "react-bootstrap";

const Widget2 = React.forwardRef((props, ref) => {

    const widgetId = 2;

    const dispatch = useDispatch();
    const widget = useSelector((state) => state.widgets[`widget_${widgetId}`]);

    const timeout = 3000;
    const step = 50;
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        dispatch(fetchWidgetData(widgetId));

        const interval = setInterval(() => {
            setProgress(progress=>{
                const newProgress = progress + step;
                if (newProgress > timeout) {
                    dispatch(fetchWidgetData(widgetId));
                    return 0;
                }
                return newProgress;
            });
        }, step);
        return () => clearInterval(interval);
    }, []);

    const onRefreshButtonClick = (item) => {
        console.log(item);
        dispatch(fetchWidgetData(widgetId));
    };

    ChartJS.register(CategoryScale, LinearScale, Title, Tooltip, Legend, PointElement, LineElement);

    const options = {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: `Widget ${widgetId}`,
            },
        },
    };

    const data = {
        labels: widget.labels,
        datasets: [
            {
                label: 'Dataset 2',
                data: widget.data,
                backgroundColor: 'rgba(19,2,255,0.5)',
                borderColor: 'rgb(19,2,255)',
                pointStyle: 'circle',
                pointRadius: 10,
                pointHoverRadius: 15
            }
        ],
    };

    return <div className={'box w-100 h-100'} {...props} ref={ref} >
        <RefreshButton onClick={()=>{onRefreshButtonClick(props)}} />
        <ProgressBar now={progress} min={0} max={timeout} animated={false}/>
        <Line options={options} data={data} />
    </div>
})

export default Widget2;