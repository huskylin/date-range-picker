import DatePicker from './DateRangePicker/DateRangePicker';
import { isSameMonth } from 'date-fns';

const App = () => {
  const nonCurrentMonth = (date: Date, dateArr: Date[]) => {
    return !isSameMonth(date, dateArr[7]);
  };
  return (
    <>
      <div>
        <h1>Calendar Demo Page</h1>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
        }}
      >
        <div>
          <h2>Current Month Only</h2>
          <DatePicker
            disabledDate={nonCurrentMonth}
            disableHeader={true}
          ></DatePicker>
        </div>
        <div>
          <h2>Cross Months</h2>
          <DatePicker></DatePicker>
        </div>
      </div>
    </>
  );
};

export default App;
