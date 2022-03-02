import moment from 'moment';
import 'moment/locale/ja';
import React from 'react';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);
const eventList = [
  {
    id: 0,
    title: 'All Day Event very long title',
    allDay: false,
    start: new Date('2020-03-01 9:00'),
    end: new Date('2020-03-01 13:00'),
  },
  {
    id: 1,
    title: 'Long Event',
    allDay: false,
    start: new Date('2021-11-20 15:00'),
    end: new Date('2021-11-20 17:00'),
  },
];

const CalendarPage = (): JSX.Element => {
  return (
    <div>
      <Calendar
        localizer={localizer}
        events={eventList}
        timeslots={2}
        defaultView={Views.MONTH}
        onSelectEvent={(event: { title: any }) => alert(event.title)}
        views={['month', 'week', 'day']}
        style={{ height: 500 }}
      />
    </div>
  );
};

export default CalendarPage;
