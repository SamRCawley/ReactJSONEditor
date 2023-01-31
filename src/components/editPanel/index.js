import * as React from 'react'
import {List} from '@mui/material';
import { useSelector } from 'react-redux';
import JSONDisplay from '../jsondisplay';

export default function EditPanel() {

    const style={
        width: '50%',
        height: '100%',
        overflow: 'auto'
    }
    const state = useSelector((state) => {
        return(state);
    });
    if(!state.json){
        return <List></List>
    }
    return(
        <List sx={style}>
            {Object.keys(state.json).map((k) => <JSONDisplay key={k} label={k} value={state.json[k]} keyPath={[k]}/> )}
        </List>
    )
}
