import { Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./app/layout/AppLayout";

// Pages
import Dashboard from "./features/dashboard/pages/Dashboard";
import Transactions from "./features/transactions/pages/Transactions";
import Analytics from "./features/analytics/pages/Analytics";
import ImportExport from "./features/vault/pages/ImportExport";
import Login from "./authentication/Login";
import ProtectedRoute from "./app/layout/ProtectedRoute";
import AuthLayout from "./app/layout/AuthLayout";
import Register from "./authentication/Register";
import Profile from "./features/settings/pages/Profile";
function App() {
//      localStorage.setItem("token","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEwLCJpYXQiOjE3Njg4MDkwNzksImV4cCI6MTc2ODg5NTQ3OX0._uLeIgi4q2xE2ndZbtIqmvoQYCc-CS-3sZeFv4ihGXE");

  return (
    
    <>
    
      <Routes>
        {/* Redirecting root to dashboard */}
        {/* <Route path="/" element={<Navigate to="/dashboard" replace />} /> */}
        <Route element={<AuthLayout/>}>
        <Route path="/" element = {<Login/>} />
        <Route path="/register" element={<Register/>} />
        </Route>
      {/* App layout routes */}
      <Route element={<ProtectedRoute/>}>
      <Route element={<AppLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/vault" element={<ImportExport />} />
        <Route path="/profile" element={<Profile/>} />
      </Route>
      </Route>
    </Routes>
    </>
  );
}

export default App;
