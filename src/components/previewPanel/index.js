import { Box } from "@mui/system";
import { useSelector } from "react-redux";

export default function PreviewPanel(){
    const style={
        width: '50%',
        height: '100%',
        overflow: 'auto'
    };
    const json = useSelector((state) => {
        return(state.json);
    });
    return(<Box sx={style}><pre>{JSON.stringify(json, null, 2)}</pre></Box>)
}
