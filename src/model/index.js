import { createSlice } from "@reduxjs/toolkit";
import template from "../utils/template";
import _ from 'lodash';
import hash from '../utils/hash';

const initialState = process.env.NODE_ENV === "development" ? {...template
} : {};

const reducer = createSlice({"name": "json", initialState, reducers: {
    update (state, action) {
        _.set(state, action.payload.path, action.payload.value);
        hash(state);
        //console.log(state[action.payload.path[0]]);
        //console.log(state.checksum);
    },
    set (state, action) {
        //_.set(state, action.payload.path, action.payload.value);
        //hash(state);
        //console.log(state[action.payload.path[0]]);
        //console.log(state.checksum);
        return {...action.payload};
    }
    }
});

export default reducer.reducer;
export const { update, set } = reducer.actions;
