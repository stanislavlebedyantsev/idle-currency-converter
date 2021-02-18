import "./App.css";
import ConverterContainer from "@components/converterComponents/converterContainer";
import { Provider } from "react-redux";
import { store } from "@reducers/index";

function App() {
  return (
    <Provider store={store}>
      <ConverterContainer />
    </Provider>
  );
}

export default App;
