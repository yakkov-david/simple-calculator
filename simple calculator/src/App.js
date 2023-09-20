/*import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;*/

// App.js
import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <Calculator/>
    </div>
  );
}

export default App;

function CalculatorKey({onClick, children}) {
  //const {onClick, children} = props
    return (
        <button onClick={onClick} className="calculator-key">
            {children}
        </button>
    );
}

function Calculator() {
    const [data, setData] = React.useState("");

    const calculate = () => {
        try {
            setData((eval(data) || "") + "");
        } 
        catch (e) {
            setData("error");
        }
    };

    const reset = () => {
        setData("");
    };

    const handleKeyClick = (val) => () => {
        if (val === "=") {
            calculate();
        } 
        else if (val === "C") {
            reset();
        } 
        else {
            setData(data + val);
        }
    };

    return (
        <div className="calculator">
            <div className="calculator-input">
                <input type="text" value={data} disabled/>
            </div>
            <div className="calculator-keys">
                <CalculatorKey onClick={handleKeyClick("1")}>1</CalculatorKey>
                <CalculatorKey onClick={handleKeyClick("2")}>2</CalculatorKey>
                <CalculatorKey onClick={handleKeyClick("3")}>3</CalculatorKey>
                <CalculatorKey onClick={handleKeyClick("+")}>+</CalculatorKey>
                <CalculatorKey onClick={handleKeyClick("4")}>4</CalculatorKey>
                <CalculatorKey onClick={handleKeyClick("5")}>5</CalculatorKey>
                <CalculatorKey onClick={handleKeyClick("6")}>6</CalculatorKey>
                <CalculatorKey onClick={handleKeyClick("-")}>-</CalculatorKey>
                <CalculatorKey onClick={handleKeyClick("7")}>7</CalculatorKey>
                <CalculatorKey onClick={handleKeyClick("8")}>8</CalculatorKey>
                <CalculatorKey onClick={handleKeyClick("9")}>9</CalculatorKey>
                <CalculatorKey onClick={handleKeyClick("*")}>*</CalculatorKey>
                <CalculatorKey onClick={handleKeyClick("C")}>C</CalculatorKey>
                <CalculatorKey onClick={handleKeyClick("0")}>0</CalculatorKey>
                <CalculatorKey onClick={handleKeyClick("=")}>=</CalculatorKey>
                <CalculatorKey onClick={handleKeyClick("/")}>/</CalculatorKey>
            </div>
        </div>
    );
}


