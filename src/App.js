import { Provider } from "react-redux";
import ConverterContainer from "@components/converterComponents/converterContainer";
import { store } from "@reducers/index";
import "@/App.css";

function App() {
  return (
    <Provider store={store}>
        <ConverterContainer />
    </Provider>
  );
}

export default App;
