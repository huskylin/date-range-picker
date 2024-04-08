import DatePicker from './DateRangePicker/DateRangePicker';
import { isBefore, isSameMonth, startOfDay } from 'date-fns';

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
          <DatePicker
            onSelectStart={(date) => console.log(`start:${date}`)}
            onSelectEnd={(date) => console.log(`end:${date}`)}
          ></DatePicker>
        </div>
        <div>
          <h2>Customize Input Text Format</h2>
          <p>
            format info:
            <a href="https://date-fns.org/v2.30.0/docs/format">
              date-fns#format
            </a>
          </p>
          <p>dateFormat="MM/dd/yyyy"</p>
          <DatePicker dateFormat="MM/dd/yyyy"></DatePicker>
        </div>
        <div>
          <h2>Disabled Date</h2>
          <p>disable date before '2024-04-01'</p>
          <DatePicker
            disabledDate={(date) =>
              isBefore(startOfDay(date), startOfDay(new Date('2024-04-01')))
            }
          ></DatePicker>
        </div>
      </div>
    </>
  );
};

export default App;
