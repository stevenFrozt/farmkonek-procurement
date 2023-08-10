import { GanttChartSquare, UserCog, Users, Wheat } from "lucide-react"
import { Nav, NavItem } from "./Nav"

export default function NavigationMenu() {
  return (
    <Nav className="h-screen w-full lg:w-[304px] ">
      <NavItem link="/dashboard">Dashboard</NavItem>
      <NavItem link="/orders" icon={<GanttChartSquare />} Badge={2}>
        Orders
      </NavItem>
      <NavItem link="/manage_users" icon={<UserCog />}>
        User Management
      </NavItem>
      <NavItem link="/merchants" icon={<Users />}>
        Merchants
      </NavItem>
      <NavItem link="/manage_commodity" icon={<Wheat />}>
        Commodity Management
      </NavItem>
    </Nav>
  )
}
