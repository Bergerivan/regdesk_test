import RefreshButton from "./RefreshButton";
import React, {useEffect, useState} from "react";
import {Chart as ChartJS, Legend, LinearScale, PointElement, Tooltip} from "chart.js";
import {Bubble} from "react-chartjs-2";
import {useDispatch, useSelector} from "react-redux";
import {fetchWidgetData} from "./reducer";
import {ProgressBar} from "react-bootstrap";

const Widget5 = React.forwardRef((props, ref) => {

    const widgetId = 5;

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

    ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

    const options = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
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
        datasets: [
            {
                label: `Dataset ${widgetId}`,
                data: widget.data,
                backgroundColor: 'rgba(255,116,2,0.5)',
            }
        ],
    };

    return <div className={'box w-100 h-100'} {...props} ref={ref} >
        <RefreshButton onClick={()=>{onRefreshButtonClick(props)}} />
        <ProgressBar now={progress} min={0} max={timeout} animated={false}/>
        <Bubble options={options} data={data} />
    </div>
})

export default Widget5;