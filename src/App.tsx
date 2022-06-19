import MainRouter from "./router/MainRouter";
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
    return (
        <Provider store={store}>
            <MainRouter />
        </Provider>
    );
}

export default App;