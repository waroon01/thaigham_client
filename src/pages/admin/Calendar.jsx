import { useState, useRef, useEffect } from "react";
import { formatDate } from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { createEventId } from "../../utils/utilsFullcalendar"; // คุณยังสามารถใช้ฟังก์ชันนี้สร้าง id ใหม่ได้
import { useForm } from "react-hook-form";
import { createEventCalendar, getEventCalendar } from "../../api/studentApi";



export default function Calendar() {
  const calendarRef = useRef(null);

  const [weekendsVisible, setWeekendsVisible] = useState(true);
  const [currentEvents, setCurrentEvents] = useState([]);
  const [calendarEvents, setCalendarEvents] = useState([]); // 🟡 ข้อมูลสมมุติจาก backend

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showAllEventsModal, setShowAllEventsModal] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()


  useEffect(() => {
    // 🟡 Mock fetch events (แทนที่ด้วย API จริงได้)

    // const mockEventsFromAPI = [
    //   {
    //     id: "1",
    //     title: "ประชุมโครงการ",
    //     start: "2025-05-10T10:00:00",
    //     end: "2025-05-10T12:00:00",
    //     allDay: false,
    //     extendedProps: {
    //       eventdetail: "ประชุมกับทีมพัฒนาระบบ",
    //     },
    //   },
    //   {
    //     id: "2",
    //     title: "อบรม React",
    //     start: "2025-05-12",
    //     allDay: true,
    //     extendedProps: {
    //       eventdetail: "อบรมตลอดวัน",
    //     },
    //   },
    // ];
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

  function handleDateSelect(selectInfo) {
    const title = prompt("Please enter a new title for your event");
    const calendarApi = selectInfo.view.calendar;
    calendarApi.unselect();

    if (title) {
      const newItem = {
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
        extendedProps: {
          eventdetail: "",
        },
      };

      calendarApi.addEvent(newItem);
      setCalendarEvents((prev) => [...prev, newItem]);
    }
  }

  function handleEventClick(clickInfo) {
    console.log(clickInfo.event)
    setSelectedEvent(clickInfo.event);
  }

  function handleDeleteEvent() {
    if (selectedEvent) {
      selectedEvent.remove();
      setSelectedEvent(null);
    }
  }

  function handleEvents(events) {
    setCurrentEvents(events);
  }

  const onSubmit = async(data) => {
    const calendarApi = calendarRef.current?.getApi();
    if (!calendarApi) return;
  
    const newCalendarEvent = {
      id: createEventId(),
      title: data.title,
      start: data.start,
      end: data.end || null,
      allDay: data.allDay || false,
      eventdetail: JSON.stringify(data.eventdetail), // 🔹 ย้ายมาข้างนอก
    };

    const res = await createEventCalendar(newCalendarEvent)
    console.log(res.data)


    calendarApi.addEvent(newCalendarEvent);
    setCalendarEvents((prev) => [...prev, newCalendarEvent]);
    reset(); // เคลียร์ฟอร์ม
  };
  

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
    <div className="flex flex-col md:flex-row p-4 gap-4">
      {/* Sidebar */}
      <div className="w-full md:w-1/4">
        {/* Form */}
        
        <div className="bg-white p-4 rounded-xl shadow space-y-3">
          <h2 className="text-xl font-semibold text-gray-700">เพิ่มกิจกรรม</h2>
          <label className="inline-flex items-center gap-2 mb-2 text-sm">
          <input
            type="checkbox"
            checked={weekendsVisible}
            onChange={handleWeekendsToggle}
            className="w-4 h-4"
          />
          แสดงวันเสาร์-อาทิตย์
        </label>
        <form onSubmit={handleSubmit(onSubmit)}>
  <label className="block text-sm">
    Title
    <input
      {...register("title")}
      className="w-full border p-2 rounded mt-1 text-xs"
    />
    {errors.title && <p className="text-red-500 text-xs">{errors.title.message}</p>}
  </label>

  <label className="block text-sm mt-2">
    Start
    <input
      type="datetime-local"
      {...register("start")}
      className="w-full border p-2 rounded mt-1 text-xs"
    />
    {errors.start && <p className="text-red-500 text-xs">{errors.start.message}</p>}
  </label>

  <label className="block text-sm mt-2">
    End
    <input
      type="datetime-local"
      {...register("end")}
      className="w-full border p-2 rounded mt-1 text-xs"
    />
  </label>

  <label className="block text-sm mt-2">
    รายละเอียด
    <input
      {...register("eventdetail")}
      className="w-full border p-2 rounded mt-1 text-xs"
    />
  </label>

  <label className="inline-flex items-center gap-2 mt-2 text-xs">
    <input
      type="checkbox"
      {...register("allDay")}
      className="w-4 h-4"
    />
    All Day
  </label>

  <button
    type="submit"
    className="w-full bg-blue-600 text-white py-1 rounded hover:bg-blue-700 mt-3 text-sm"
  >
    Add Event
  </button>
</form>
</div>
        <button
          onClick={() => setShowAllEventsModal(true)}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 mt-4"
        >
          Show All Events
        </button>
      </div>

      {/* Calendar */}
      <div className="w-full md:w-3/4 bg-white p-4 rounded-xl shadow">
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
          select={handleDateSelect}
          eventContent={renderEventContent}
          eventClick={handleEventClick}
          eventsSet={handleEvents}
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

            <button
              onClick={handleDeleteEvent}
              className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
            >
              Delete Event
            </button>
          </div>
        </div>
      )}

      {/* Modal: All Events */}
      {showAllEventsModal && (
        <div className="fixed inset-0 bg-violet-800/50 flex justify-center items-center z-50">
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
                    <strong>รายละเอียด:</strong>{" "}
                    {event.eventdetail || "ไม่มี"}
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
