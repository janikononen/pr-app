import { useGetTranings } from "../components/fetch-functiot&custom-hookit/useGetTrainings";
import dayjs from "dayjs";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useEffect, useState } from "react";
import { CalendarEvent } from "../types";
import "../calendar.css";

export default function CalendarPage() {
  const { trainings } = useGetTranings();
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  // luodaan kalenteria varten lista tapahtumista
  useEffect(() => {
    document.title = "Training Calendar";
    if (trainings && trainings.length > 0) {
      const newEvents = trainings.map((training) => ({
        start: dayjs(training.date).toDate(),
        end: dayjs(training.date).add(training.duration, "minute").toDate(),
        title: training.activity,
        extendedProps: {
          customerName:
            training.customer.firstname + " " + training.customer.lastname,
        },
      }));
      setEvents(newEvents);
      console.log(events);
    }
  }, [trainings]);

  // Muokataan yksittäisen tapahtuman ulkoasua kalenterissa
  const renderEventContent = (eventInfo: any) => {
    return (
      <div className="calendarEvent">
        <b>{eventInfo.event.title}</b>
        <div className="EventLine">
          {eventInfo.event.extendedProps.customerName}
        </div>
        <div className="EventLine">
          {dayjs(eventInfo.event.start).format("hh.mm")} -{" "}
          {dayjs(eventInfo.event.end).format("hh.mm")}
        </div>
      </div>
    );
  };

  return (
    <div>
      <h1>Training Calendar</h1>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        initialView="dayGridMonth"
        events={events}
        editable={false}
        selectable={true}
        dayMaxEvents={true}
        weekends={true}
        // luodaan toiminnnallisuus, että kun käyttäjä klikkaa tapahtumaa, se avaa ikkunan
        // jossa näkyy tapahtuman tiedot
        eventClick={(info) => {
          alert(
            "Event: " +
              info.event.title +
              "\n" +
              "Customer: " +
              info.event.extendedProps.customerName +
              "\n" +
              "Start: " +
              dayjs(info.event.start).format("hh.mm") +
              "\n" +
              "End: " +
              dayjs(info.event.end).format("hh.mm")
          );
        }}
        eventContent={renderEventContent}
      />
    </div>
  );
}
