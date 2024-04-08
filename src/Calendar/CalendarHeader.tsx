import { add, sub, getYear } from 'date-fns';
import { CalendarBtn, CalendarHeaderContainer } from './style';
import { MODES } from './utils';
import { CalendarHeaderProps } from './interface';

export default function CalendarHeader({
  mode,
  setMode,
  displayDate,
  setDisplayDate,
  disableHeader = false,
}: CalendarHeaderProps) {
  const pre = () => {
    if (mode === MODES.days) {
      setDisplayDate(sub(displayDate, { months: 1 }));
    }
    if (mode === MODES.months) {
      setDisplayDate(sub(displayDate, { years: 1 }));
    }
    if (mode === MODES.years) {
      setDisplayDate(sub(displayDate, { years: 10 }));
    }
  };

  const next = () => {
    if (mode === MODES.days) {
      setDisplayDate(add(displayDate, { months: 1 }));
    }
    if (mode === MODES.months) {
      setDisplayDate(add(displayDate, { years: 1 }));
    }
    if (mode === MODES.years) {
      setDisplayDate(add(displayDate, { years: 10 }));
    }
  };

  const rendarTitle = () => {
    const displayYear = getYear(displayDate);
    if (mode === MODES.days) {
      return (
        <CalendarBtn
          size="18px"
          onClick={() => setMode(MODES.months)}
          disabled={disableHeader}
        >
          <strong>
            {displayDate.toLocaleString('default', {
              // @ts-ignore
              month: 'long',
              year: 'numeric',
            })}
          </strong>
        </CalendarBtn>
      );
    }
    if (mode === MODES.months) {
      return (
        <CalendarBtn
          size="18px"
          onClick={() => setMode(MODES.years)}
          disabled={disableHeader}
        >
          <strong>{displayYear}</strong>
        </CalendarBtn>
      );
    }
    if (mode === MODES.years) {
      const startYear = displayYear - (displayYear % 10);
      const endYear = startYear + 10;
      return (
        <CalendarBtn size="18px" onClick={() => {}} disabled>
          <strong style={{ fontSize: '20px', padding: '8px' }}>
            {startYear} ~ {endYear}
          </strong>
        </CalendarBtn>
      );
    }
  };

  return (
    <CalendarHeaderContainer>
      <CalendarBtn size="20px" onClick={() => pre()} disabled={disableHeader}>
        {'<'}
      </CalendarBtn>
      {rendarTitle()}
      <CalendarBtn size="20px" onClick={() => next()} disabled={disableHeader}>
        {'>'}
      </CalendarBtn>
    </CalendarHeaderContainer>
  );
}
