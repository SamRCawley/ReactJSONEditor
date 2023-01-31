import Navbar from "./components/navbar"
import { ThemeProvider, createTheme } from "@mui/material/styles";
import EditPanel from "./components/editPanel";
import {Stack} from "@mui/material";
import PreviewPanel from "./components/previewPanel";

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <Navbar />
        <Stack sx={{p: 2, flexGrow: 1, height: '93vh'}} direction="row" spacing={2}>
          <EditPanel/>
          <PreviewPanel/>
        </Stack>
    </ThemeProvider>
  );
}

export default App;
