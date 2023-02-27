import { useState } from "react";
import "./App.css";
import Die from "./Die";
import { nanoid } from "nanoid";

function App() {
  const [dice, setDice] = useState(allNewDice());

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push({ value: Math.ceil(Math.random() * 6), isHeld: false });
      // console.log(newDice);
    }
    return newDice;
  }

  function rollDice() {
    setDice(allNewDice);
  }

  const diceElement = dice.map((die) => <Die value={die.value} />);
  return (
    <div className="flex flex-col justify-center items-center h-[90vh]">
      <main className="w-[100%] md:max-w-[700px] h-[400px] bg-[#F5F5F5] rounded-[5px] flex flex-col justify-evenly items-center">
        <div className="px-4 space-y-3">
          <h1 className="font-semibold text-[2rem]">Tenzies</h1>
          <p>
            Roll until all dice are the same. Click each die to freeze it at
            it's current value between rolls.
          </p>
        </div>

        <div className="grid grid-cols-5 gap-4">{diceElement}</div>
        <div>
          <button
            onClick={rollDice}
            className="h-[50px] w-[100px] text-white text-[1.2rem] font-semibold bg-[#5035FF] rounded-[6px] border-none focus:outline-none roll-dice"
          >
            Roll
          </button>
        </div>
      </main>
    </div>
  );
}

export default App;
