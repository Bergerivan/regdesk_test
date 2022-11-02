import React, {useEffect, useRef, useState} from "react";
import RefreshButton from "./RefreshButton";
import {BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip} from "chart.js";
import {Bar} from "react-chartjs-2";
import {useDispatch, useSelector} from "react-redux";
import {fetchWidgetData} from "./reducer";
import {ProgressBar} from "react-bootstrap";

const Widget1 = React.forwardRef((props, ref) => {

    const widgetId = 1;

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
        dispatch(fetchWidgetData(widgetId));
    };

    ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

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
                label: 'Dataset 1',
                data: widget.data,
                backgroundColor: 'rgba(255,2,56,0.5)',
            }
        ],
    };

    return <div className={'box w-100 h-100'} {...props} ref={ref} >
        <RefreshButton onClick={()=>{onRefreshButtonClick(props)}} />
        <ProgressBar now={progress} min={0} max={timeout} animated={false}/>
        <Bar options={options} data={data} />
    </div>
})

export default Widget1;