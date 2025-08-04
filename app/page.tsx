import SidebarComponent from "@/components/sidebar";
import Stock from "@/components/stock";
import PrivateRoute from "@/components/use-routes";

export default function Home() {
  return <PrivateRoute>
    <SidebarComponent />
    <Stock />
  </PrivateRoute>
}