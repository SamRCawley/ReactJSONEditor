import { createSlice } from "@reduxjs/toolkit";
import template from "../utils/template";
import _ from 'lodash';
import hash from '../utils/hash';

const initialState = ["development", "test"].includes(process.env.NODE_ENV) ? {...template
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
    },
    remove (state, action){
        let parentPath = action.payload.path.slice(0, -1);
        let parentObject = state;
        if(parentPath.length !== 0){
            parentObject = _.get(state, parentPath);
        }
        if(typeof(action.payload.path.slice(-1)[0]) === 'number'){ //Parent is array
            parentObject.splice(action.payload.path.slice(-1)[0], 1);
        }
        else{//parent is object
            delete parentObject[action.payload.path.slice(-1)[0]];
        }
        hash(state);
    },
    add (state, action){
        let parentPath = action.payload.path;
        let parentObject = state;
        if(parentPath.length !== 0){
            parentObject = _.get(state, parentPath);
        }
        let obj = action.payload.value;
        if(action.payload.addArray){
            obj = [];
        }
        else if(action.payload.addObject){
            obj = {};
        }

        if(Array.isArray(parentObject)){ //Parent is array
            parentObject.push(obj);
        }
        else{//parent is object
            parentObject[action.payload.key] = obj;
        }
        hash(state);
    }
    }
});

export default reducer.reducer;
export const { update, set, remove, add } = reducer.actions;
