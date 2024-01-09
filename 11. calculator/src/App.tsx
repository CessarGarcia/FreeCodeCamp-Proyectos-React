import { useState } from "react";
import './App.css';

function App() {
  const [answer, setAnswer] = useState("");
  const [expression, setExpression] = useState("");
  const et = expression.trim();

  const isOperator = (symbol: string) => {
    return /[*/+-]/.test(symbol);
  };

  const buttonPress = (symbol: string) => {
    if (symbol === "clear") {
      setAnswer("");
      setExpression("0");
    } else if (symbol === "subtract") {
      if (answer === "") return;
      setAnswer(
        answer.toString().charAt(0) === "-" ? answer.slice(1) : "-" + answer
      );
    } else if (isOperator(symbol)) {
      setExpression(et + " " + symbol + " ");
    } else if (symbol === "=") {
      calculate();
    } else if (symbol === "0") {
      if (expression.charAt(0) !== "0") {
        setExpression(expression + symbol);
      }
    } else if (symbol === ".") {
      const lastNumber = expression.split(/[-+/*]/g).pop();
      if (!lastNumber) return;
      if (lastNumber?.includes(".")) return;
      setExpression(expression + symbol);
    } else {
      if (expression.charAt(0) === "0") {
        setExpression(expression.slice(1) + symbol);
      } else {
        setExpression(expression + symbol);
      }
    }
  }

  const calculate = () => {
    if (isOperator(et.charAt(et.length - 1))) return;

    const parts = et.split(" ")
    const newParts = [];

    for (let i = parts.length - 1; i >= 0; i--) {
      if (["*", "/", "+"].includes(parts[i]) && isOperator(parts[i - 1])) {
        newParts.unshift(parts[i]);
        let j = 0;
        let k = i - 1;
        while (isOperator(parts[k])) {
          k--;
          j++;
        }
        i -= j;
      } else {
        newParts.unshift(parts[i])
      }
    }

    const newExpression = newParts.join(" ");
    if (isOperator(newExpression.charAt(0))) {
      setAnswer(eval(answer + newExpression) as string);
    } else {
      setAnswer(eval(newExpression) as string);
    }
    setExpression("");
  };


  return (
    <>
      <div className="container App">
        <div className='contenedor-title'>
          <p className='title'>Calculator</p>
        </div>

        <div id="calculator">
          <div className="contenedor-calculadora">
            <div id="display">
              <div id="expression">{expression}</div>
              <div id="answer">{answer}</div>
            </div>

            <div className="fila">
              <button id="seven" onClick={() => buttonPress("7")} className="btn-contenedor btn-number">7</button>
              <button id="eight" onClick={() => buttonPress("8")} className="btn-contenedor btn-number">8</button>
              <button id="nine" onClick={() => buttonPress("9")} className="btn-contenedor btn-number">9</button>
              <button id="divide" onClick={() => buttonPress("/")} className="btn-contenedor operador">/</button>
            </div>
            <div className="fila">
              <button id="four" onClick={() => buttonPress("4")} className="btn-contenedor btn-number">4</button>
              <button id="five" onClick={() => buttonPress("5")} className="btn-contenedor btn-number">5</button>
              <button id="six" onClick={() => buttonPress("6")} className="btn-contenedor btn-number">6</button>
              <button id="multiply" onClick={() => buttonPress("*")} className="btn-contenedor operador">*</button>
            </div>
            <div className="fila">
              <button id="one" onClick={() => buttonPress("1")} className="btn-contenedor btn-number">1</button>
              <button id="two" onClick={() => buttonPress("2")} className="btn-contenedor btn-number">2</button>
              <button id="three" onClick={() => buttonPress("3")} className="btn-contenedor btn-number">3</button>
              <button id="add" onClick={() => buttonPress("+")} className="btn-contenedor operador">+</button>
            </div>
            <div className="fila">
              <button id="equals" onClick={() => buttonPress("=")} className="btn-contenedor operador">=</button>
              <button id="zero" onClick={() => buttonPress("0")} className="btn-contenedor btn-number">0</button>
              <button id="decimal" onClick={() => buttonPress(".")} className="btn-contenedor btn-number">.</button>
              <button id="subtract" onClick={() => buttonPress("-")} className="btn-contenedor operador">-</button>
            </div>
            <div className="fila">
              <button id="clear" onClick={() => buttonPress("clear")} className="btn-clear">Clear</button>
            </div>
          </div>

          <div className="content-p-developer">
            <p className="p-developer">
              Developed By: Céssar García
            </p>
          </div>
          
        </div>
      </div>
    </>
  )
}

export default App
