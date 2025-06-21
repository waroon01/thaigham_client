import { useState, useRef, useEffect } from "react";
import { formatDate } from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { getEventCalendar } from "../../api/studentApi";

export default function CalendarUser() {
  const calendarRef = useRef(null);

  const [weekendsVisible, setWeekendsVisible] = useState(true);
  const [currentEvents, setCurrentEvents] = useState([]);
  const [calendarEvents, setCalendarEvents] = useState([]); // 🟡 ข้อมูลสมมุติจาก backend

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showAllEventsModal, setShowAllEventsModal] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState("");


  useEffect(() => {

    fetchEvent()

  }, []);

  async function fetchEvent(){
    const res = await getEventCalendar()
    const events = res.data.data
    console.log(events)

    setCalendarEvents(events);

  }

  function handleWeekendsToggle() {
    setWeekendsVisible(!weekendsVisible);
  }

  function handleEventClick(clickInfo) {
    setSelectedEvent(clickInfo.event);
  }


  function handleEvents(events) {
    setCurrentEvents(events);
  }

  function handleSelect(){
    console.log("ddddddd")
  }


  function handleMonthChange(event) {
    setSelectedMonth(event.target.value);
  }

  function filterEventsByMonth(events, month) {
    if (!month) return events;

    return events.filter((event) => {
      const eventDate = new Date(event.start);
      return eventDate.getMonth() + 1 === parseInt(month);
    });
  }

  return (
    <div className="flex flex-col md:flex-row p-4 gap-4 ">
        
        {/* <div className="bg-white p-4 rounded-xl shadow flex justify-between items-center gap-3 mb-3"> 
          <label className="inline-flex items-center gap-2 mb-2 text-sm">
          <input
            type="checkbox"
            checked={weekendsVisible}
            onChange={handleWeekendsToggle}
            className="w-4 h-4"
          />
          แสดงวันเสาร์-อาทิตย์
        </label>

        <button
          onClick={() => setShowAllEventsModal(true)}
          className="bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 hover:cursor-pointer mt-4 w-auto px-3"
        >
          Show All Events
        </button>
        </div>       */}

        <div className="w-full bg-white p-4 rounded-xl shadow max-h-screen">
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          initialView="dayGridMonth"
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={weekendsVisible}
          events={calendarEvents} // 🔹 ใช้ข้อมูลจาก state
          select={handleSelect}
          eventContent={renderEventContent}
          eventClick={handleEventClick}
          eventsSet={handleEvents}
          height="auto" // 👈 เพิ่มตรงนี้ให้มันไม่เกิน div
        />
      </div>

      {/* Modal: Event Details */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
              onClick={() => setSelectedEvent(null)}
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4">{selectedEvent.title}</h2>
            <p className="text-sm mb-2">
              <strong>Start:</strong>{" "}
              {formatDate(selectedEvent.start, {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
            <p className="text-sm mb-2">
              <strong>End:</strong>{" "}
              {selectedEvent.end
                ? formatDate(selectedEvent.end, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : "N/A"}
            </p>
            <p className="text-sm mb-4">
              <strong>All Day:</strong> {selectedEvent.allDay ? "Yes" : "No"}
            </p>
            <p className="text-sm mb-4">
              <strong className="px-2">รายละเอียด:</strong>
              {selectedEvent.extendedProps?.eventdetail || "ไม่มี"}
            </p>

          </div>
        </div>
      )}

      {/* Modal: All Events */}
      {showAllEventsModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
              onClick={() => setShowAllEventsModal(false)}
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4">All Events</h2>
            <label className="block text-sm mb-2">
              Select Month:
              <select
                value={selectedMonth}
                onChange={handleMonthChange}
                className="w-full border p-2 rounded mt-1"
              >
                <option value="">All Months</option>
                {[...Array(12)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {new Date(0, i).toLocaleString("default", { month: "long" })}
                  </option>
                ))}
              </select>
            </label>
            <ul className="space-y-2">
              {filterEventsByMonth(calendarEvents, selectedMonth).map((event) => (
                <li key={event.id + event.start}>
                  <p className="text-sm font-semibold">{event.title}</p>
                  <p className="text-xs text-gray-500">
                    {formatDate(event.start, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                  <p className="text-sm">
                    {/* <strong>รายละเอียด:</strong>{" "} */}
                    <span>รายละเอียด</span>{event.eventdetail || "ไม่มี"}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

function renderEventContent(eventInfo) {
  return (
    <div className="flex items-center gap-1 text-xs">
      <span
        className="inline-block w-2 h-2 rounded-full"
        style={{ backgroundColor: eventInfo.event.backgroundColor || "#D50B8B" }} // default: blue-600
      ></span>
      <span>{eventInfo.event.title}</span>
    </div>
  );
}
