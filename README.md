# Calendar and DateRangePicker using React.js
The datepicker allows users to select a date range from calendar.

## Dependencies
* react.js
* date-fns
* styled-components


## Usage
1. To install the dependencies, run    `npm install`
2. run the code     `npm run dev`

## Example
``` JSX
<DatePicker
    onSelectStart={(date) => console.log(`start:${date}`)}
    onSelectEnd={(date) => console.log(`end:${date}`)}
    date={new Date('2023-01-01')}
></DatePicker>
```
for more info, please check the demo page

## API
### DateRangePicker
| Property      | Description                                                                                  | Type                                                   | Default      |
|:------------- | -------------------------------------------------------------------------------------------- |:------------------------------------------------------ |:------------ |
| date          | Set a default Date                                                                           | Date                                                   | new Date()   |
| disableHeader              |   Set the Header to disable and no actions                                                                                           |   Boolean                                                     |  false            |
| disabledDate  | Set the date that cannot be selected                                                         | function(date, dateArr)                                | -            |
| dateFormat    | To set the date format. refer to [date-fns#format](https://date-fns.org/v2.30.0/docs/format) | [formatType](https://date-fns.org/v2.30.0/docs/format) | 'yyyy-MM-dd' |
| onSelectStart | Callback function, can be executed when selected a date start                                | function(date)                                         | -            |
| onSelectEnd   | Callback function, can be executed when selected a date start                                | function(date)                                         | -            |



