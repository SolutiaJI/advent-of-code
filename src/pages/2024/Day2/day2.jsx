import { useEffect, useState } from "react";

function Day2() {
  const [inputValue, setInputValue] = useState("");
  const [answer1, setAnswer1] = useState(0);
  const [answer2, setAnswer2] = useState(0);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    const reports = inputValue?.split("\n");

    // **solve part 1**
    const sumSafeReports = getSumSafeReports(reports);
    setAnswer1(sumSafeReports);

    // **solve part 2**
    const sumSafeReportsWithProblemDampener =
      getSumSafeReportsWithProblemDampener(reports);
    setAnswer2(sumSafeReportsWithProblemDampener); // 379/362 low
    // const sumOfPower = sumOfPowerCalculation(games);
    // setAnswer2(sumOfPower);
  }, [inputValue]);

  const isReportSafe = (report) => {
    let safeReport = true;
    const levels = report.split(" ");
    let isIncreasing = true;
    levels.forEach((level, index) => {
      if (index == 0 || !safeReport) return;
      const difference = level - levels[index - 1];
      const absDifference = Math.abs(levels[index - 1] - level);
      if (absDifference >= 1 && absDifference <= 3) {
        if (index == 1) {
          isIncreasing = difference > 0;
          console.log({ isIncreasing });
        } else if (
          (difference < 0 && isIncreasing) ||
          (difference > 0 && !isIncreasing)
        ) {
          // console.log("not safe", { absDifference, difference, isIncreasing });
          safeReport = false;
        }
      } else {
        // console.log("not safe", { absDifference, difference });
        safeReport = false;
      }
    });
    // console.log("report", { report, safeReport });
    return safeReport;
  };

  const isReportSafeWithProblemDampener = (report, problemIndex = -1) => {
    let safeReport = true;
    const levels = report.split(" ");
    let isIncreasing = true;
    let hasOneProblem = false;
    // let problemIndex = -1;
    levels.forEach((level, index) => {
      if (
        index == 0 ||
        (problemIndex == 0 && index == 1) ||
        problemIndex == index ||
        !safeReport
      )
        return;
      const cleanPrevIndex = problemIndex == index - 1 ? index - 2 : index - 1;
      const difference = level - levels[cleanPrevIndex];
      const absDifference = Math.abs(levels[cleanPrevIndex] - level);
      if (absDifference >= 1 && absDifference <= 3) {
        if (
          ((problemIndex < 0 || problemIndex > 2) && index == 1) ||
          ((problemIndex == 0 || problemIndex == 1) && index == 2)
        ) {
          isIncreasing = difference > 0;
          console.log({ isIncreasing });
        } else if (
          (difference < 0 && isIncreasing) ||
          (difference > 0 && !isIncreasing)
        ) {
          if (problemIndex < 0) {
            console.log("first problem", {
              absDifference,
              difference,
              isIncreasing,
            });
            problemIndex = index;
          } else {
            console.log("not safe", {
              absDifference,
              difference,
              isIncreasing,
              level,
              prev: levels[cleanPrevIndex],
            });
            safeReport = false;
          }
        }
      } else {
        if (problemIndex < 0) {
          console.log("first problem", { absDifference, difference });
          problemIndex = index;
        } else {
          console.log("not safe", { absDifference, difference });
          safeReport = false;
        }
      }
    });
    // if (!safeReport) console.log("report", { report, safeReport });
    return safeReport;
  };

  const getSumSafeReports = (reports) => {
    const sumSafeReports = reports?.reduce((numSafeReports, report) => {
      const safeReport = isReportSafe(report);
      if (safeReport) {
        numSafeReports++;
      }
      return numSafeReports;
    }, 0);

    console.log("sum", sumSafeReports);
    return sumSafeReports;
  };

  const getSumSafeReportsWithProblemDampener = (reports) => {
    let numNotSafe = 0;
    const sumSafeReports = reports?.reduce((numSafeReports, report) => {
      let safeReport = isReportSafeWithProblemDampener(report);
      if (!safeReport) {
        // only first round of filtering done, report may still be safe
        // loop through each level and check if valid while removing it
        const levels = report.split(" ");
        // if one version is safe, it is considered safe
        let safeReportLoop = false;
        levels.forEach((_, index) => {
          if (safeReportLoop) return;
          safeReportLoop = isReportSafeWithProblemDampener(report, index);
        });
        safeReport = safeReportLoop;
      }
      // check again and add if safe
      if (safeReport) {
        numSafeReports++;
      } else numNotSafe++;
      if (!safeReport) console.log("not safe report", report);
      return numSafeReports;
    }, 0);

    console.log("sum", sumSafeReports);
    console.log("not safe", numNotSafe);
    return sumSafeReports;
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
