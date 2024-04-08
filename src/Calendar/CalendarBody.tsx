import { ReactNode } from 'react';
import {
  getDaysInMonth,
  add,
  sub,
  format,
  startOfMonth,
  startOfYear,
  getYear,
  isBefore,
  isAfter,
  isSameDay,
} from 'date-fns';
import { CalendarBtn, CalendarTd, CalendarBodyTable } from './style';
import { MODES } from './utils';
import { CalendarBodyProps, renderCalendarRowsProps } from './interface';

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// generate date grids
const getCalendarDays = (date: Date) => {
  const firstDateOfMonth = startOfMonth(date);
  const firstDateOfNextMonth = add(firstDateOfMonth, { months: 1 });
  const daysInMonth = getDaysInMonth(firstDateOfMonth);
  const weekNo = firstDateOfMonth.getDay();
  const grids = 42;

  const curMonth = Array.from(Array(daysInMonth), (_, i) =>
    add(firstDateOfMonth, { days: i })
  );

  const preMonth = Array.from(Array(weekNo), (_, i) =>
    sub(firstDateOfMonth, { days: weekNo - i })
  );

  const nextMonth = Array.from(Array(grids - weekNo - daysInMonth), (_, i) =>
    add(firstDateOfNextMonth, { days: i })
  );

  return [...preMonth, ...curMonth, ...nextMonth];
};

const getCalendarMonths = (date: Date) => {
  const firstDateOfYear = startOfYear(date);
  const grids = 12;
  const months = Array.from(Array(grids), (_, i) =>
    add(firstDateOfYear, { months: i })
  );
  return months;
};

const getCalendarYears = (date: Date) => {
  const year = getYear(date);
  const startYear = year - (year % 10);
  const firstDateOfDecade = new Date(startYear, 1, 1);
  const curDecade = Array.from(Array(10), (_, i) =>
    add(firstDateOfDecade, { years: i })
  );
  const preDecade = sub(firstDateOfDecade, { years: 1 });
  const nextDecade = add(firstDateOfDecade, { years: 10 });

  return [preDecade, ...curDecade, nextDecade];
};
// apply logic and style on node
const renderDays = ({
  displayDate,
  dateArr,
  selectedDate,
  onClick,
  disabledDate,
}: renderCalendarRowsProps) => {
  const rows: ReactNode[] = [];
  const today = new Date();
  for (let i = 0; i < dateArr.length; i += 7) {
    const row = dateArr.slice(i, i + 7);
    rows.push(
      <tr key={format(displayDate, 'yyyy-MM-dd') + i}>
        {row.map((date) => {
          let color = 'black';
          let selected = false;
          let disabled = false;
          if (date.getMonth() !== dateArr[7].getMonth()) {
            color = 'gray';
          }
          if (format(date, 'yyyy-MM-dd') === format(today, 'yyyy-MM-dd')) {
            color = '#3d44db';
          }
          if (
            (selectedDate.start &&
              selectedDate.end &&
              isBefore(date, selectedDate.end) &&
              isAfter(date, selectedDate.start)) ||
            (selectedDate.start && isSameDay(date, selectedDate.start)) ||
            (selectedDate.end && isSameDay(date, selectedDate.end))
          ) {
            selected = true;
            color = 'white';
          }
          if (disabledDate && disabledDate(date, dateArr)) {
            disabled = true;
          }

          return (
            <CalendarTd key={format(date, 'yyyy-MM-dd')}>
              <CalendarBtn
                color={color}
                selected={selected}
                onClick={() => onClick(date)}
                disabled={disabled}
              >
                {format(date, 'dd')}
              </CalendarBtn>
            </CalendarTd>
          );
        })}
      </tr>
    );
  }
  return rows;
};

