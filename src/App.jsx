import Footer from "./components/common/Footer";
import Header from "./components/common/Header";
import Timetable from "./components/Timetable";
import courses from "./data/courses.json";

function Setup() {
  const { body } = document;
  const root = document.getElementById("root");

  body.classList.add(
    "flex",
    "flex-col",
    "bg-emerald-50",
    "dark:bg-emerald-900",
    "min-h-screen"
  );

  root.classList.add("flex", "flex-col", "min-h-screen");
}

function App() {
  Setup();

  return (
    <>
      <Header />
      <Timetable courses={courses} />
      <Footer />
    </>
  );
}

export default App;
