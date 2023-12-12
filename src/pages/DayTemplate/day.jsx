import { useEffect, useState } from "react";

function Day2() {
  const [inputValue, setInputValue] = useState("");
  const [answer1, setAnswer1] = useState(0);
  const [answer2, setAnswer2] = useState(0);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    // **solve part 1**
    setAnswer1(0);

    // **solve part 2**
    setAnswer2(0);
  }, [inputValue]);

  const calc = (input) => {
    //
  };

  return (
    <div>
      <h2>Day X</h2>
      <textarea value={inputValue} onChange={handleInputChange}></textarea>
      <hr />
      <span>Answer 1: {answer1}</span>
      <br />
      <span>Answer 2: {answer2}</span>
    </div>
  );
}

export default Day2;
