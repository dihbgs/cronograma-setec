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

function sortByDate(courses) {
  return courses.sort((a, b) => {
    return new Date(a.start) - new Date(b.start);
  });
}

function filterBySearch(courses, search) {
  return courses.filter((course) => {
    const searchPool =
      course.title.toLowerCase() +
      course.speakers.join(" ").toLowerCase() +
      course.location.toLowerCase() +
      course.type.toLowerCase() +
      course.category.toLowerCase() +
      course.start.toLowerCase() +
      course.end.toLowerCase() +
      stringToWeekday(course.start).toLowerCase();

    return searchPool.includes(search.toLowerCase());
  });
}

function filterByAll(courses, category, type, search) {
  const filteredBySearch = filterBySearch(courses, search);

  return filteredBySearch.filter((course) => {
    const courseType = course.type.toLowerCase();
    const courseCategory = course.category.toLowerCase();

    return (
      (courseCategory === category || category === "all" || courseCategory === "geral") &&
      (courseType === type || type === "all")
    );
  });
}

function isCourseOutdated(course) {
  return new Date(course.end) < new Date();
}

function isCourseHappeningNow(course) {
  return (
    new Date(course.start) < new Date() && new Date(course.end) > new Date()
  );
}

function isOldertThanToday(course) {
  return new Date(course.end) < new Date().setHours(0, 0, 0, 0);
}

const Card = ({ course }) => {
  const { title, type, location, speakers, start, end } = course;
  const timerange = stringToTime(start) + " - " + stringToTime(end);
  const isHappeningNow = isCourseHappeningNow(course);
  const isOutdated = isCourseOutdated(course);
  const people = speakers.join(", ");
  const day = stringToWeekday(start);

  return (
    <div
      className={
        "grid h-48 sm:h-56 bg-emerald-100 dark:bg-emerald-800  dark:border-emerald-950 text-emerald-800 dark:text-emerald-100 border-emerald-300  shadow-emerald-200 dark:shadow-emerald-950 border-2 gap-3 uppercase shadow-md text-sm active:hover:animate-wiggle cursor-pointer relative" +
        (isOutdated ? " grayscale" : "") +
        (isHappeningNow ? " animate-pulse" : "")
      }
    >
      {isHappeningNow && (
        <>
          <div className="absolute -top-2 -right-2 bg-green-500 w-4 h-4 border-full rounded-full animate-ping"></div>
          <div className="absolute -top-2 -right-2 bg-green-500 w-4 h-4 border-full rounded-full"></div>
        </>
      )}
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
    <div className="flex flex-row justify-center w-full active:hover:animate-wiggle">
      <input
        className="flex w-full border-2 border-emerald-300 dark:border-emerald-950 dark:text-emerald-50 dark:bg-emerald-950 outline-none bg-emerald-50 text-emerald-800 px-2"
        type="text"
        placeholder="Pesquise aqui"
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
};

const CoursesDropdown = ({ types, setType }) => {
  const options = [...new Set(types)].map((type, index) => {
    return (
      <option key={index} value={type}>
        {type}
      </option>
    );
  });

  return (
    <div className="flex flex-row justify-center w-full sm:max-xl:w-4/5 active:hover:animate-wiggle">
      <select
        className="flex w-full border-2 border-emerald-300 dark:border-emerald-950 dark:text-emerald-50 dark:bg-emerald-950 outline-none p-2 text-emerald-800 bg-emerald-50"
        onChange={(e) => {
          setType(e.target.value);
        }}
      >
        <option value="all">tipos</option>
        {options}
      </select>
    </div>
  );
};

const CategoryDropdown = ({ categories, setCategory }) => {
  const options = [...new Set(categories)].map((category, index) => {
    return (
      <option key={index} value={category}>
        {category}
      </option>
    );
  });

  return (
    <div className="flex flex-row justify-center w-full sm:max-xl:w-4/5 active:hover:animate-wiggle">
      <select
        className="flex w-full border-2 border-emerald-300 dark:border-emerald-950 dark:text-emerald-50 dark:bg-emerald-950 outline-none p-2 text-emerald-800 bg-emerald-50"
        onChange={(e) => {
          setCategory(e.target.value);
        }}
      >
        <option value="all">público</option>
        {options}
      </select>
    </div>
  );
};

const Timetable = ({ courses }) => {
  const [type, setType] = useState("all");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  const sortedByDate = sortByDate(courses);
  const filteredCourses = filterByAll(sortedByDate, category, type, search);

  const withoutOldThanToday = filteredCourses.filter((course) => {
    return !isOldertThanToday(course);
  });

  const types = courses.map((course) => course.type.toLowerCase());
  const categories = courses.map((course) => course.category.toLowerCase());

  const cards = withoutOldThanToday.map((course, index) => {
    return <Card course={course} key={index} />;
  });

  return (
    <>
      <div className="flex flex-row justify-around p-4 gap-4">
        <SearchBar setSearch={setSearch} />
        <div className="flex flex-row gap-4">
          <CoursesDropdown types={types} setType={setType} />
          <CategoryDropdown categories={categories} setCategory={setCategory} />
        </div>
      </div>
      <div className="grid h-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {cards}
      </div>
    </>
  );
};

export default Timetable;
