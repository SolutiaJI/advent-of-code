import { useEffect, useState } from "react";

function Day3() {
  const [inputValue, setInputValue] = useState(
    "xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))"
  );
  const [answer1, setAnswer1] = useState(0);
  const [answer2, setAnswer2] = useState(0);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    // **solve part 1**
    const totalMul = getMatchedMulTotal(inputValue);
    setAnswer1(totalMul);

    // **solve part 2**
    const totalMulConditional = getConditionalMatchedMulTotal(inputValue);
    setAnswer2(totalMulConditional);
  }, [inputValue]);

  const getMatchedMulTotal = (input) => {
    const pattern = /mul\(([0-9]{1,3}),([0-9]{1,3})\)/g;

    const matches = Array.from(input.matchAll(pattern));

    // console.log("match all", matches);

    const sumMul = matches.reduce((sumAccum, mulMatch) => {
      const val1 = mulMatch[1];
      const val2 = mulMatch[2];
      const product = val1 * val2;
      sumAccum += product;
      return sumAccum;
    }, 0);

    // console.log("sum", sumMul);
    return sumMul;
  };

  const getConditionalMatchedMulTotal = (input) => {
    const mulPattern = /mul\(([0-9]{1,3}),([0-9]{1,3})\)/g;
    const doPattern = /do\(\)/g;
    const dontPattern = /don\'t\(\)/g;

    const mulMatches = Array.from(input.matchAll(mulPattern));
    const doMatches = Array.from(input.matchAll(doPattern));
    const dontMatches = Array.from(input.matchAll(dontPattern));

    console.log("match all", mulMatches);

    const allMatches = [...mulMatches, ...doMatches, ...dontMatches];

    allMatches.sort((a, b) => a.index - b.index);
    console.log("all matches", allMatches);

    let doCount = true;
    const sumMul = allMatches.reduce((sumAccum, match) => {
      if (match[0].includes("don't")) {
        console.log("don't", { match });
        doCount = false;
      } else if (match[0].includes("do")) {
        console.log("do", { match });
        doCount = true;
      } else if (doCount) {
        console.log({ doCount, match });
        //all remaining matches should be mul, so count if currently set to "do"
        const val1 = match[1];
        const val2 = match[2];
        const product = val1 * val2;
        sumAccum += product;
      }

      return sumAccum;
    }, 0);

    console.log("sum", sumMul);
    return sumMul;
  };

  return (
    <div>
      <h2>Day 3</h2>
      <textarea value={inputValue} onChange={handleInputChange}></textarea>
      <hr />
      <span>Answer 1: {answer1}</span>
      <br />
      <span>Answer 2: {answer2}</span>
    </div>
  );
}

export default Day3;
