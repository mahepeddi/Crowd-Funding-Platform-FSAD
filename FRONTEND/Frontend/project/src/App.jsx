import { BrowserRouter } from "react-router-dom";
import MainNavBar from "./main/MainNavBar";
import AdminNavBar from "./admin/AdminNavBar";
import DonorNavBar from "./donor/DonorNavBar";
import ManagerNavBar from "./Manager/ManagerNavBar";
import { AuthProvider, useAuth } from "./contextapi/AuthContext";

// This component handles the conditional rendering of navbars
function AppContent() {
  const { isAdminLoggedIn, isDonorLoggedIn, isManagerLoggedIn } = useAuth();

  return (
    <BrowserRouter>
      {isAdminLoggedIn ? (
        <AdminNavBar />
      ) : isDonorLoggedIn ? (
        <DonorNavBar />
      ) : isManagerLoggedIn ? (
        <ManagerNavBar />
      ) : (
        <MainNavBar />
      )}
    </BrowserRouter>
  );
}

// This is the main App component that wraps everything in AuthProvider
function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
