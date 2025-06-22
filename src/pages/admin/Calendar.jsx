import { useState, useRef, useEffect } from "react";
import { formatDate } from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { createEventId } from "../../utils/utilsFullcalendar";
import { useForm } from "react-hook-form";
import { createEventCalendar, deleteEventCalendar } from "../../api/studentApi";
import useSchoolStore from "../../store/school-Store";

export default function Calendar() {
  const calendarRef = useRef(null);
  const [weekendsVisible, setWeekendsVisible] = useState(true);
  const [currentEvents, setCurrentEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showAllEventsModal, setShowAllEventsModal] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState("");
  const hasFetched = useRef(false);
  const [selectedStart, setSelectedStart] = useState("");
  const [selectedEnd, setSelectedEnd] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const calendarEvents = useSchoolStore((state) => state.calendarEvents);
  const setCalendarEvents = useSchoolStore((state) => state.setCalendarEvents);
  const actionCalendarLoad = useSchoolStore((state) => state.actionCalendarLoad);

  useEffect(() => {
    if (!hasFetched.current && calendarEvents.length === 0) {
      actionCalendarLoad();
      hasFetched.current = true;
    }
  }, [actionCalendarLoad, calendarEvents]);

  function handleWeekendsToggle() {
    setWeekendsVisible(!weekendsVisible);
  }

  // function handleDateSelect(selectInfo) {
  //   const title = prompt("Please enter a new title for your event");
  //   const calendarApi = selectInfo.view.calendar;
  //   calendarApi.unselect();

  //   if (title) {
  //     const newItem = {
  //       id: createEventId(),
  //       title,
  //       start: selectInfo.startStr,
  //       end: selectInfo.endStr,
  //       allDay: selectInfo.allDay,
  //       extendedProps: {
  //         eventdetail: "",
  //       },
  //     };

  //     calendarApi.addEvent(newItem);
  //     setCalendarEvents([...calendarEvents, newItem]);
  //   }
  // }

function formatForDatetimeLocal(date) {
  const d = new Date(date);
  const offset = d.getTimezoneOffset();
  const localDate = new Date(d.getTime() - offset * 60000); // ปรับ timezone
  return localDate.toISOString().slice(0, 16); // ตัดให้เหลือ YYYY-MM-DDTHH:mm
}

function handleDateSelect(selectInfo) {
  setSelectedStart(formatForDatetimeLocal(selectInfo.start));
  setSelectedEnd(formatForDatetimeLocal(selectInfo.end));
  selectInfo.view.calendar.unselect();
}

  function handleEventClick(clickInfo) {
    setSelectedEvent(clickInfo.event);
  }

  async function handleDeleteEvent() {
    if (selectedEvent) {
      const confirmDelete = confirm("คุณแน่ใจหรือไม่ว่าต้องการลบกิจกรรมนี้?");
      if (!confirmDelete) return;

      const eventId = selectedEvent.id;

      try {
        // เรียก API เพื่อลบ event
        await deleteEventCalendar(eventId);

        // ลบจากหน้าจอ
        selectedEvent.remove();

        // อัปเดตรายการใน store
        const updatedEvents = calendarEvents.filter(event => event.id !== eventId);
        setCalendarEvents(updatedEvents);

        setSelectedEvent(null);
      } catch (error) {
        console.error("Failed to delete event:", error);
        alert("เกิดข้อผิดพลาดในการลบกิจกรรม");
      }
    }
  }

  function handleEvents(events) {
    setCurrentEvents(events);
  }

  // const onSubmit = async (data) => {
  //   const calendarApi = calendarRef.current?.getApi();
  //   if (!calendarApi) return;

  //   const newCalendarEvent = {
  //     id: createEventId(),
  //     title: data.title,
  //     start: data.start,
  //     end: data.end || null,
  //     allDay: data.allDay || false,
  //     eventdetail: JSON.stringify(data.eventdetail),
  //   };

  //   await createEventCalendar(newCalendarEvent);

  //   calendarApi.addEvent(newCalendarEvent);
  //   setCalendarEvents([...calendarEvents, newCalendarEvent]);
  //   reset();
  // };

const onSubmit = async (data) => {
  const calendarApi = calendarRef.current?.getApi();
  if (!calendarApi) return;

  const newCalendarEvent = {
    id: createEventId(),
    title: data.title,
    start: selectedStart,
    end: selectedEnd || null,
    allDay: data.allDay || false,
    eventdetail: JSON.stringify(data.eventdetail),
  };

  await createEventCalendar(newCalendarEvent);

  calendarApi.addEvent(newCalendarEvent);
  setCalendarEvents([...calendarEvents, newCalendarEvent]);

  // ✅ แก้ไขตรงนี้: ดึงเดือนและปีจาก selectedStart
  const startDate = new Date(selectedStart);
  const month = startDate.getMonth() + 1; // getMonth() = 0-11
  const year = startDate.getFullYear();

  // ✅ ตรวจสอบว่าเป็นวันที่ที่ถูกต้องก่อน
  if (!isNaN(startDate)) {
    const flexJson = generateCalendarFlexMessage(month, year, [...calendarEvents, newCalendarEvent]);
    console.log("📆 Flex JSON", JSON.stringify(flexJson, null, 2));
  }

  reset();
  setSelectedStart("");
  setSelectedEnd("");
};

// ปรับให้จันทร์เริ่มต้นที่ 0, อาทิตย์คือ 6
function getMondayBasedDayIndex(date) {
  const jsDay = date.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  return (jsDay + 6) % 7; // เปลี่ยนให้ Monday = 0, Sunday = 6
}




function getDayColor(dayIndex) {
  const colors = [
    "#facc15", // จันทร์ - เหลือง
    "#f472b6", // อังคาร - ชมพู
    "#34d399", // พุธ - เขียวมิ้นต์
    "#fb923c", // พฤหัสบดี - ส้ม
    "#60a5fa", // ศุกร์ - ฟ้า
    "#c084fc", // เสาร์ - ม่วง
    "#f87171", // อาทิตย์ - แดง
  ];
  return colors[dayIndex] || "#e5e7eb";
}

function generateCalendarFlexMessage(month, year, events = []) {
  const weeks = [];
  const firstDate = new Date(year, month - 1, 1);
  const lastDate = new Date(year, month, 0);
  const totalDays = lastDate.getDate();
  const startDay = getMondayBasedDayIndex(firstDate);
  let currentDay = 1;

  const createEmptyCell = () => ({
    type: "text",
    text: "-",
    size: "sm",
    align: "center",
    flex: 1,
    color: "#cccccc",
    weight: "regular",
    wrap: true,
  });

  for (let week = 0; week < 6; week++) {
    const row = [];

    for (let i = 0; i < 7; i++) {
      if (week === 0 && i < startDay) {
        row.push(createEmptyCell());
      } else if (currentDay <= totalDays) {
        row.push({
          type: "text",
          text: String(currentDay),
          size: "sm",
          align: "center",
          flex: 1,
          color: "#222222",
          weight: "bold",
          wrap: true,
        });
        currentDay++;
      } else {
        row.push(createEmptyCell());
      }
    }

    weeks.push({
      type: "box",
      layout: "baseline",
      spacing: "sm",
      contents: row,
    });

    if (currentDay > totalDays) break;
  }

  const filteredEvents = events.filter((event) => {
    const eventDate = new Date(event.start);
    return eventDate.getFullYear() === year && eventDate.getMonth() + 1 === month;
  });

  const eventItems = filteredEvents.map((event) => {
    const dayIndex = new Date(event.start).getDay(); // Sunday=0,...Saturday=6
    const thaiDayIndex = (dayIndex + 6) % 7; // Monday=0,...Sunday=6
    const boxColor = getDayColor(thaiDayIndex);

    const rawDetail = event.eventdetail ?? event.extendedProps?.eventdetail ?? "";
    const cleanedDetail = typeof rawDetail === "string"
      ? rawDetail.replace(/^"|"$/g, "")
      : typeof rawDetail === "object" && rawDetail.description
        ? rawDetail.description
        : "-";

    return {
      type: "box",
      layout: "horizontal",
      spacing: "md",
      margin: "md",
      paddingAll: "sm",
      backgroundColor: "#f5f5f5",
      cornerRadius: "md",
      contents: [
        {
          type: "box",
          layout: "vertical",
          contents: [
            {
              type: "text",
              text: new Date(event.start).getDate().toString().padStart(2, "0"),
              weight: "bold",
              size: "lg",
              color: "#ffffff",
              align: "center",
            },
            {
              type: "text",
              text: new Date(event.start).toLocaleDateString("th-TH", { month: "short" }),
              size: "xs",
              color: "#ffffff",
              align: "center",
            },
          ],
          width: "40px",
          height: "40px",
          backgroundColor: boxColor,
          cornerRadius: "lg",
          justifyContent: "center",
          alignItems: "center",
        },
        {
          type: "box",
          layout: "vertical",
          contents: [
            {
              type: "text",
              text: event.title || "ไม่มีชื่อกิจกรรม",
              weight: "bold",
              size: "sm",
              color: "#111111",
              wrap: true,
            },
            {
              type: "text",
              text: cleanedDetail,
              size: "xs",
              color: "#555555",
              wrap: true,
            },
          ],
          flex: 1,
        },
      ],
    };
  });

  return {
    type: "bubble",
    size: "giga",
    header: {
      type: "box",
      layout: "vertical",
      backgroundColor: "#4f46e5",
      paddingAll: "md",
      contents: [
        {
          type: "text",
          text: "ปฏิทินกิจกรรมโรงเรียนชุมชนวัดไทยงาม",
          align: "center",
          color: "#FFFFFF",
          size: "lg",
        },
        {
          type: "text",
          text: `${year + 543} - ${String(month).padStart(2, "0")}`,
          weight: "bold",
          size: "lg",
          align: "center",
          color: "#ffffff",
        },
      ],
    },
    body: {
      type: "box",
      layout: "vertical",
      paddingAll: "md",
      spacing: "md",
      contents: [
        {
          type: "box",
          layout: "horizontal",
          spacing: "sm",
          contents: ["จ", "อ", "พ", "พฤ", "ศ", "ส", "อา"].map((d, i) => ({
            type: "box",
            layout: "vertical",
            backgroundColor: getDayColor(i),
            cornerRadius: "md",
            contents: [
              {
                type: "text",
                text: d,
                align: "center",
                size: "sm",
                weight: "bold",
                color: "#ffffff",
              },
            ],
            flex: 1,
          })),
        },
        ...weeks,
        {
          type: "separator",
          margin: "lg",
        },
        {
          type: "text",
          text: "📌 รายการกิจกรรม",
          weight: "bold",
          size: "md",
          color: "#4f46e5",
          margin: "md",
        },
        ...(eventItems.length > 0
          ? eventItems
          : [
              {
                type: "text",
                text: "ไม่มีรายการกิจกรรมในเดือนนี้",
                size: "sm",
                color: "#999999",
                align: "center",
                margin: "md",
              },
            ]),
      ],
    },
  };
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
    <div className="flex flex-col md:flex-row p-4 gap-4">
      <div className="w-full md:w-1/4">
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
              {errors.title && (
                <p className="text-red-500 text-xs">{errors.title.message}</p>
              )}
            </label>

            {/* <label className="block text-sm mt-2">
              Start
              <input
                type="datetime-local"
                {...register("start")}
                className="w-full border p-2 rounded mt-1 text-xs"
              />
            </label>

            <label className="block text-sm mt-2">
              End
              <input
                type="datetime-local"
                {...register("end")}
                className="w-full border p-2 rounded mt-1 text-xs"
              />
            </label> */}

<input
  type="datetime-local"
  {...register("start")}
  value={selectedStart}
  onChange={(e) => setSelectedStart(e.target.value)}
  className="w-full border p-2 rounded mt-1 text-xs"
/>

<input
  type="datetime-local"
  {...register("end")}
  value={selectedEnd}
  onChange={(e) => setSelectedEnd(e.target.value)}
  className="w-full border p-2 rounded mt-1 text-xs"
/>


            <label className="block text-sm mt-2">
              รายละเอียด
              <input
                {...register("eventdetail")}
                className="w-full border p-2 rounded mt-1 text-xs"
              />
            </label>

            <label className="inline-flex items-center gap-2 mt-2 text-xs">
              <input type="checkbox" {...register("allDay")} className="w-4 h-4" />
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
          events={calendarEvents}
          select={handleDateSelect}
          eventContent={renderEventContent}
          eventClick={handleEventClick}
          eventsSet={handleEvents}
        />
      </div>

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
                    <strong>รายละเอียด:</strong> {event.eventdetail || "ไม่มี"}
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
        style={{ backgroundColor: eventInfo.event.backgroundColor || "#D50B8B" }}
      ></span>
      <span>{eventInfo.event.title}</span>
    </div>
  );
}
