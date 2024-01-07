import { Route, Routes, Outlet, Navigate } from "react-router-dom";
import { AuthProvider } from "../Context/auth.context";
import { ClientProvider } from "../Context/Client.context";
import { ServiceProvider } from "../Context/service.context";
import { getItem } from "../utils/storage";
import { ToastContainer } from "react-toastify";
import RenderAuth from "../Pages/auth/auth";
import RenderHome from "../Pages/home/home";
import NotFoundPage from "../Pages/notfound";
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
            <Route path="/" element={<RenderAuth />} />
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
