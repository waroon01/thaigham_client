import { useEffect, useState } from "react"
import useSchoolStore from "../store/school-Store"
import { currentUser } from "../api/auth"

const ProtectRouteUser = ({element}) => {
    const [ ok, setOk ] = useState(false)
    const user = useSchoolStore((state)=> state.user)
    const token = useSchoolStore((state)=> state.token)


    useEffect(()=>{
        if(user && token){
            // sent to back
            currentUser(token)
            .then(()=> setOk(true))
            .catch(()=> setOk(false))
        }
    },[])     

  return ok ? element : <LoadingToRedirect />
}
export default ProtectRouteUser