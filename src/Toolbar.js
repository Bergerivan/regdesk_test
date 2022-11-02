import {ButtonToolbar, ToggleButton} from "react-bootstrap";
import React from "react";
import { useSelector, useDispatch } from 'react-redux'
import {toggleWidget} from './reducer'

const Toolbar = () => {

    const dispatch = useDispatch();

    const checked1 = useSelector((state) => state.widgets.widget_1.enabled);
    const checked2 = useSelector((state) => state.widgets.widget_2.enabled);
    const checked3 = useSelector((state) => state.widgets.widget_3.enabled);
    const checked4 = useSelector((state) => state.widgets.widget_4.enabled);
    const checked5 = useSelector((state) => state.widgets.widget_5.enabled);

    return <ButtonToolbar className={'mb-3'}>
        <ToggleButton className="" id={'checked_1'} variant={checked1 ? 'primary' : 'outline-primary'} type="checkbox" checked={checked1} value="1"
                      onChange={(e) => dispatch(toggleWidget(1))}>Widget 1</ToggleButton>
        <ToggleButton className="ms-2" id={'checked_2'} variant={checked2 ? 'primary' : 'outline-primary'} type="checkbox" checked={checked2} value="1"
                      onChange={(e) => dispatch(toggleWidget(2))}>Widget 2</ToggleButton>
        <ToggleButton className="ms-2" id={'checked_3'} variant={checked3 ? 'primary' : 'outline-primary'} type="checkbox" checked={checked3} value="1"
                      onChange={(e) => dispatch(toggleWidget(3))}>Widget 3</ToggleButton>
        <ToggleButton className="ms-2" id={'checked_4'} variant={checked4 ? 'primary' : 'outline-primary'} type="checkbox" checked={checked4} value="1"
                      onChange={(e) => dispatch(toggleWidget(4))}>Widget 4</ToggleButton>
        <ToggleButton className="ms-2" id={'checked_5'} variant={checked5 ? 'primary' : 'outline-primary'} type="checkbox" checked={checked5} value="1"
                      onChange={(e) => dispatch(toggleWidget(5))}>Widget 5</ToggleButton>
    </ButtonToolbar>
};

export default Toolbar;