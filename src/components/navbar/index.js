import { AppBar, Toolbar } from "@mui/material";
import JSONEntry from "../jsonEntry";
import SaveButton from "../saveFile";

function navbar () {
    return(
        <AppBar position="static">
            <Toolbar>
                <JSONEntry />
                <SaveButton />
            </Toolbar>
        </AppBar>
    );
}

export default navbar;
