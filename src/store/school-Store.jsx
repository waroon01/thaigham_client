import axios from 'axios'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { getEventCalendar } from '../api/studentApi';
const url_Base = import.meta.env.VITE_API_BASE_URL;

const schoolStore = (set) => ({
    user: null,
    token: null,
    students: [],
    calendarEvents: [], // ✅ ใช้ชื่อให้ตรงกัน
    actionLogin: async(logindata) => {
        const res = await axios.post(`${url_Base}/login`,logindata)
        set({
            user: res.data.user,
            token: res.data.token
        })
        return res
    },
    actionLoadStudent: async () => {
        const res = await axios.get(`${url_Base}/student`);
        console.log("instore ",res)
        set({students: res.data})
        return res
    },
    actionCalendarLoad: async () => {
        const res = await getEventCalendar()
        const events = res.data.data
        set({ calendarEvents: events }) // ✅ ชื่อสอดคล้องกับด้านบน
        return events
    },
    setCalendarEvents: (events) => set({ calendarEvents: events }),


})

const usePersist = {
    name: 'school-store',
    Storage: createJSONStorage(()=>localStorage),
    partialize: (state) => ({
        user: state.user,
        token: state.token,
    }) // Only persist 'user' and 'token', exclude 'students' and 'actionLoadStudent'
}

const useSchoolStore = create(persist(schoolStore,usePersist) )

export default useSchoolStore