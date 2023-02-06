import * as React from 'react';
import {ListItemButton, ListItemText, List, Collapse, TextField, Button} from '@mui/material';
import {KeyboardArrowDown, KeyboardArrowRight, DeleteForever, Check, DataArray, DataObject} from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { update, remove, add } from '../../model';
import { useSelector } from 'react-redux';
import _ from 'lodash';
//import {DataArray, DataObject, Add} from '@mui/icons-material';

export default function JSONDisplay ({label, value, keyPath=[], pad=0}) {
    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch();
    const state = useSelector((state) => {
        return(state.json);
    });
    let deleteItem = (e, keyPath) =>{
        dispatch(remove({"path": keyPath}));
    };
    let addItem = (e, keyPath, addArray=false, addObject=false)=>{
        let key = e.target.parentNode.parentNode.getElementsByClassName("inputKey")[0];
        let value = e.target.parentNode.parentNode.getElementsByClassName("inputValue")[0];
        let addObj = {"path": keyPath, "addArray": addArray, "addObject": addObject};
        if(key){
            addObj.key = key.getElementsByTagName("input")[0].value;
            key.getElementsByTagName("input")[0].value = "";
        };
        if(value){
            addObj.value = value.getElementsByTagName("input")[0].value;
            value.getElementsByTagName("input")[0].value = "";
        };
        //todo: add additional validation
        dispatch(add(addObj));
    };
    if(typeof(value) === 'object'){ //Parse nested objects
        let padIncrement = 2; //increment for indentation
        if(Array.isArray(value)){ //If value is an array create list of values
            return(
            <div>
                <ListItemButton onClick={(e)=>{setOpen(!open)}}><DeleteForever onClick={(e) => deleteItem(e, keyPath)}/><ListItemText primary={`${label}`}/>{open ? <KeyboardArrowDown /> : <KeyboardArrowRight />}</ListItemButton>
                <Collapse in={open}>
                    <List disablePadding sx={{pl: pad+padIncrement}}>
                        <ListItemButton ><TextField className='inputValue' sx={{pl: pad+padIncrement}}/> <Button onClick={(e) =>{addItem(e, keyPath)}}><Check/></Button>or <Button onClick={(e) =>{addItem(e, keyPath, false, true)}}><DataObject/></Button> or <Button onClick={(e) =>{addItem(e, keyPath, true, false)}}><DataArray/></Button></ListItemButton>
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
                        <ListItemButton ><TextField className='inputKey'sx={{pl: pad+padIncrement}}/>: <TextField className='inputValue' sx={{pl: pad+padIncrement}}/><Button onClick={(e) =>{addItem(e, keyPath)}}><Check/></Button>or <Button onClick={(e) =>{addItem(e, keyPath, false, true)}}><DataObject/></Button> or <Button onClick={(e) =>{addItem(e, keyPath, true, false)}}><DataArray/></Button></ListItemButton>
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
