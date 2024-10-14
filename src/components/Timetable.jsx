import { useState } from "react";

function stringToTime(date) {
  return new Date(date).toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function stringToWeekday(date) {
  return new Date(date).toLocaleDateString("pt-BR", {
    weekday: "long",
  });
}

const Card = ({ course }) => {
  const { title, type, location, speakers, start, end } = course;
  const timerange = stringToTime(start) + " - " + stringToTime(end);
  const people = speakers.join(", ");
  const day = stringToWeekday(start);

  return (
    <div className="grid h-48 sm:h-56 bg-emerald-100 dark:bg-emerald-800  dark:border-emerald-950 text-emerald-800 dark:text-emerald-100 border-emerald-300  shadow-emerald-200 dark:shadow-emerald-950 border-2 gap-3 uppercase shadow-md text-sm active:hover:animate-wiggle cursor-pointer">
      <div className="flex flex-col">
        <div className="bg-emerald-300 dark:bg-emerald-950 p-0 line-clamp-1 hover:line-clamp-4">
          <p className="text-sm text-center">{title}</p>
        </div>
        <div className="flex flex-row justify-evenly px-2 py-1 text-xs bg-emerald-200 dark:bg-emerald-900">
          <p>{location}</p>
          <p>{day}</p>
          <p>{timerange}</p>
        </div>
      </div>
      <div className="capitalize px-4 text-center">
        <p>{people}</p>
      </div>
      <div className="px-4 py-2 text-end">
        <p>{type}</p>
      </div>
    </div>
  );
};

const SearchBar = ({ setSearch }) => {
  return (
    <div className="flex flex-row justify-center w-full">
      <input
        className="border-2 border-emerald-300 dark:border-emerald-950 dark:text-emerald-50 dark:bg-emerald-950 outline-none bg-emerald-50 text-emerald-800 px-2"
        type="text"
        placeholder="Pesquise aqui"
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
};

const CoursesDropdown = ({ courses, setFilteredCourses }) => {
  const types = courses.map((course) => course.type.toLowerCase());
  const options = [...new Set(types)].map((type, index) => {
    return (
      <option key={index} value={type}>
        {type}
      </option>
    );
  });

  return (
    <div className="flex flex-row justify-center w-full">
      <select
        className="flex w-full border-2 border-emerald-300 dark:border-emerald-950 dark:text-emerald-50 dark:bg-emerald-950 outline-none p-2 text-emerald-800 bg-emerald-50"
        onChange={(e) => {
          const type = e.target.value;
          const filtered = filterByType(courses, type);
          setFilteredCourses(filtered);
        }}
      >
        {options}
      </select>
    </div>
  );
};

function sortByDate(courses) {
  return courses.sort((a, b) => {
    return new Date(a.start) - new Date(b.start);
  });
}

function filterByType(courses, type) {
  return courses.filter((course) => course.type.toLowerCase() === type);
}

const Timetable = ({ courses }) => {
  const [search, setSearch] = useState("");
  const [filteredCourses, setFilteredCourses] = useState(sortByDate(courses));

  const cards = filteredCourses.map((course, index) => {
    const { title, speakers } = course;
    const people = speakers.join(", ");
    const searchValue = title + people + course.type + course.location;

    if (searchValue.toLowerCase().includes(search.toLowerCase())) {
      return <Card course={course} key={index} />;
    }

    return null;
  });

  return (
    <>
      <div className="flex flex-row justify-around p-4 gap-4">
        <SearchBar setSearch={setSearch} />
        <CoursesDropdown
          setFilteredCourses={setFilteredCourses}
          courses={courses}
        />
      </div>
      <div className="grid h-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {cards}
      </div>
    </>
  );
};

export default Timetable;
