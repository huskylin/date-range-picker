export interface DatePickerProps {
    dateFormat?: string;
    disabledDate?: (date: Date, dateArr: Date[]) => boolean;
    onSelectStart?: (date: Date) => void;
    onSelectEnd?: (date: Date | null) => void;
    date?: Date;
    disableHeader?: boolean;
}
export interface SelectedDate {
    start: Date | null;
    end: Date | null;
}