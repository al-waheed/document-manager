import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { store, persistor } from "./store/store";
import { PersistGate } from "redux-persist/integration/react";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Documents from "./pages/Documents";
import Invoices from "./pages/Invoices";
import AuthCallback from "./pages/AuthCallback";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <Router>
          <Routes>
            <Route path="/" element={<Landing />} />

            <Route path="/auth/callback" element={<AuthCallback />} />

            <Route
              path="*"
              element={
                <ProtectedRoute>
                  <div className="min-h-screen bg-gray-50">
                    <Navbar />

                    <main className="container mx-auto px-4 py-8">
                      <Routes>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/documents" element={<Documents />} />
                        <Route path="/invoices" element={<Invoices />} />
                      </Routes>
                    </main>

                    <ToastContainer />
                  </div>
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;