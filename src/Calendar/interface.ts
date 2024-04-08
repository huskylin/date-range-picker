import { MODES } from "./utils";

export interface SelectedDate {
    start: Date | null;
    end: Date | null;
}

export interface CalendarProps {
    date: Date;
    onSelectStart: (date: Date) => void;
    onSelectEnd: (date: Date) => void;
    disabledDate?: (date: Date, dateArr: Date[]) => boolean;
    selectedDate: SelectedDate;
    setSelectedDate: React.Dispatch<React.SetStateAction<SelectedDate>>;
    disableHeader?: boolean;
}

export interface renderCalendarRowsProps {
    displayDate: Date;
    dateArr: Date[];
    selectedDate: SelectedDate;
    onClick: (date: Date) => void;
    disabledDate?: (date: Date, dateArr: Date[]) => boolean;
}

export interface CalendarBodyProps {
    onSelectStart: (date: Date) => void;
    onSelectEnd: (date: Date) => void;
    selectedDate: SelectedDate;
    setSelectedDate: React.Dispatch<React.SetStateAction<SelectedDate>>;
    mode: MODES;
    setMode: (mode: MODES) => void;
    displayDate: Date;
    setDisplayDate: (date: Date) => void;
    disabledDate?: (date: Date, dateArr: Date[]) => boolean;
}

export interface CalendarHeaderProps {
    mode: MODES;
    setMode: (mode: MODES) => void;
    displayDate: string | number | Date;
    setDisplayDate: (date: Date) => void;
    disableHeader?: boolean;
}