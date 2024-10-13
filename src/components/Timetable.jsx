const Card = ({ course }) => {
  const { type, title, location, participants } = course;
  const courseFullDate = new Date(course.start);
  const startTime = courseFullDate.toTimeString().slice(0, 5);
  const endTime = courseFullDate.toTimeString().slice(0, 5);

  return (
    <div className=" bg-emerald-100 p-2 border-emerald-400 border-2 shadow">
      <p className="w-min text-emerald-950 lowercase text-sm">{type}</p>
      <p className="text-emerald-800 capitalize text-lg">{title}</p>
      {participants.map((participant, index) => {
        return (
          <p key={index} className="text-emerald-800 capitalize text-sm">
            {participant}
          </p>
        );
      })}
      <div className="flex justify-between flex-row">
        <div className="flex gap-2 flex-row">
          <p className="text-emerald-800 capitalize text-sm">{startTime}</p>
          <p className="text-emerald-800 capitalize text-sm">{endTime}</p>
        </div>
        <p className="text-emerald-800 capitalize text-sm">{location}</p>
      </div>
    </div>
  );
};

const Timetable = ({ courses }) => {
  const cards = courses.map((course, index) => {
    return <Card key={index} course={course} />;
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4">{cards}</div>
  );
};

export default Timetable;
