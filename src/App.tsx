import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import CareerPathBuilder from "./pages/CareerPathBuilder";
import CareerDetailExplorer from "./pages/CareerDetailExplorer";
import InstituteExplorer from "./pages/InstituteExplorer";
import EntranceExamGuide from "./pages/EntranceExamGuide";
import CompareCareers from "./pages/CompareCareers";
import BudgetPlanner from "./pages/BudgetPlanner";
import PersonalizedRecommendations from "./pages/PersonalizedRecommendations";
import MentorCommunityHub from "./pages/MentorCommunityHub";
import LoginSignup from "./pages/LoginSignup";
import UserDashboard from "./pages/UserDashboard";
import AdminPanel from "./pages/AdminPanel";
import Schedule from "./pages/Schedule";
import Notifications from "./pages/Notifications";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Mock authentication check (replace with your actual auth logic)
const isAuthenticated = () => {
  // Example: Check if a token exists in localStorage or your auth mechanism
  return !!localStorage.getItem("authToken"); // Replace with your auth logic
};

// ProtectedRoute component to handle authentication
const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" replace />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/career-builder" element={<CareerPathBuilder />} />
          <Route path="/career-detail" element={<CareerDetailExplorer />} />
          <Route path="/institutes" element={<InstituteExplorer />} />
          <Route path="/entrance-exams" element={<EntranceExamGuide />} />
          <Route path="/compare-careers" element={<CompareCareers />} />
          <Route path="/budget-planner" element={<BudgetPlanner />} />
          <Route path="/recommendations" element={<PersonalizedRecommendations />} />
          <Route path="/mentor-community" element={<MentorCommunityHub />} />
          <Route path="/login" element={<LoginSignup />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <UserDashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;