import "./App.css";
import Quote from "./components/Quote";
import Clock from "./components/Clock";
import useClockContext from "./hooks/useClockContext";

function App() {
  const { clockData, timeLimits } = useClockContext();
  const { timeSegment } = clockData;

  const styles = {
    backgroundImage: `url(${timeLimits[timeSegment].background})`,
  };
  return (
    <div
      className="w-screen h-screen bg-black text-white flex flex-col justify-between p-12 bg-scroll bg-left bg-no-repeat bg-cover relative App overflow-hidden"
      style={styles}
    >
      <Quote />
      <Clock />
    </div>
  );
}

export default App;