const renderMonths = ({
  dateArr,
  displayDate,
  onClick,
  disabledDate,
}: renderCalendarRowsProps) => {
  const rows: ReactNode[] = [];
  for (let i = 0; i < dateArr.length; i += 4) {
    const row = dateArr.slice(i, i + 4);
    rows.push(
      <tr key={format(displayDate, 'yyyy-MM') + i}>
        {row.map((date) => {
          let color = 'black';
          let selected = false;
          let disabled = false;
          if (format(date, 'yyyy-MM') === format(displayDate, 'yyyy-MM')) {
            selected = true;
            color = 'white';
          }
          if (disabledDate && disabledDate(date, dateArr)) {
            disabled = true;
          }
          return (
            <CalendarTd key={format(date, 'yyyy-MM')}>
              <CalendarBtn
                size="18px"
                color={color}
                selected={selected}
                disabled={disabled}
                onClick={() => onClick(date)}
              >
                {format(date, 'MMM')}
              </CalendarBtn>
            </CalendarTd>
          );
        })}
      </tr>
    );
  }
  return rows;
};

const renderYears = ({
  dateArr,
  displayDate,
  onClick,
  disabledDate,
}: renderCalendarRowsProps) => {
  const rows: ReactNode[] = [];
  for (let i = 0; i < dateArr.length; i += 4) {
    const row = dateArr.slice(i, i + 4);
    rows.push(
      <tr key={format(displayDate, 'yyyy') + i}>
        {row.map((date) => {
          let color = 'black';
          let selected = false;
          let disabled = false;
          if (date === dateArr[0] || date === dateArr[dateArr.length - 1]) {
            color = 'gray';
          }
          if (format(date, 'yyyy') === format(displayDate, 'yyyy')) {
            selected = true;
            color = 'white';
          }
          if (disabledDate && disabledDate(date, dateArr)) {
            disabled = true;
          }
          return (
            <CalendarTd key={format(date, 'yyyy')}>
              <CalendarBtn
                size="18px"
                color={color}
                selected={selected}
                disabled={disabled}
                onClick={() => onClick(date)}
              >
                {format(date, 'yyyy')}
              </CalendarBtn>
            </CalendarTd>
          );
        })}
      </tr>
    );
  }
  return rows;
};

export default function CalendarBody({
  onSelectStart,
  onSelectEnd,
  mode,
  setMode,
  displayDate,
  setDisplayDate,
  disabledDate,
  selectedDate,
  setSelectedDate,
}: CalendarBodyProps) {
  const selectDate = (date: Date) => {
    const handleDateClick = (date: Date) => {
      // earlier than current option will reset start date value;
      if (!selectedDate.start || isBefore(date, selectedDate.start)) {
        setSelectedDate((pre) => ({ start: date, end: pre.end }));
        onSelectStart(date);
      } else if (!selectedDate.end) {
        setSelectedDate((pre) => ({ start: pre.start, end: date }));
        onSelectEnd(date);
      } else {
        setSelectedDate({ start: date, end: null });
        onSelectStart(date);
      }
    };
    handleDateClick(date);
  };
  const selectMonth = (date: Date) => {
    setDisplayDate(date);
    setMode(MODES.days);
  };
  const selectYear = (date: Date) => {
    setDisplayDate(date);
    setMode(MODES.months);
  };
  return (
    <>
      <CalendarBodyTable>
        <tbody>
          {mode === MODES.days && (
            <>
              <tr>
                {daysOfWeek.map((weekNo) => (
                  <CalendarTd key={weekNo}>
                    <strong>{weekNo}</strong>
                  </CalendarTd>
                ))}
              </tr>
              {renderDays({
                displayDate: displayDate,
                dateArr: getCalendarDays(displayDate),
                selectedDate: selectedDate,
                onClick: selectDate,
                disabledDate: disabledDate,
              })}
            </>
          )}
          {mode === MODES.months &&
            renderMonths({
              dateArr: getCalendarMonths(displayDate),
              displayDate: displayDate,
              selectedDate,
              onClick: selectMonth,
              disabledDate: disabledDate,
            })}
          {mode === MODES.years &&
            renderYears({
              dateArr: getCalendarYears(displayDate),
              displayDate: displayDate,
              selectedDate,
              onClick: selectYear,
              disabledDate: disabledDate,
            })}
        </tbody>
      </CalendarBodyTable>
    </>
  );
}
