import { Routes, Route } from "react-router-dom";
import "./App.css";
import LoginRegister from "./Components/Login & Sign Up/LoginRegister";
import Header from "./Components/Landing Page/Header";
import About from "./Components/Landing Page/About";
import Class from "./Components/Landing Page/Class";
import Trainer from "./Components/Landing Page/Trainer";
import Price from "./Components/Landing Page/Price";
import Client from "./Components/Landing Page/Client";
import Footer from "./Components/Landing Page/Footer";
import AdminDashboard from "./Components/Dashboard/AdminDashboard";
import ClientDashboard from "./Components/Dashboard/ClientDashboard";
import ProtectedRoute from "./Components/ProtectedRoute";
import AdminExerciseList from "./Components/Exercises/AdminExerciseList";
import ExerciseForm from "./Components/Exercises/ExerciseForm";
import ClientExerciseList from "./Components/Exercises/ClientExerciseList";
import ExerciseDetail from "./Components/Exercises/ExerciseDetail";
import AdminProductList from "./Components/Product/AdminProductList ";
import ProductForm from "./Components/Product/ProductForm";
import ClientProductList from "./Components/Product/ClientProductList ";
import ProductDetail from "./Components/Product/ProductDetail";
import UserManagement from "./Components/User/UserManagement ";
import PricingManagement from "./Components/Landing Page/PricingManagement";
import SubscriptionManagement from "./Components/Subscription/SubscriptionManagement";
import ProfileSettings from "./Components/Profile/ProfileSettings";
import AppProvider from "./Context/AppContext";
import CartView from "./Components/Cart/CartView";
import CartPayment from "./Components/Cart/CartPayment";
import "remixicon/fonts/remixicon.css";
import Payment from "./Components/Landing Page/Payment";
import ContactUs from "./Components/Footer/ContactUs";
import PrivacyPolicy from "./Components/Footer/PrivacyPolicy ";
import TermsAndConditions from "./Components/Footer/TermsAndConditions";
import BMICalculator from "./Components/Footer/BMICalculator";
import BlogPage from "./Components/Footer/BlogPage";
import BlogDetail from "./Components/Footer/BlogDetail";
import SecurityPage from "./Components/Footer/SecurityPage";
import CareersPage from "./Components/Footer/CareersPage";
import BusinessPage from "./Components/Footer/BusinessPage";
import FranchisePage from "./Components/Footer/FranchisePage";
import PartnershipPage from "./Components/Footer/PartnershipPage";
import NetworkPage from "./Components/Footer/NetworkPage";
import PriceJoin from "./Components/Landing Page/PricingJoin";
// import ForgetPassword from "./Components/Login & Sign Up/ForgetPassword";

const NotFoundPage = () => (
  <div className="flex justify-center items-center h-screen">
    <div className="text-2xl text-red-600 font-semibold">
      404 - Page Not Found
    </div>
  </div>
);

export default function App() {
  return (
    <AppProvider>
      <Routes>
        {/* Landing Page Route */}
        <Route
          path="/"
          element={
            <>
              <Header />
              <About />
              <Class />
              <Trainer />
              <PriceJoin />
              <Client />
              <Footer />
            </>
          }
        />

        {/* Login/Register Route */}
        <Route path="/login-register" element={<LoginRegister />} />

        {/* Admin Routes */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute requiredRole="admin">
              <UserManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/exercises"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminExerciseList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/exercises/create"
          element={
            <ProtectedRoute requiredRole="admin">
              <ExerciseForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/exercises/edit/:id"
          element={
            <ProtectedRoute requiredRole="admin">
              <ExerciseForm />
            </ProtectedRoute>
          }
        />

        {/* Admin Product Routes */}
        <Route
          path="/admin/products"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminProductList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/products/create"
          element={
            <ProtectedRoute requiredRole="admin">
              <ProductForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/products/edit/:id"
          element={
            <ProtectedRoute requiredRole="admin">
              <ProductForm />
            </ProtectedRoute>
          }
        />

        {/* Payment Route */}
        <Route path="/payment" element={<Payment />} />

        {/* Client Routes */}
        {/* Client Routes */}
        <Route
          path="/client/dashboard"
          element={
            <ProtectedRoute requiredRole="client">
              <ClientDashboard />
            </ProtectedRoute>
          }
        />

        {/* Profile Settings Route */}
        <Route
          path="/client/profile"
          element={
            <ProtectedRoute requiredRole="client">
              <ProfileSettings />
            </ProtectedRoute>
          }
        />

        <Route
          path="/client/exercises"
          element={
            <ProtectedRoute requiredRole="client">
              <ClientExerciseList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/client/exercises/:id"
          element={
            <ProtectedRoute requiredRole="client">
              <ExerciseDetail />
            </ProtectedRoute>
          }
        />

        {/* Subscription Management Route */}
        <Route
          path="/client/subscription"
          element={
            <ProtectedRoute requiredRole="client">
              <SubscriptionManagement />
            </ProtectedRoute>
          }
        />

        {/* Client Product Routes */}
        <Route
          path="/client/products"
          element={
            <ProtectedRoute requiredRole="client">
              <ClientProductList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/client/products/:id"
          element={
            <ProtectedRoute requiredRole="client">
              <ProductDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/pricing"
          element={
            <ProtectedRoute requiredRole="admin">
              <PricingManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/client/cart"
          element={
            <ProtectedRoute requiredRole="client">
              <CartView />
            </ProtectedRoute>
          }
        />
        <Route path="/cartpayment" element={<CartPayment />} />

        {/* Public Pricing Route */}
        <Route path="/pricing" element={<Price />} />
        <Route path="/pricing-join" element={<PriceJoin />} />

        {/*************** Forgot Password ****************/}
        {/* <Route path="/forget-password" element={<ForgetPassword />} /> */}


        {/* *************** Footer Pages ************************** */}
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-conditions" element={<TermsAndConditions />} />
        <Route path="/bmi-calculator" element={<BMICalculator />} />
        <Route path="/blog-page" element={<BlogPage />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
        <Route path="/security-page" element={<SecurityPage />} />
        <Route path="career-page" element={<CareersPage />} />
        <Route path="/business-page" element={<BusinessPage />} />
        <Route path="/franchise-page" element={<FranchisePage />} />
        <Route path="/partnership-page" element={<PartnershipPage />} />
        <Route path="/netwok-page" element={<NetworkPage />} />
        {/* Fallback Route for Unmatched Paths */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AppProvider>
  );
}
