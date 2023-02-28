import { useState, useEffect } from "react";
import Die from "./Die";
import { nanoid } from "nanoid";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";

function App() {
  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);
  const { width, height } = useWindowSize();

  useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every((die) => die.value === firstValue);
    if (allHeld && allSameValue) {
      setTenzies(true);
      console.log("You Won! ");
    }
  }, [dice]);

  function generatenewDie() {
    return { value: Math.ceil(Math.random() * 6), isHeld: false, id: nanoid() };
  }

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generatenewDie());
      // console.log(newDice);
    }
    return newDice;
  }

  function rollDice() {
    if (!tenzies) {
      setDice((oldDice) =>
        oldDice.map((die) => {
          return die.isHeld ? die : generatenewDie();
        })
      );
    } else {
      setTenzies(false);
      setDice(allNewDice);
    }
  }

  function holdDice(id) {
    console.log(id);
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  const diceElement = dice.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      id={die.id}
      holdDice={() => holdDice(die.id)}
    />
  ));
  return (
    <div className="flex flex-col justify-center items-center h-[90vh]">
      <main className="w-[90%] md:max-w-[700px] h-[400px] bg-[#F5F5F5] rounded-[5px] flex flex-col justify-evenly items-center">
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
            className="py-[10px] px-[24px] text-white text-[1.2rem] font-semibold bg-[#5035FF] rounded-[6px] border-none focus:outline-none roll-dice"
          >
            {tenzies ? "New Game" : "Roll"}
          </button>
        </div>
      </main>
      {tenzies && <Confetti />}
    </div>
  );
}

export default App;
