import { Outlet } from "react-router"
import NavUser from "../components/app/NavUser"

const LayoutUser = () => {
  return (
    <div>
        <NavUser />
        <Outlet />
    </div>
  )
}
export default LayoutUser