import logo from "./logo.svg";
import snowflake from "./snowflake.png";
import womp from "./womp-womp-conan.gif";
import "./App.css";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import Day1 from "./pages/Day1/day1";
import Day2 from "./pages/Day2/day2";
import Day3 from "./pages/Day3/day3";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Advent of Code 2023</h1>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="day1" element={<Day1 />} />
            <Route path="day2" element={<Day2 />} />
            <Route path="day3" element={<Day3 />} />
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
        </ul>
      </nav>

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
