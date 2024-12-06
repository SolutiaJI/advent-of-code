import logo from "./logo.svg";
import snowflake from "./snowflake.png";
import womp from "./womp-womp-conan.gif";
import "./App.css";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import Day1_2023 from "./pages/2023/Day1/day1";
import Day2_2023 from "./pages/2023/Day2/day2";
import Day3_2023 from "./pages/2023/Day3/day3";
import Day1 from "./pages/2024/Day1/day1";
import Day2 from "./pages/2024/Day2/day2";
import Day3 from "./pages/2024/Day3/day3";
import Day4 from "./pages/2024/Day4/day4";
import Day5 from "./pages/2024/Day5/day5";
import Day6 from "./pages/2024/Day6/day6";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Advent of Code</h1>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="day1" element={<Day1 />} />
            <Route path="day2" element={<Day2 />} />
            <Route path="day3" element={<Day3 />} />
            <Route path="day4" element={<Day4 />} />
            <Route path="day5" element={<Day5 />} />
            <Route path="day6" element={<Day6 />} />
            <Route
              path="2023"
              element={
                <PastLayout year={2023} days={["day1", "day2", "day3"]} />
              }
            >
              <Route path="day1" element={<Day1_2023 />} />
              <Route path="day2" element={<Day2_2023 />} />
              <Route path="day3" element={<Day3_2023 />} />
            </Route>
            <Route path="*" element={<NoMatch />} />
          </Route>
        </Routes>
      </header>
    </div>
  );
}
const Layout = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/day1">Day 1</Link>
          </li>
          <li>
            <Link to="/day2">Day 2</Link>
          </li>
          <li>
            <Link to="/day3">Day 3</Link>
          </li>
          <li>
            <Link to="/day4">Day 4</Link>
          </li>
          <li>
            <Link to="/day5">Day 5</Link>
          </li>
          <li>
            <Link to="/day6">Day 6</Link>
          </li>
          <li>
            <Link to="/2023/">2023</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  );
};

const PastLayout = ({ year, days }) => {
  return (
    <>
      <h2>{year}</h2>
      <Link to="/">return to present year</Link>
      {days?.map((day) => {
        return <Link to={`/${year}/${day}`}>Day {day?.split("day")[1]}</Link>;
      })}
      <Outlet />
    </>
  );
};

function Home() {
  return <img src={snowflake} className="App-logo" alt="logo" />;
}

function NoMatch() {
  return <img src={womp} />;
}

export default App;
