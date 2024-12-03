import { useEffect, useState } from "react";

const rules = { red: 12, green: 13, blue: 14 };
const redPattern = /([0-9]*)\sred/g;
const greenPattern = /([0-9]*)\sgreen/g;
const bluePattern = /([0-9]*)\sblue/g;

const redPattern2 = new RegExp("([0-9]*) red", "g");
const greenPattern2 = new RegExp("([0-9]*) green", "g");
const bluePattern2 = new RegExp("([0-9]*) blue", "g");

function Day2() {
  const [inputValue, setInputValue] = useState("");
  const [answer1, setAnswer1] = useState(0);
  const [answer2, setAnswer2] = useState(0);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    const games = inputValue?.split("\n");

    // **solve part 1**
    const sumValidGames = sumValidGamesCalculation(games);
    setAnswer1(sumValidGames);

    // **solve part 2**
    const sumOfPower = sumOfPowerCalculation(games);
    setAnswer2(sumOfPower);
  }, [inputValue]);

  const sumValidGamesCalculation = (games) => {
    const sumValidGames = games?.reduce((accum, game, gameNumber) => {
      const draws = game?.split(";");
      const ruleBreaks = draws?.filter((draw) => {
        const redMatches = Array.from(draw.matchAll(redPattern))[0];
        const greenMatches = Array.from(draw.matchAll(greenPattern))[0];
        const blueMatches = Array.from(draw.matchAll(bluePattern))[0];
        // console.log('matches', greenMatches);
        // console.log('draw', draw);
        // console.log("test?????", {
        //   redMatches,
        //   greenMatches,
        //   blueMatches,
        //   isvalid:
        //     (redMatches && redMatches[1] > rules.red) ||
        //     (greenMatches && greenMatches[1] > rules.green) ||
        //     (blueMatches && blueMatches[1] > rules.blue),
        // });
        return (
          (redMatches && redMatches[1] > rules.red) ||
          (greenMatches && greenMatches[1] > rules.green) ||
          (blueMatches && blueMatches[1] > rules.blue)
        );
      });

      // console.log("rule breaks", { ruleBreaks, gameNumber });
      const gameNumberIfValid = ruleBreaks.length == 0 ? gameNumber + 1 : 0;
      // console.log('gameNumber', gameNumberIfValid);
      return accum + gameNumberIfValid;
    }, 0);

    console.log("sum", sumValidGames);
    return sumValidGames;
  };

  const sumOfPowerCalculation = (games) => {
    const sumOfPower = games?.reduce((accum, game, gameNumber) => {
      const draws = game?.split(";");
      const minCubes = draws?.reduce(
        (acc2, draw) => {
          //console.log("draw", draw);
          const redMatch = draw.match(redPattern);
          const redValue = redMatch && redMatch[0].split(" ")[0];
          const greenMatch = draw.match(greenPattern);
          const greenValue = greenMatch && greenMatch[0].split(" ")[0];
          const blueMatch = draw.match(bluePattern);
          const blueValue = blueMatch && blueMatch[0].split(" ")[0];
          //console.log("matches", { redMatch, greenMatch, blueMatch });

          acc2["red"] =
            redValue && Number(redValue) > acc2.red
              ? Number(redValue)
              : acc2.red;
          acc2["green"] =
            greenValue && Number(greenValue) > acc2.green
              ? Number(greenValue)
              : acc2.green;
          acc2["blue"] =
            blueValue && Number(blueValue) > acc2.blue
              ? Number(blueValue)
              : acc2.blue;
          return acc2;
        },
        { red: 0, green: 0, blue: 0 }
      );

      //console.log("minCubes", minCubes);

      const power = minCubes.red * minCubes.green * minCubes.blue;
      return accum + power;
    }, 0);

    console.log("sumOfPower", sumOfPower);
    return sumOfPower;
  };

  const sumOfPowerCalculationStartThatShouldHaveWorkedButForSomeDumbReasonDoesnt =
    (games) => {
      // Why???????
      const sumOfPower = games?.reduce((accum, game, gameNumber) => {
        const draws = game?.split(";");
        const minCubes = draws?.reduce(
          (acc2, draw) => {
            console.log("draw", draw);
            const redMatches = Array.from(draw.matchAll(redPattern))[0];
            const greenMatches = Array.from(draw.matchAll(greenPattern))[0];
            const blueMatches = Array.from(draw.matchAll(bluePattern))[0];
            console.log("matches", { redMatches, greenMatches, blueMatches });

            const redMatches2 = Array.from(draw.search(redPattern))[0];
            const blueMatches2 = Array.from(draw.matchAll(bluePattern))[0];
            console.log("find", blueMatches2);
            acc2["red"] =
              redMatches && Number(redMatches[1]) > acc2.red
                ? Number(redMatches[1])
                : acc2.red;
            //console.log('HERE', {greenMatch: greenMatches[1], green: acc2.green, greater: Number(greenMatches[1]) > acc2.green});
            acc2["green"] =
              greenMatches && Number(greenMatches[1]) > acc2.green
                ? Number(greenMatches[1])
                : acc2.green;
            acc2["blue"] =
              blueMatches && Number(blueMatches[1]) > acc2.blue
                ? Number(blueMatches[1])
                : acc2.blue;
            return acc2;
          },
          { red: 0, green: 0, blue: 0 }
        );

        console.log("minCubes", minCubes);

        return accum + 0;
      }, 0);
    };

  return (
    <div>
      <h2>Day 2</h2>
      <textarea value={inputValue} onChange={handleInputChange}></textarea>
      <hr />
      <span>Answer 1: {answer1}</span>
      <br />
      <span>Answer 2: {answer2}</span>
    </div>
  );
}

export default Day2;
