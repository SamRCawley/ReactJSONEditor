import { Button } from "@mui/material";
import { useSelector } from "react-redux";

export default function SaveButton () {

    const state = useSelector((state) => {
        return(state.json);});
      function download(e) {
        var a = document.createElement("a");
        var file = new Blob([JSON.stringify(state, null, 2)], {type: 'text/plain'});
        a.href = URL.createObjectURL(file);
        a.download = 'file.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }

    return <Button sx={{color: "white"}} onClick={download}>Save File</Button>
}
