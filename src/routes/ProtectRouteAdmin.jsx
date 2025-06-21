import { useEffect, useState } from "react"
import useSchoolStore from "../store/school-Store"
import { currentAdmin } from "../api/auth"
import LoadingToRedirect from "./LoadingToRedirect"

const ProtectRouteAdmin = ({ element }) => {
    const [ok, setOk] = useState(false)
    const [loaded, setLoaded] = useState(false) // new
  
    const user = useSchoolStore((state) => state.user)
    const token = useSchoolStore((state) => state.token)
  
    useEffect(() => {
      if (user !== undefined && token !== undefined) {
        setLoaded(true) // zustand loaded
      }
    }, [user, token])
  
    useEffect(() => {
      if (loaded && user && token) {
        currentAdmin(token)
          .then(() => setOk(true))
          .catch(() => setOk(false))
      }
    }, [loaded, user, token])
  
    return ok ? element : <LoadingToRedirect />
  }
  
export default ProtectRouteAdmin