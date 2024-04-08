import { useState, useRef, useEffect, MutableRefObject } from 'react';
import { format, isValid } from 'date-fns';
import Calendar from '../Calendar/Calendar';
import { InputWrapper, DateInput, DateIcon, CalendarWrapper } from './style';
import { DatePickerProps, SelectedDate } from './interface';

export default function DatePicker({
  dateFormat = 'yyyy-MM-dd',
  disabledDate,
  onSelectStart = (e) => {},
  onSelectEnd = (e) => {},
  date,
  disableHeader,
}: DatePickerProps) {
  const [defaultDate] = useState(isValid(date) ? (date as Date) : new Date());
  const [selectedDate, setSelectedDate] = useState<SelectedDate>({
    start: null,
    end: null,
  });
  const [isOpen, setIsOpen] = useState(false);
  const calendarRef: MutableRefObject<HTMLDivElement | null> = useRef(null);

  const toggleCalendar = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const handleSelectStart = (date: Date) => {
    setSelectedDate((pre) => ({ start: date, end: pre.end }));
  };
  const handleSelectEnd = (date: Date) => {
    setSelectedDate((pre) => ({ start: pre.start, end: date }));
  };

  // close calendar if click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const targetNode = event.target as Node;
      if (calendarRef.current && !calendarRef.current.contains(targetNode)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [calendarRef]);

  return (
    <>
      <InputWrapper>
        <DateInput
          type="text"
          placeholder="Select date"
          readOnly
          value={`${
            selectedDate.start && format(selectedDate.start, dateFormat)
          } ~ ${selectedDate.end && format(selectedDate.end, dateFormat)}`}
        />
        <DateIcon onClick={toggleCalendar}>📅</DateIcon>
        {isOpen && (
          <CalendarWrapper>
            <Calendar
              ref={calendarRef}
              onSelectStart={handleSelectStart}
              onSelectEnd={handleSelectEnd}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              disabledDate={disabledDate}
              disableHeader={disableHeader}
              date={defaultDate}
            />
          </CalendarWrapper>
        )}
      </InputWrapper>
    </>
  );
}
