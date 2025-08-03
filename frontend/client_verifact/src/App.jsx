import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CheckCircle, XCircle, Lock, Mail, User, ArrowRight, RefreshCcw, Key, Info, Sparkles, LogOut } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';


const API_BASE_URL = 'http://localhost:8080/api/v1.0'; 


const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, 
});

// --- Welcome Screen Component ---
const WelcomeScreen = ({ onNavigate }) => (
  <div className="flex flex-col items-center justify-center p-6 text-center">
    {/* Cute Illustration Placeholder */}
    <div className="bg-yellow-200 p-6 rounded-full mb-8 shadow-lg flex items-center justify-center">
      <Lock className="h-24 w-24 text-yellow-700" strokeWidth={1.5} />
    </div>

    <h2 className="text-4xl font-bold text-yellow-700 mb-4">
      Welcome to Verifact
    </h2>
    <p className="text-gray-700 text-lg mb-8 leading-relaxed">
      Your secure and efficient authentication solution. Get started with a seamless setup process.
    </p>
    <button
      onClick={() => onNavigate('login')}
      className="flex items-center justify-center px-8 py-4 bg-yellow-500 text-white font-semibold rounded-full shadow-lg hover:bg-yellow-600 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-yellow-300 text-xl"
    >
      Proceed to Login <ArrowRight className="ml-3 h-6 w-6" />
    </button>
  </div>
);

