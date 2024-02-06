import { useEffect, useState } from "react";
import { getSchedules } from "../schedule/ScheduleStore";
import { Schedule } from "../schedule/ScheduleStore";
import dayjs from "dayjs";

const DayoffManager = () => {
  const [dayoffList1, setDayoffList] = useState();
  const [dDay, setDDay] = useState(0);

  const dayoffList = async () => {
    const allList = await getSchedules("yj");
    const filteredList = allList.schedule
      .map((schedule: Schedule) => {
        if (schedule.state !== "근무중") return schedule;
      })
      .filter((data) => data !== undefined);
    console.log(filteredList);
    setDayoffList(filteredList);
  };
  useEffect(() => {
    dayoffList();
    dDaySet();
  }, []);

  const dDaySet = () => {
    const now = dayjs();
    const currentYear = now.get("y");
    // const today = now.format("YYYY-MM-DD HH:mm");
    const lastDate = dayjs(currentYear + "-12-31");

    const dayDiff = lastDate.diff(now, "day");
    setDDay(dayDiff);
  };

  return (
    <div>
      <div className="flex flex-row  justify-between">
        <div className="flex flex-row items-center">
          <div className="text-titleMd text-gray00 font-bold">연차 관리</div>
          <div className="pl-3">
            남은 연차 : <span>5.5</span>일 (<span>{dDay}</span>일 후 소멸)
          </div>
        </div>
      </div>
      <ul></ul>
      <table className="table-auto">
        <thead>
          <tr className="font-bold">
            <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-3 pb-3 text-slate-400 dark:text-slate-200 text-left">
              사용예정일
            </th>
            <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-3 pb-3 text-slate-400 dark:text-slate-200 text-left">
              일수
            </th>
            <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-3 pb-3 text-slate-400 dark:text-slate-200 text-left">
              내용
            </th>
          </tr>
        </thead>
        <tbody>
          {dayoffList1 &&
            dayoffList1.map(({ state, date, time }) => (
              <tr key={date + time}>
                <td className="border-b dark:border-slate-600 font-medium p-4 pr-20 pl-8 text-slate-400 dark:text-slate-200 text-left text-center">
                  {date}
                </td>
                <td className="border-b dark:border-slate-600 font-medium p-4 pr-20 pl-8 text-slate-400 dark:text-slate-200 text-left text-center">
                  {state === "반차" ? "0.5일" : "1일"}
                </td>
                <td className="border-b dark:border-slate-600 font-medium p-4 pr-20 pl-8 text-slate-400 dark:text-slate-200 text-left text-center">
                  {state === "반차" ? "반차" : "연차"}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
export default DayoffManager;
