import React from "react";
import ReactDOM from "react-dom";
import MapComponent from "./components/MapComponent";
import "./styles.css";

function App() {
  return (
    <div className="App">
      <h1>Interstellar-  Berlin as marker and Draw polygons</h1>
      <MapComponent isMarkerShown={true} defaultZoom={9} />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
