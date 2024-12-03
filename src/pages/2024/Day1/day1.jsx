import { useEffect, useState } from "react";

function Day1() {
  const [inputValue, setInputValue] = useState("");
  const [answer1, setAnswer1] = useState(0);
  const [answer2, setAnswer2] = useState(0);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    // **solve part 1**
    const totalAnswer1 = sumLines(inputValue);
    setAnswer1(totalAnswer1);

    // **solve part 2**
    const similarityScore = findSimilarity(inputValue);
    setAnswer2(similarityScore);
  }, [inputValue]);

  const sumLines = (input) => {
    const lines = input.split("\n");
    const list1 = [];
    const list2 = [];
    lines?.forEach((line) => {
      list1.push(line.split("   ")[0]);
      list2.push(line.split("   ")[1]);
    });
    list1.sort();
    list2.sort();
    // console.log(list2);

    const sum = list1.reduce((totalDistance, lineVal1, index) => {
      const lineVal2 = list2[index];
      let lineDistance = lineVal1 - lineVal2;
      // console.log("ldist", lineDistance);
      if (lineDistance < 0) lineDistance = lineDistance * -1;

      totalDistance += lineDistance;
      // console.log("tdist", totalDistance);
      return totalDistance;
    }, 0);

    return sum;
  };

  const findSimilarity = (input) => {
    const lines = input.split("\n");
    const list1 = [];
    //build map of number of occurence of values in list 2
    const mapList2 = {};
    lines?.forEach((line) => {
      list1.push(line.split("   ")[0]);
      const lineVal2 = line.split("   ")[1];
      if (!mapList2[lineVal2]) {
        //initialize map for specific value
        mapList2[lineVal2] = 0;
      }
      mapList2[lineVal2]++;
    });
    // console.log(mapList2);

    const sum = list1.reduce((totalScore, value) => {
      // multiply value by number of occurences in map, otherwise 0
      // console.log(value + " * " + mapList2[value]);
      totalScore += value * (mapList2[value] ? mapList2[value] : 0);
      // console.log("totalScore", totalScore);
      return totalScore;
    }, 0);
    return sum;
  };

  return (
    <div>
      <h2>Day 1</h2>
      <textarea value={inputValue} onChange={handleInputChange}></textarea>
      <hr />
      <span>Answer 1: {answer1}</span>
      <br />
      <span>Answer 2: {answer2}</span>
    </div>
  );
}

export default Day1;
