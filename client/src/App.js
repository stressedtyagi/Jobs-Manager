import Router from "./routes";
import { SnackbarProvider } from "notistack";
function App() {
    return (
        <SnackbarProvider maxSnack={5}>
            <Router />
        </SnackbarProvider>
    );
}

export default App;
