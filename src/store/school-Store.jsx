import axios from 'axios'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
const url_Base = import.meta.env.VITE_API_BASE_URL;

const schoolStore = (set) => ({
    user: null,
    token: null,
    students: [],
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
    }
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