// src/router/Router.jsx
import { createBrowserRouter, Navigate } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import ProductDetails from "../pages/home/sections/ProductDetails/ProductDetails";
import Dashboard from "../layout/DashboardLayout/Dashboard";
import User from "../components/User";
import DashbrodAdmin from "../components/DashbrodAdmin";
import MyProfile from "../components/MyProfile";
import Order from "../components/Order";
import CategoryProduct from "../components/CategoryProduct";
import Signup from "../Auth/Signup";
import Otp from "../components/Otp";
import { AdminRoute } from "../hooks/useAdmin";
import { UserRoute } from "../hooks/userRole";
import { ShareRoute } from "../hooks/useShareRoute";
import AllOrders from "../components/AllOrders";
import HeroUpload from "../components/HeroUpload";
import SearchResults from "../pages/search/SearchResults";
import AdminVerificationList from "../pages/admin/AdminVerificationList";
import MyInvoices from "../pages/user/MyInvoices";
import AdminInvoices from "../pages/admin/AdminInvoices";
import AdminLoginPage from "../pages/admin/AdminLoginPage";
import SectionCategoriDetails from "../components/ui/SectionCategoriDetails";
import ChangePassword from "../components/ui/userProfile/ChangePassword";
import LogoSettings from "../components/ui/LogoSettings";
import SettingHomeSection from "../components/ui/SettingHomeSection";
import SalesReport from "../components/ui/SalesReport";
import ForgotPassword from "../pages/ForgotPassword";
import Jobs from "../pages/Jobs";
import JobDetails from "../pages/JobDetails";
import Home from "../pages/Home";
import Services from "../pages/Services";
import ServiceDetails from "../pages/ServiceDetails";
import Media from "../pages/Media";
import Contact from "../pages/Contact";
import AdminSiteSettings from "../pages/admin/AdminSiteSettings";
import NewsletterAdmin from "../pages/admin/NewsletterAdmin";
import AdminJobsManage from "../pages/admin/AdminJobsManage";
import AdminFaqs from "../pages/admin/AdminFaqs";
import AdminInbox from "../pages/admin/AdminInbox";
import AdminGalleryManager from "../pages/admin/AdminGalleryManager";
import AdminVideoManager from "../pages/admin/AdminVideoManager";
import About from "../pages/About";
import EducationGuidance from "../components/EducationGuidance";
import AdminApplications from "../pages/admin/AdminApplications";
import AdminServices from "../pages/admin/AdminServices";
import HotelPage from "../components/ui/hotel/HotelPage";

const withBase = (p) => {
  const base = import.meta.env.VITE_APP_SERVER_URL || "";
  return `${base.replace(/\/$/, "")}/${String(p).replace(/^\//, "")}`;
};

export const router = createBrowserRouter([
  { path: "/admin-login", element: <AdminLoginPage /> },
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> }, 

      // 🚀 admin login
      { path: "admin/login", element: <AdminLoginPage /> },
      { path: "search", element: <SearchResults /> },

      // product details
      {
        path: "product-details/:id",
        element: <ProductDetails />,
        loader: ({ params }) => fetch(withBase(`api/products/${params.id}`)),
      },

      {
        path: "category/:slug",
        element: <SectionCategoriDetails />,
      },
      {
        path: "category/:name",
        element: <CategoryProduct />,
        loader: ({ params }) => fetch(withBase(`api/category/${params.name}`)),
      },
      // auth
      // { path: "login", element: <Signup /> },
      // { path: "otp-verify", element: <Otp /> },

      // { path: "/forgot-password", element: <ForgotPassword /> },

      // ✅ Public Pages
      {
        path: "jobs",
        element: <Jobs />,
        loader: ({ request }) => {
          const url = new URL(request.url);
          return fetch(withBase(`api/jobs?${url.searchParams.toString()}`));
        },
      },
      {
        path: "jobs/:id",
        element: <JobDetails />,
        loader: ({ params }) => fetch(withBase(`api/jobs/${params.id}`)),
      },

      {
        path: "services",
        element: <Services />,
        loader: ({ request }) => {
          const url = new URL(request.url);
          return fetch(withBase(`api/services?${url.searchParams.toString()}`));
        },
      },
      {
        path: "services/:id",
        element: <ServiceDetails />,
        loader: ({ params }) => fetch(withBase(`api/services/${params.id}`)),
      },

      {
        path: "media",
        element: <Media />,
        loader: async () => {
          const [galleryRes, videosRes] = await Promise.all([
            fetch(withBase("api/gallery")),
            fetch(withBase("api/videos")),
          ]);
          return {
            gallery: await galleryRes.json(),
            videos: await videosRes.json(),
          };
        },
      },

      {
        path: "contact",
        element: <Contact />,
        loader: () => fetch(withBase("api/site-settings")),
      },
      { path: "about", element: <About /> },
      { path: "hotel", element: <HotelPage /> },
         { path: "education-guidance", element: <EducationGuidance /> },
    ],
  },

  // DASHBOARD (all children are relative — no leading slash)
  {
    path: "dashboard",
    element: <Dashboard />,
    children: [
      // dashboard home: /dashboard
      {
        index: true,
        element: (
          <AdminRoute>
            <DashbrodAdmin />
          </AdminRoute>
        ),
      },

      // ---- ADMIN ONLY ----
      {
        path: "seller",
        element: (
          <AdminRoute>
            <AdminVerificationList />
          </AdminRoute>
        ),
      },
      {
        path: "orders",
        element: (
          <AdminRoute>
            <AllOrders />
          </AdminRoute>
        ),
      },
      {
        path: "hero",
        element: (
          <AdminRoute>
            <HeroUpload />
          </AdminRoute>
        ),
      },
      
      {
        path: "site-settings",
        element: (
          <AdminRoute>
            <AdminSiteSettings />
          </AdminRoute>
        ),
      },
      {
        path: "newsletter",
        element: (
          <AdminRoute>
            <NewsletterAdmin />
          </AdminRoute>
        ),
      },
      {
        path: "jobs",
        element: (
          <AdminRoute>
            <AdminJobsManage />
          </AdminRoute>
        ),
      },
      {
        path: "faqs",
        element: (
          <AdminRoute>
            <AdminFaqs />
          </AdminRoute>
        ),
      },
      {
        path: "messages",
        element: (
          <AdminRoute>
            <AdminInbox />
          </AdminRoute>
        ),
      },
      {
        path: "applications",
        element: (
          <AdminRoute>
            <AdminApplications />
          </AdminRoute>
        ),
      },
      {
        path: "gallery",
        element: (
          <AdminRoute>
            <AdminGalleryManager />
          </AdminRoute>
        ),
      },
      {
        path: "videos",
        element: (
          <AdminRoute>
            <AdminVideoManager />
          </AdminRoute>
        ),
      },
      {
  path: "services",
  element: (
    <AdminRoute>
      <AdminServices />
    </AdminRoute>
  ),
},

      {
        path: "user",
        element: (
          <AdminRoute>
            <User />
          </AdminRoute>
        ),
      },

      {
        path: "invoices",
        element: (
          <AdminRoute>
            <AdminInvoices />
          </AdminRoute>
        ),
      },

      {
        path: "setting-logo",
        element: (
          <AdminRoute>
            <LogoSettings />
          </AdminRoute>
        ),
      },
      {
        path: "setting-section",
        element: (
          <AdminRoute>
            <SettingHomeSection />
          </AdminRoute>
        ),
      },


      // ---- USER ONLY ----
      {
        path: "profile",
        element: (
          <ShareRoute>
            <MyProfile />
          </ShareRoute>
        ),
      },

    ],
  },
]);
