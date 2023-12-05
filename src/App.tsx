import "./App.css";
import Items from "./components/Chart";
import Controller from "./components/Controller";

function App() {
  console.log("APP");

  return (
    <div className="App">
      <Controller />
      <Items />
    </div>
  );
}

export default App;
