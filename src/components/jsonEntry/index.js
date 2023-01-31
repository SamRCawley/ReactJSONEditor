import * as React from "react";
import { Modal, Button, TextField, Box} from "@mui/material";
import saveJson from "../../utils/jsonFile"
import { useDispatch} from "react-redux";
import { set } from "../../model";

export default function JSONEntry() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const dispatch = useDispatch();

    const boxstyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80vw',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4
      };

    function saveAndClose(e) {
        let json = saveJson(e);
        if(json){
            dispatch(set(json));
            handleClose();
        }
    }

    return (
        <div>
            <Button onClick={handleOpen} sx={{color: "white"}}>Input JSON</Button>
            <Modal open={open} onClose={handleClose}>
                <Box sx={boxstyle}>
                    <TextField multiline rows={25} fullWidth id="jsonFile" label="Input JSON" variant="filled" defaultValue=""/>
                    <Box sx={{display: "flex", flexDirection: "row-reverse", p: 2, paddingBottom: 0 }}><Button sx={{color: "white"}} onClick={saveAndClose} variant="outlined">Save</Button></Box>
                </Box>
            </Modal>
        </div>
    )
}
