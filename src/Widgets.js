import React from "react";
import Widget1 from "./Widget1";
import Widget2 from "./Widget2";
import Widget3 from "./Widget3";
import Widget4 from "./Widget4";
import Widget5 from "./Widget5";
import {Responsive, WidthProvider} from "react-grid-layout";
import {useSelector} from "react-redux";

const ReactGridLayout = WidthProvider(Responsive);

const Widgets = () => {

    const enabled1 = useSelector((state) => state.widgets.widget_1.enabled);
    const enabled2 = useSelector((state) => state.widgets.widget_2.enabled);
    const enabled3 = useSelector((state) => state.widgets.widget_3.enabled);
    const enabled4 = useSelector((state) => state.widgets.widget_4.enabled);
    const enabled5 = useSelector((state) => state.widgets.widget_5.enabled);

    const onLayoutChange = (layout) => {
        // console.log('layout', layout)
    };

    return <ReactGridLayout cols={{lg: 12, md: 10, sm: 6, xs: 4, xxs: 2}} isBounded={true} onLayoutChange={onLayoutChange}>
        {enabled1 && <div key={'widget_1'} data-grid={{i: 'widget_1', x: 0, y: 0, w: 4, h: 2}}><Widget1 /></div>}
        {enabled2 && <div key={'widget_2'} data-grid={{i: 'widget_2', x: 4, y: 0, w: 4, h: 2}}><Widget2 /></div>}
        {enabled3 && <div key={'widget_3'} data-grid={{i: 'widget_3', x: 8, y: 0, w: 4, h: 2}}><Widget3 /></div>}
        {enabled4 && <div key={'widget_4'} data-grid={{i: 'widget_4', x: 0, y: 2, w: 3, h: 3}}><Widget4 /></div>}
        {enabled5 && <div key={'widget_5'} data-grid={{i: 'widget_5', x: 3, y: 2, w: 4, h: 2}}><Widget5 /></div>}
    </ReactGridLayout>
};

export default Widgets;