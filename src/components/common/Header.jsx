import Light from "../../assets/light.svg";
import Dark from "../../assets/dark.svg";

function getTheme() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export default function Header() {
  const theme = getTheme();
  const Icon = theme === "dark" ? Dark : Light;
  return (
    <header className="dark:bg-emerald-950 dark:text-emerald-50 bg-emerald-500 text-emerald-50 text-2xl uppercase p-4 h-min flex flex-row justify-between items-center">
      <h1>Cronograma Setec</h1>
      <img
        src={Icon}
        alt="calendário"
        className="active:hover:animate-wiggle"
      />
    </header>
  );
}
