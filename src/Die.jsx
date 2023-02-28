import React from "react";

function Die(props) {
  const styles = {
    backgroundColor: props.isHeld ? "#59E391" : "white",
  };
  return (
    <div
      onClick={props.holdDice}
      className="h-[45px] w-[45px] md:w-[50px] md:h-[50px] rounded-[10px] flex justify-center items-center cursor-pointer die-face"
      style={styles}
    >
      <h2 className="text-[1.5rem]">{props.value}</h2>
    </div>
  );
}

export default Die;
