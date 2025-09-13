import { useEffect, useRef } from "react";

const Practice = () => {
  const autoInputRef = useRef(null);
  const manualInputRef = useRef(null);

  const handleClick = () => {
    manualInputRef.current.focus();
  };

  useEffect(() => autoInputRef.current.focus(), []);

  return (
    <>
      <input ref={autoInputRef} />
      <div>
        <input ref={manualInputRef} />
      </div>
      <button onClick={handleClick}>Focus the input</button>
    </>
  );
};

export default Practice;
