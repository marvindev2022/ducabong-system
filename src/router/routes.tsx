import { Route, Routes, Outlet, Navigate } from "react-router-dom";
import App from "../../../App";
import RenderAuth from "../pages/auth/auth";
import { AuthProvider } from "../Context/auth.context";
import RenderHome from "../pages/home/home";
import { ClientProvider } from "../Context/Client.context";
import { ServiceProvider } from "../Context/service.context";
import NotFoundPage from "../../notfound/index";
import { getItem } from "../utils/storage";
import { ToastContainer } from "react-toastify";
export default function MainRoutes(): JSX.Element {
  function ProtectedRoutes({ redirectTo }: { redirectTo: string }) {
    const token = getItem("token");
    return token ? <Outlet /> : <Navigate to={redirectTo} />;
  }
  return (
    
    <AuthProvider>
      <ToastContainer/>
      <ClientProvider>
        <ServiceProvider>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/client" element={<RenderAuth />} />
            <Route element={<ProtectedRoutes redirectTo="/client" />}>
              <Route path="/client/home" element={<RenderHome />} />
            </Route>
            <Route path="/client/*" element={<NotFoundPage />} />
          </Routes>
        </ServiceProvider>
      </ClientProvider>
    </AuthProvider>
  );
}
