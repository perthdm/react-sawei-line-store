import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "layouts/Main";

const App = () => {
  return (
    <BrowserRouter>
      <Main />
    </BrowserRouter>
  );
};

export default App;
