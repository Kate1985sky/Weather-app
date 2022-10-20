import { useState } from "react";
import "./Style.css";

function App() {
  const [temperature, setTemperature] = useState("");
  const [condition, setCondition] = useState("");
  const [inputCity, setInputCity] = useState("Kiev");
  const [error, setError] = useState(false);

  const updateWether = () => {
    console.log("update wheather");
    console.log(inputCity);
 
  fetch(
    "https://api.weatherapi.com/v1/current.json?key=e9709cf4f7b74389b1f133756221910&q="+inputCity+"&aqi=no"
  )
    .then((el) => el.json())
    .then((data) => {
      setTemperature(data.current.temp_c);
      setCondition(data.current.condition.text);
    })
    .catch(error => setError(true));
  }
  return (
    <div className="App">
      {error && <div>Міста немає</div>}
      {
      temperature && condition && 
        <>
          <header className="App-header">
            <h1>Прогноз погоди в {inputCity}</h1>
          </header>
          <div className="wrapper">
            <ul className="list">
              <li>
                Температура повітря: {temperature} <br />
              </li>
              <li>Опади: {condition}</li>
            </ul>
          </div>
        </>
}
      <div>
        <input
          type="text"
          value={inputCity}
          onChange={(event) => setInputCity(event.target.value)}
        />
        <button type="button" onClick={updateWether}>
          Показати погоду в місті
        </button>
      </div>
    </div>
  );
}

export default App;
