import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {faker} from "@faker-js/faker";
import axios from "axios";

const labels1 = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
const labels2 = ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6'];
const labels3 = ['Red', 'Orange', 'Yellow', 'Green', 'Blue'];
const labels4 = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const fetchWidgetData = createAsyncThunk('fetchWidgetData', async (widgetId, thunkAPI) => {
    const response = await axios.get('').then(res => { // fake request
        switch (widgetId) { // collect fake data
            case 1:
                return { data: {
                    labels: [...labels1],
                    data: labels1.map(() => faker.datatype.number({ min: 0, max: 1000 }))
                }};
            case 2:
                return { data: {
                    labels: [...labels2],
                    data: labels2.map(() => faker.datatype.number({ min: 0, max: 1000 }))
                }};
            case 3:
                return { data: {
                    labels: [...labels3],
                    data: labels3.map(() => faker.datatype.number({ min: 0, max: 1000 }))
                }};
            case 4:
                return { data: {
                    labels: [...labels4],
                    data: labels4.map(() => faker.datatype.number({ min: 0, max: 1000 }))
                }};
            case 5:
                return { data: {
                    data: Array.from({ length: 50 }, () => ({
                        x: faker.datatype.number({ min: -100, max: 100 }),
                        y: faker.datatype.number({ min: -100, max: 100 }),
                        r: faker.datatype.number({ min: 5, max: 20 }),
                    }))
                }};
        }
    });
    return response.data;
});

const initialState = {
    widgets: {
        widget_1: {
            enabled: false,
            labels: [],
            data: [],
        },
        widget_2: {
            enabled: false,
            labels: [],
            data: [],
        },
        widget_3: {
            enabled: false,
            labels: [],
            data: [],
        },
        widget_4: {
            enabled: false,
            labels: [],
            data: [],
        },
        widget_5: {
            enabled: false,
            labels: [],
            data: [],
        },
    },
}

export const slice = createSlice({
    name: 'store',
    initialState,
    reducers: {
        toggleWidget: (state, action) => {
            state.widgets = {
                ...state.widgets,
                [`widget_${action.payload}`]: {
                    ...state.widgets[`widget_${action.payload}`],
                    enabled: !state.widgets[`widget_${action.payload}`].enabled
                }
            };
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchWidgetData.fulfilled, (state, action) => {
            const widgetId = action.meta.arg;
            state.widgets[`widget_${widgetId}`] = {
                ...state.widgets[`widget_${widgetId}`],
                data: action.payload.data,
                labels: action.payload.labels,
            };
        });
    },
})

// Action creators are generated for each case reducer function
export const {
    toggleWidget,
} = slice.actions

export default slice.reducer