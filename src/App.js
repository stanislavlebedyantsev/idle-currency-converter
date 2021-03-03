import { Provider } from "react-redux";
import RouterWrapper from "@components/wrappers/RouterWrapper";
import Header from "@components/common/header/index";
import { store } from "@reducers/index";
import {BrowserRouter} from "react-router-dom";
import "@/App.css";

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Header />
        <RouterWrapper />
      </Provider>
    </BrowserRouter>
  );
}

export default App;
