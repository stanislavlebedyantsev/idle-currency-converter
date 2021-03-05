import { Provider } from "react-redux";
import RouterWrapper from "@components/wrappers/RouterWrapper";
import { store } from "@reducers/index";
import {BrowserRouter} from "react-router-dom";
import "@/App.css";

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <RouterWrapper />
      </Provider>
    </BrowserRouter>
  );
}

export default App;
