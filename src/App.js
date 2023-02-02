import Navbar from "./components/navbar"
import { ThemeProvider, createTheme } from "@mui/material/styles";
import EditPanel from "./components/editPanel";
import {Stack} from "@mui/material";
import PreviewPanel from "./components/previewPanel";
import {Provider} from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import reducer from './model'


const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const store = configureStore({reducer: {json: reducer}});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <Provider store={store}>
      <Navbar />
        <Stack sx={{p: 2, flexGrow: 1, height: '93vh'}} direction="row" spacing={2}>
          <EditPanel/>
          <PreviewPanel/>
        </Stack>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
