import { useState, useEffect } from "react";

const Counter = () => {
  const [count, setCount] = useState(1);

  useEffect(() => {
    const intervalId = setInterval(
      () => console.log("Executing side effect"),
      3000
    );

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(prevCount => prevCount + 1)}>+</button>
    </>
  );
};

const CounterController = () => {
  const [showCounter, setShowCounter] = useState(false);

  return (
    <>
      <button onClick={() => setShowCounter(showCounter => !showCounter)}>
        {showCounter ? "Unmount Counter" : "Mount Counter"}
      </button>
      {showCounter && <Counter />}
    </>
  );
};

export default CounterController;
