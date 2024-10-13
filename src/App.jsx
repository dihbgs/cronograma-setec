import Footer from "./components/common/Footer";
import Header from "./components/common/Header";
import Timetable from "./components/Timetable";
import courses from "./data/courses.json";

function Setup() {
  const { body } = document;
  const root = document.getElementById("root");

  body.classList.add("bg-emerald-50", "flex", "flex-col", "h-screen");

  root.classList.add("flex", "flex-col", "h-full");
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
