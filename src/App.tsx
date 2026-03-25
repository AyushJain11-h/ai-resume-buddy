import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index.tsx";
import LoginPage from "./pages/Login.tsx";
import SignupPage from "./pages/Signup.tsx";
import ForgotPasswordPage from "./pages/ForgotPassword.tsx";
import ResetPasswordPage from "./pages/ResetPassword.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import Resumes from "./pages/Resumes.tsx";
import ResumeEditor from "./pages/ResumeEditor.tsx";
import CoverLetters from "./pages/CoverLetters.tsx";
import JobTracker from "./pages/JobTracker.tsx";
import Profile from "./pages/Profile.tsx";
import ATSChecker from "./pages/ATSChecker.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/dashboard/resumes" element={<ProtectedRoute><Resumes /></ProtectedRoute>} />
            <Route path="/dashboard/resumes/new" element={<ProtectedRoute><ResumeEditor /></ProtectedRoute>} />
            <Route path="/dashboard/cover-letters" element={<ProtectedRoute><CoverLetters /></ProtectedRoute>} />
            <Route path="/dashboard/jobs" element={<ProtectedRoute><JobTracker /></ProtectedRoute>} />
            <Route path="/dashboard/ats-checker" element={<ProtectedRoute><ATSChecker /></ProtectedRoute>} />
            <Route path="/dashboard/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
