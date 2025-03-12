import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";
import Hero from "./Hero/Hero";
import Privacy from "./PrivacyManagement/PrivacyManagement";
import Features from "./Features/Features";
import Testimonials from "./Testimonials/Testimonials";
import Join from "./JoinUs/Joinus";
import Product from "./ProductNews/Productnews";
import "./index.css";
import Contact from "./components/Contact";
import Pricing from "./components/Pricing";
import MoreFeatures from "./components/MoreFeatures";
import Career from "./components/Career";
import { Toaster } from "react-hot-toast";
import useAppStore from "./store/useAppStore";
import DashboardNav from "./dashboard/Dashboard";
import ProtectedRoute from "./dashboard/ProtectedRoute";
import { Loader } from "lucide-react";
import Dashboard from "./dashboard/Dashboard";
import Faq from "./Pages/Faq";
import PrivacyPolicy from "./Pages/PrivacyPolicy";
import TermsAndCondition from "./Pages/TermsAndCondition";
import DashboardPage from "./dashboard/DashboardPage";
import WorkflowsPage from "./dashboard/WorkflowsPage";
import RecentreportsPage from "./dashboard/RecentreportsPage";
import AnalyticsPage from "./dashboard/AnalyticsPage";
import SettingsPage from "./dashboard/SettingsPage";
import DashBoardHome from "./dashboard/DashBoardHome";
import DocsHistory from "./dashboard/DocsHistory";
import DashboardLayout from "./dashboard/DashboardLayout";
import ForgetPassword from "./Pages/ForgetPassword";
import NotesHistory from "./dashboard/NotesHistory";
import SummarizeDocument from "./dashboard/SummarizeDocument";
import ChatWithAI from "./dashboard/DashboardPages/ChatWithAI";
import ChatWithClient from "./dashboard/DashboardPages/ChatWithClient";
import ResetPassword from "./Pages/ResetPassword";
import AcceptInvitation from "./dashboard/DashboardPages/AcceptInvitation";
import Clients from "./dashboard/DashboardPages/Clients";
import CreateProject from "./dashboard/Projects/CreateProject";
import SingleProject from "./dashboard/Projects/SingleProject";
import ReportPage from "./dashboard/DashboardPages/ReportPage";
import VerifyOtp from "./Pages/VerifyOtp";
import Craft from "./Craft/Craft";
import AiDashboard from "./AiDashboard/AiDashboard";
import AiFeatures from "./AiFeatures/AiFeatures";
import NewFooter from "./NewFooter/NewFooter";

const Home = () => {
  return (
    <>
      <Hero />
      <Craft />
      <AiDashboard />
      <AiFeatures />
      {/* <Testimonials /> */}
      <Join />
      {/* <Product /> */}
      <NewFooter />
    </>
  );
};

const App = () => {
  const { user, isCheckingAuth, authCheck } = useAppStore();
  const location = useLocation();
  console.log("auth user is here : ", user);
  // console.log("Token being sent: ", document.cookie);
  useEffect(() => {
    authCheck();
  }, [authCheck]);

  if (isCheckingAuth) {
    return (
      <div className="h-screen">
        <div className="flex justify-center items-center bg-black h-full">
          <Loader className="animate-spin text-red-600 w-10 h-10" />
        </div>
      </div>
    );
  }

  const isDashboardRoute = location.pathname.startsWith("/dashboard/");
  const isForgetPasswordRoute = location.pathname === "/forgetpassword";

  // Define the routes where you want to remove the `home-container`
  const noContainerRoutes = [
    "/contact-us",
    "/pricing",
    "/morefeatures",
    "/career",
    "/dashboard/:name",
  ];

  // Check if the current path matches any route in `noContainerRoutes`
  const isNoContainer = noContainerRoutes.some((route) =>
    location.pathname.startsWith(route.replace(":name", ""))
  );

  const isNoNavbar = isDashboardRoute || isForgetPasswordRoute;

  return (
    <>
      {" "}
      <div className={isNoContainer ? "" : "home-container"}>
        {/* Show Navbar only if NOT on the dashboard route */}
        {!isNoNavbar && <Navbar />}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact-us" element={<Contact />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/morefeatures" element={<MoreFeatures />} />
          <Route path="/career" element={<Career />} />
          <Route path="/faqs" element={<Faq />} />
          <Route path="/privacypolicy" element={<PrivacyPolicy />} />
          <Route path="/termsandcondtion" element={<TermsAndCondition />} />
          <Route path="/forgetpassword" element={<ForgetPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/join" element={<AcceptInvitation />} />
          <Route path="/verify-email" element={<VerifyOtp />} />

          {/* Protected Route for Dashboard */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard/:name" element={<DashboardLayout />}>
              <Route index element={<DashboardPage />} />
              <Route path="workflows" element={<WorkflowsPage />} />
              <Route path="reports" element={<RecentreportsPage />} />
              <Route path="analytics" element={<AnalyticsPage />} />
              <Route path="settings" element={<SettingsPage />} />
              <Route path="history/documents" element={<DocsHistory />} />
              <Route path="history/notes" element={<NotesHistory />} />
              <Route
                path="chat/summarizedocument"
                element={<SummarizeDocument />}
              />
              <Route path="chat/ai" element={<ChatWithAI />} />
              <Route path="chat/client" element={<ChatWithClient />} />
              <Route
                path="client/invitations-and-clients"
                element={<Clients />}
              />
              <Route path="project/projects" element={<CreateProject />} />
              <Route path="reports/report" element={<ReportPage />} />
              <Route
                path="project/projects/:name"
                element={<SingleProject />}
              />
            </Route>
          </Route>
        </Routes>

        <Toaster />
      </div>
    </>
  );
};

export default App;
