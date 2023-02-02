import * as React from 'react';
import {ListItemButton, ListItemText, List, Collapse, TextField} from '@mui/material';
import {KeyboardArrowDown, KeyboardArrowRight, DeleteForever} from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { update, remove } from '../../model';
import { useSelector } from 'react-redux';
import _ from 'lodash';
//import {DataArray, DataObject} from '@mui/icons-material';

export default function JSONDisplay ({label, value, keyPath=[], pad=0}) {
    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch();
    const state = useSelector((state) => {
        return(state.json);
    });
    let deleteItem = (e, keyPath) =>{
        dispatch(remove({"path": keyPath}));
    }
    if(typeof(value) === 'object'){ //Parse nested objects
        let padIncrement = 2; //increment for indentation
        if(Array.isArray(value)){ //If value is an array create list of values
            return(
            <div>
                <ListItemButton onClick={(e)=>{setOpen(!open)}}><DeleteForever onClick={(e) => deleteItem(e, keyPath)}/><ListItemText primary={`${label}`}/>{open ? <KeyboardArrowDown /> : <KeyboardArrowRight />}</ListItemButton>
                <Collapse in={open}>
                    <List disablePadding sx={{pl: pad+padIncrement}}>
                        {value.map((val, i) => <JSONDisplay pad={pad+padIncrement} label={""} value={val} keyPath={keyPath.concat(i)} key={`${keyPath.join(':')}:${i}`} />)}
                    </List>
                </Collapse>
            </div>)
        }
        else{ //is a POJO, create a new category
            return(
            <div>
                <ListItemButton onClick={(e)=>{setOpen(!open)}}><DeleteForever onClick={(e) => deleteItem(e, keyPath)}/><ListItemText primary={`${label}`}/>{open ? <KeyboardArrowDown /> : <KeyboardArrowRight />}</ListItemButton>
                <Collapse in={open}>
                    <List disablePadding sx={{pl: pad+padIncrement}}>
                        {Object.keys(value).map(key => <JSONDisplay pad={pad+padIncrement} label={key} value={value[key]} keyPath={keyPath.concat(key)} key={`${keyPath}: ${key}`} />)}
                    </List>
                </Collapse>
            </div>)
        }
    }
    else{ //simple key value pair
        let text = label ? `${label}: ` : ``;
        let changeFun = (e, keyPath) => {
            dispatch(update({"path": keyPath, value: e.target.value}));
        };
        return(<ListItemButton >{text}<TextField onChange={(e) => changeFun(e, keyPath)} sx={{pl: 2}} value={_.get(state, keyPath)}/><DeleteForever onClick={(e) => deleteItem(e, keyPath)}/></ListItemButton>)
    }
}
