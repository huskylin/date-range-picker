import { useState, forwardRef, MouseEvent } from 'react';
import { isValid } from 'date-fns';
import { Card, CalendarContainer } from './style';
import CalendarHeader from './CalendarHeader';
import CalendarBody from './CalendarBody';
import { MODES } from './utils';
import { CalendarProps, SelectedDate } from './interface';

const Calendar = forwardRef<HTMLDivElement, CalendarProps>(
  (
    {
      date,
      disabledDate,
      onSelectStart,
      onSelectEnd,
      selectedDate,
      setSelectedDate,
      disableHeader,
    }: CalendarProps,
    ref
  ) => {
    const [mode, setMode] = useState(MODES.days);
    const [displayDate, setDisplayDate] = useState(
      isValid(date) ? date : new Date()
    );

    const handleCalendarClick = (event: MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();
    };

    return (
      <>
        <Card ref={ref} onClick={handleCalendarClick}>
          <CalendarContainer>
            <CalendarHeader
              mode={mode}
              setMode={setMode}
              displayDate={displayDate}
              setDisplayDate={setDisplayDate}
              disableHeader={disableHeader}
            ></CalendarHeader>
            <CalendarBody
              onSelectStart={onSelectStart}
              onSelectEnd={onSelectEnd}
              mode={mode}
              setMode={setMode}
              displayDate={displayDate}
              setDisplayDate={setDisplayDate}
              disabledDate={disabledDate}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            ></CalendarBody>
          </CalendarContainer>
        </Card>
      </>
    );
  }
);

export default Calendar;