// --- Login Screen Component ---
const LoginScreen = ({ onNavigate, onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post('/login', { email, password });
      const { email: userEmail } = response.data; // JWT is set as cookie by backend

      toast.success(
        <div className="flex items-center">
          <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
          Login successful. Welcome!
        </div>,
        {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
      console.log('Login successful for:', userEmail);
      onLoginSuccess(userEmail); // Trigger parent's login success handler
    } catch (error) {
      console.error('Login error:', error);
      let errorMessage = 'An unexpected error occurred. Please try again.';
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      } else if (error.response && error.response.status === 401) {
        errorMessage = 'Invalid email or password. Please verify your credentials.';
      } else if (error.response && error.response.status === 400 && error.response.data.message === "Email or password is incorrect") {
        errorMessage = "Email or password is incorrect. Please double-check.";
      } else if (error.response && error.response.status === 401 && error.response.data.message === "Account is disabled") {
        errorMessage = "Your account is disabled. Please contact support.";
      }
      toast.error(
        <div className="flex items-center">
          <XCircle className="h-5 w-5 mr-2 text-red-500" />
          {errorMessage}
        </div>,
        {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 w-full">
      <h2 className="text-4xl font-bold text-yellow-700 mb-6">
        User Login
      </h2>
      <form onSubmit={handleLogin} className="w-full space-y-5">
        <div>
          <label htmlFor="email" className="block text-yellow-700 text-lg font-medium mb-2 flex items-center">
            <Mail className="h-5 w-5 mr-2 text-yellow-600" /> Email Address:
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border-2 border-yellow-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 text-gray-800 placeholder-gray-400 transition-all duration-200"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-yellow-700 text-lg font-medium mb-2 flex items-center">
            <Lock className="h-5 w-5 mr-2 text-yellow-600" /> Password:
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border-2 border-yellow-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 text-gray-800 placeholder-gray-400 transition-all duration-200"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full px-6 py-3 bg-yellow-700 text-white font-semibold rounded-full shadow-lg hover:bg-yellow-800 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-yellow-300 text-xl"
          disabled={loading}
        >
          {loading ? 'Authenticating...' : 'Login'}
        </button>
      </form>
      <p className="mt-6 text-gray-600">
        <button onClick={() => onNavigate('reset-password')} className="text-yellow-600 font-semibold hover:underline">
          Forgot Password?
        </button>
      </p>
      <p className="mt-4 text-gray-600">
        Don't have an account?{' '}
        <button onClick={() => onNavigate('register')} className="text-yellow-600 font-semibold hover:underline">
          Register Here
        </button>
      </p>
    </div>
  );
};

// --- Register Screen Component ---
const RegisterScreen = ({ onNavigate, onRegisterSuccess }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post('/register', { name: fullName, email, password });
      const { email: userEmail, isAccountVerified } = response.data;

      toast.success(
        <div className="flex items-center">
          <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
          Account created successfully.
        </div>,
        {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
      console.log('Registration successful:', { fullName, email, password });
      onRegisterSuccess(userEmail, isAccountVerified);
    } catch (error) {
      console.error('Registration error:', error);
      let errorMessage = 'An error occurred during registration. Please try again.';
      if (error.response && error.response.data) {
        if (error.response.data.name) {
          errorMessage = `Name: ${error.response.data.name}`;
        } else if (error.response.data.email) {
          errorMessage = `Email: ${error.response.data.email}`;
        } else if (error.response.data.password) {
          errorMessage = `Password: ${error.response.data.password}`;
        } else if (error.response.data.message) { 
          errorMessage = error.response.data.message;
        } else if (Array.isArray(error.response.data)) { // Fallback for list of errors
          errorMessage = error.response.data.map(err => err.defaultMessage || err.message).join('; ');
        } else if (error.response.data.error && error.response.data.message) { // General error from backend map
          errorMessage = error.response.data.message;
        }
      }
      toast.error(
        <div className="flex items-center">
          <XCircle className="h-5 w-5 mr-2 text-red-500" />
          {errorMessage}
        </div>,
        {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 w-full">
      <h2 className="text-4xl font-bold text-yellow-700 mb-6">
        Create Account
      </h2>
      <form onSubmit={handleRegister} className="w-full space-y-5">
        <div>
          <label htmlFor="fullName" className="block text-yellow-700 text-lg font-medium mb-2 flex items-center">
            <User className="h-5 w-5 mr-2 text-yellow-600" /> Full Name:
          </label>
          <input
            type="text"
            id="fullName"
            placeholder="Enter your full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full p-3 border-2 border-yellow-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 text-gray-800 placeholder-gray-400 transition-all duration-200"
            required
          />
        </div>
        <div>
          <label htmlFor="regEmail" className="block text-yellow-700 text-lg font-medium mb-2 flex items-center">
            <Mail className="h-5 w-5 mr-2 text-yellow-600" /> Email Address:
          </label>
          <input
            type="email"
            id="regEmail"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border-2 border-yellow-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 text-gray-800 placeholder-gray-400 transition-all duration-200"
            required
          />
        </div>
        <div>
          <label htmlFor="regPassword" className="block text-yellow-700 text-lg font-medium mb-2 flex items-center">
            <Lock className="h-5 w-5 mr-2 text-yellow-600" /> Password:
          </label>
          <input
            type="password"
            id="regPassword"
            placeholder="Create a strong password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border-2 border-yellow-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 text-gray-800 placeholder-gray-400 transition-all duration-200"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full px-6 py-3 bg-yellow-700 text-white font-semibold rounded-full shadow-lg hover:bg-yellow-800 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-yellow-300 text-xl"
          disabled={loading}
        >
          {loading ? 'Registering...' : 'Register Account'}
        </button>
      </form>
      <p className="mt-4 text-gray-600">
        Already have an account?{' '}
        <button onClick={() => onNavigate('login')} className="text-yellow-600 font-semibold hover:underline">
          Login Here
        </button>
      </p>
    </div>
  );
};

// --- Verification Screen Component ---
const VerificationScreen = ({ onNavigate, userEmail }) => {
  const [otp, setOtp] = useState('');
  const [loadingSend, setLoadingSend] = useState(false);
  const [loadingVerify, setLoadingVerify] = useState(false);

  const handleSendOtp = async () => {
    setLoadingSend(true);
    try {
      // Email is sent via security context on backend, so no need to send in body
      await api.post('/send-otp');
      toast.success(
        <div className="flex items-center">
          <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
          Verification OTP sent to your email.
        </div>,
        {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
    } catch (error) {
      console.error('Send OTP error:', error);
      let errorMessage = 'Failed to send OTP. Please try again.';
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      }
      toast.error(
        <div className="flex items-center">
          <XCircle className="h-5 w-5 mr-2 text-red-500" />
          {errorMessage}
        </div>,
        {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
    } finally {
      setLoadingSend(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoadingVerify(true);
    try {
      await api.post('/verify-otp', { otp });
      toast.success(
        <div className="flex items-center">
          <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
          Email successfully verified.
        </div>,
        {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
      onNavigate('dashboard');
    } catch (error) {
      console.error('Verify OTP error:', error);
      let errorMessage = 'Invalid OTP. Please check and try again.';
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      } else if (error.response && error.response.status === 400) {
        errorMessage = 'OTP is required for verification.';
      }
      toast.error(
        <div className="flex items-center">
          <XCircle className="h-5 w-5 mr-2 text-red-500" />
          {errorMessage}
        </div>,
        {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
    } finally {
      setLoadingVerify(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 w-full text-center">
      <h2 className="text-4xl font-bold text-yellow-700 mb-6">
        Email Verification
      </h2>
      <p className="text-gray-700 text-lg mb-6 leading-relaxed">
        A verification code has been sent to your email address ({userEmail}). Please enter it below to complete your registration.
      </p>

      <button
        onClick={handleSendOtp}
        className="flex items-center justify-center px-6 py-3 bg-yellow-500 text-white font-semibold rounded-full shadow-lg hover:bg-yellow-600 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-yellow-300 text-lg mb-6"
        disabled={loadingSend}
      >
        <RefreshCcw className="h-5 w-5 mr-2" />
        {loadingSend ? 'Sending...' : 'Resend Verification Code'}
      </button>

      <form onSubmit={handleVerifyOtp} className="w-full max-w-sm space-y-5">
        <div>
          <label htmlFor="otp" className="block text-yellow-700 text-lg font-medium mb-2 flex items-center justify-center">
            <Key className="h-5 w-5 mr-2 text-yellow-600" /> Verification Code:
          </label>
          <input
            type="text"
            id="otp"
            placeholder="Enter 6-digit code"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full p-3 border-2 border-yellow-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 text-gray-800 placeholder-gray-400 text-center text-xl tracking-widest transition-all duration-200"
            maxLength="6"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full px-6 py-3 bg-yellow-700 text-white font-semibold rounded-full shadow-lg hover:bg-yellow-800 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-yellow-300 text-xl"
          disabled={loadingVerify}
        >
          {loadingVerify ? 'Verifying...' : 'Verify Email'}
        </button>
      </form>
    </div>
  );
};

// --- ResetPasswordScreen Component ---
const ResetPasswordScreen = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [step, setStep] = useState(1); // 1: Request OTP, 2: Reset Password
  const [loading, setLoading] = useState(false);

  const handleSendResetOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post(`/send-reset-otp?email=${email}`); // Backend expects email as @RequestParam
      toast.success(
        <div className="flex items-center">
          <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
          Password reset OTP sent to your email.
        </div>,
        {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
      setStep(2); 
    } catch (error) {
      console.error('Send Reset OTP error:', error);
      let errorMessage = 'Failed to send reset OTP. Please ensure the email is correct.';
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      }
      toast.error(
        <div className="flex items-center">
          <XCircle className="h-5 w-5 mr-2 text-red-500" />
          {errorMessage}
        </div>,
        {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error(
        <div className="flex items-center">
          <XCircle className="h-5 w-5 mr-2 text-red-500" />
          Passwords do not match. Please re-enter.
        </div>,
        {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
      return;
    }
    setLoading(true);
    try {
      
      await api.post('/reset-password', { email, otp, newPassword });
      toast.success(
        <div className="flex items-center">
          <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
          Password successfully reset. You can now log in.
        </div>,
        {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
      onNavigate('login'); // Navigate to login after successful reset
    } catch (error) {
      console.error('Reset Password error:', error);
      let errorMessage = 'Failed to reset password. Please check your OTP or try again.';
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      } else if (error.response && error.response.status === 500 && error.response.data.message === "Invalid OTP") {
        errorMessage = "Invalid OTP. Please ensure it's correct.";
      } else if (error.response && error.response.status === 500 && error.response.data.message === "OTP expired") {
        errorMessage = "OTP has expired. Please request a new one.";
      }
      toast.error(
        <div className="flex items-center">
          <XCircle className="h-5 w-5 mr-2 text-red-500" />
          {errorMessage}
        </div>,
        {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 w-full text-center">
      <h2 className="text-4xl font-bold text-yellow-700 mb-6">
        Password Reset
      </h2>

      {step === 1 && (
        <form onSubmit={handleSendResetOtp} className="w-full max-w-sm space-y-5">
          <p className="text-gray-700 text-lg mb-4 leading-relaxed">
            Enter your email address to receive a password reset code.
          </p>
          <div>
            <label htmlFor="resetEmail" className="block text-yellow-700 text-lg font-medium mb-2 flex items-center">
              <Mail className="h-5 w-5 mr-2 text-yellow-600" /> Email Address:
            </label>
            <input
              type="email"
              id="resetEmail"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border-2 border-yellow-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 text-gray-800 placeholder-gray-400 transition-all duration-200"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-6 py-3 bg-yellow-700 text-white font-semibold rounded-full shadow-lg hover:bg-yellow-800 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-yellow-300 text-xl"
            disabled={loading}
          >
            {loading ? 'Sending OTP...' : 'Send Reset Code'}
          </button>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleResetPassword} className="w-full max-w-sm space-y-5">
          <p className="text-gray-700 text-lg mb-4 leading-relaxed">
            A reset code has been sent to your email. Enter the code and your new password.
          </p>
          <div>
            <label htmlFor="resetOtp" className="block text-yellow-700 text-lg font-medium mb-2 flex items-center">
              <Key className="h-5 w-5 mr-2 text-yellow-600" /> Reset Code:
            </label>
            <input
              type="text"
              id="resetOtp"
              placeholder="Enter 6-digit code"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full p-3 border-2 border-yellow-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 text-gray-800 placeholder-gray-400 text-center text-xl tracking-widest transition-all duration-200"
              maxLength="6"
              required
            />
          </div>
          <div>
            <label htmlFor="newPassword" className="block text-yellow-700 text-lg font-medium mb-2 flex items-center">
              <Lock className="h-5 w-5 mr-2 text-yellow-600" /> New Password:
            </label>
            <input
              type="password"
              id="newPassword"
              placeholder="Enter your new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-3 border-2 border-yellow-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 text-gray-800 placeholder-gray-400 transition-all duration-200"
              required
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-yellow-700 text-lg font-medium mb-2 flex items-center">
              <Lock className="h-5 w-5 mr-2 text-yellow-600" /> Confirm New Password:
            </label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm your new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-3 border-2 border-yellow-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 text-gray-800 placeholder-gray-400 transition-all duration-200"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-6 py-3 bg-yellow-700 text-white font-semibold rounded-full shadow-lg hover:bg-yellow-800 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-yellow-300 text-xl"
            disabled={loading}
          >
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>
      )}

      <p className="mt-6 text-gray-600">
        <button onClick={() => onNavigate('login')} className="text-yellow-600 font-semibold hover:underline">
          Back to Login
        </button>
      </p>
    </div>
  );
};

// --- Dashboard Screen Component (for "Verification Successful" message) ---
const DashboardScreen = ({ userEmail, onLogout }) => {
  return (
    <div className="flex flex-col items-center justify-center p-6 text-center">
      <CheckCircle className="h-32 w-32 text-green-500 mb-8 animate-bounce" />
      <h2 className="text-5xl font-bold text-green-700 mb-4">
        Account Verified
      </h2>
      <p className="text-gray-700 text-xl mb-8 leading-relaxed">
        Your account for {userEmail} has been successfully verified.
      </p>
      <button
        onClick={onLogout}
        className="mt-8 flex items-center justify-center px-8 py-4 bg-red-500 text-white font-semibold rounded-full shadow-lg hover:bg-red-600 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-red-300 text-xl"
      >
        <LogOut className="h-6 w-6 mr-2" /> Logout
      </button>
    </div>
  );
};

// Main App component
const App = () => {
  const [currentPage, setCurrentPage] = useState('welcome'); // 'welcome', 'login', 'register', 'verify', 'reset-password', 'dashboard'
  const [loggedInUserEmail, setLoggedInUserEmail] = useState(null);
  const [isAccountVerified, setIsAccountVerified] = useState(false);
  const [loadingAuthCheck, setLoadingAuthCheck] = useState(true); // For initial auth check

  // Check authentication status on app load
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await api.get('/is-authenticated');
        if (response.data === true) {
          const profileResponse = await api.get('/profile');
          setLoggedInUserEmail(profileResponse.data.email);
          setIsAccountVerified(profileResponse.data.isAccountVerified);
          if (profileResponse.data.isAccountVerified) {
            setCurrentPage('dashboard');
          } else {
            setCurrentPage('verify');
          }
        } else {
          setCurrentPage('welcome');
        }
      } catch (error) {
        console.error('Authentication check failed:', error.message);
        // If the error is a Network Error, it means the backend is likely not running or CORS is not configured.
        // We can show a specific message for this.
        if (axios.isAxiosError(error) && error.code === 'ERR_NETWORK') {
            toast.error(
                <div className="flex items-center">
                    <XCircle className="h-5 w-5 mr-2 text-red-500" />
                    Cannot connect to backend. Please ensure the server is running and CORS is configured.
                </div>,
                { autoClose: false, closeOnClick: false, draggable: false }
            );
        }
        setCurrentPage('welcome');
      } finally {
        setLoadingAuthCheck(false);
      }
    };
    checkAuthStatus();
  }, []);

  const navigateTo = (page) => {
    setCurrentPage(page);
  };

  const handleLoginSuccess = async (email) => {
    setLoggedInUserEmail(email);
    try {
      const profileResponse = await api.get('/profile');
      setIsAccountVerified(profileResponse.data.isAccountVerified);
      if (profileResponse.data.isAccountVerified) {
        navigateTo('dashboard');
      } else {
        navigateTo('verify');
      }
    } catch (error) {
      console.error('Failed to fetch profile after login:', error);
      toast.error('Could not retrieve profile details. Please try again.');
      navigateTo('login');
    }
  };

  const handleRegisterSuccess = (email, verifiedStatus) => {
    setLoggedInUserEmail(email);
    setIsAccountVerified(verifiedStatus);
    navigateTo('verify');
  };

  const handleLogout = async () => {
    try {
      
      setLoggedInUserEmail(null);
      setIsAccountVerified(false);
      setCurrentPage('welcome');
      toast.info(
        <div className="flex items-center">
          <Info className="h-5 w-5 mr-2 text-blue-500" />
          You have been logged out.
        </div>
      );
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('An error occurred during logout.');
    }
  };


  if (loadingAuthCheck) {
    return (
      <div className="min-h-screen bg-yellow-50 font-outfit flex flex-col items-center justify-center p-4">
        <h1 className="text-5xl font-bold text-yellow-700 animate-pulse">Loading Verifact...</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-yellow-50 font-outfit flex flex-col items-center justify-center p-4">
      {/* Header Section */}
      <header className="w-full max-w-lg text-center mb-10">
        <h1 className="text-5xl font-bold text-yellow-700 mb-4 flex items-center justify-center">
          <Sparkles className="h-10 w-10 mr-2 text-yellow-500" />
          Verifact
          <Sparkles className="h-10 w-10 ml-2 text-yellow-500" />
        </h1>
        <p className="text-white text-lg bg-yellow-400 p-3 rounded-xl shadow-md">
          Your trusted partner for secure authentication.
        </p>
        {currentPage !== 'welcome' && currentPage !== 'dashboard' && (
          <button
            onClick={() => navigateTo('welcome')}
            className="mt-4 px-4 py-2 bg-white border-2 border-yellow-300 text-yellow-600 rounded-full text-sm hover:bg-yellow-50 transition-colors"
          >
            Back to Home
          </button>
        )}
      </header>

      {/* Main Content Area - Forms */}
      <main className="w-full max-w-lg bg-white p-8 rounded-3xl shadow-xl flex flex-col items-center space-y-6 border-4 border-yellow-200">
        {currentPage === 'welcome' && <WelcomeScreen onNavigate={navigateTo} />}
        {currentPage === 'login' && <LoginScreen onNavigate={navigateTo} onLoginSuccess={handleLoginSuccess} />}
        {currentPage === 'register' && <RegisterScreen onNavigate={navigateTo} onRegisterSuccess={handleRegisterSuccess} />}
        {currentPage === 'verify' && <VerificationScreen onNavigate={navigateTo} userEmail={loggedInUserEmail} />}
        {currentPage === 'reset-password' && <ResetPasswordScreen onNavigate={navigateTo} />}
        {currentPage === 'dashboard' && <DashboardScreen userEmail={loggedInUserEmail} onLogout={handleLogout} />}
      </main>

      {/* Footer Section */}
      <footer className="w-full max-w-lg text-center mt-10 text-yellow-600 text-sm">
        <p>&copy; 2025 Verifact. All rights reserved.</p>
      </footer>

      <ToastContainer />
    </div>
  );
};

export default App;
