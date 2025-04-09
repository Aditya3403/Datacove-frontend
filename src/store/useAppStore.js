import axios from "axios";
import { create } from "zustand";
import toast from "react-hot-toast";

// const API_BASE_URL = import.meta.env.VITE_BACKEND_PRODUCTION_URL;
const API_BASE_URL = "http://localhost:3000";
// console.log("Production url", API_BASE_URL);

const useAppStore = create((set) => ({
  user: null,

  isSignUpOpen: false,
  isLoginOpen: false,

  isIndiSigningUp: false,
  isOrgSigningUp: false,
  isLoggingIn: false,
  isLoggingOut: false,
  isCheckingAuth: true,

  // Add the setUser function to update the user state
  setUser: (userData) => set({ user: userData }),

  openSignUp: () => set({ isSignUpOpen: true }),
  closeSignUp: () => set({ isSignUpOpen: false }),
  openLogin: () => set({ isLoginOpen: true }),
  closeLogin: () => set({ isLoginOpen: false }),

  indiSignUp: async (credentials) => {
    set({ isIndiSigningUp: true });
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/v1/auth/individual-signup`,
        credentials,
        {
          withCredentials: true, // Include credentials for cookies
        }
      );
      // console.log(response);
      if (response.data.user.is_email_verified === true) {
        set({ user: response.data.user, isIndiSigningUp: false });
      }

      if (response.status === 201) {
        return "Account created successfully, Check mail for verfication";
      }
    } catch (error) {
      console.error("Signup Error:", error);

      if (error.response) {
        toast.error(error.response.data?.message || "Sign Up failed");
      } else {
        toast.error("Server not reachable. Please try again later.");
      }

      set({ isIndiSigningUp: false, user: null });
    }
  },
  orgSignUp: async (credentials) => {
    set({ isOrgSigningUp: true });
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/v1/auth/organization-signup`,
        credentials,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, // Include credentials for cookies
        }
      );
      console.log(response);
      if (response.data.user.is_email_verified === true) {
        set({ user: response.data.user, isOrgSigningUp: false });
      }
      if (response.status === 201) {
        return "Account created successfully, Check mail for verfication";
      }
    } catch (error) {
      //console.log(error)
      toast.error(error.response.data.message || "Sign Up failed");
      set({ isOrgSigningUp: false, user: null });
    }
  },
  login: async (credentials, navigate) => {
    set({ isLoggingIn: true });

    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/v1/auth/login`,
        credentials,
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        toast.success(response.data.message);
      }
      set({ user: response.data.user, isLoggingIn: false });
      navigate(`/dashboard/${response.data.user.name.replace(/\s+/g, "")}`);
    } catch (error) {
      set({ isLoggingIn: false, user: null });
      toast.error(error.response.data.message || "Login Failed");
    }
  },
  logout: async () => {
    set({ isLoggingOut: true });
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/v1/auth/logout`,
        null,
        {
          withCredentials: true,
        }
      );
      console.log(response);
      set({ user: null, isLoggingOut: false });
      toast.success("Logged out successfully");
    } catch (error) {
      set({ isLoggingOut: false });
      toast.error(error.response.data.message || "An error occurred");
    }
  },
  authCheck: async () => {
    set({ isCheckingAuth: true });
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/v1/auth/authCheck`,
        {
          withCredentials: true,
        }
      );
      console.log("RESPONSE", response);
      set({ user: response.data.user, isCheckingAuth: false });
    } catch (error) {
      set({ isCheckingAuth: false, user: null });
      // toast.error(error.response.data.message || "An error occurred");
    }
  },
  saveNote: async (credential) => {
    console.log("credentials", credential);
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/v1/dashboard/addNotes`,
        credential,
        { withCredentials: true }
      );
      // console.log("RESPONSE", response);
      set({ user: response.data.user });
      if (response.status === 200) {
        toast.success("Note saved successfully");
      }
    } catch (error) {
      toast.error(error.response.data.message || "Note can 't be saved");
      set({ isIndiSigningUp: false, user: null });
    }
  },
  deleteNote: async (credential) => {
    console.log("Credential", credential);
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/api/v1/dashboard/deleteNote`,
        {
          data: credential,
          withCredentials: true,
        }
      );

      // console.log("response after delete", response);
      if (response.status === 200) {
        toast.success("Note deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  },
  sendFile: async (credential) => {
    // Send the userId

    console.log("CREDENTIAL", credential);

    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/v1/upload/uploadFile`,
        credential,

        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
        { withCredentials: true }
      );
      console.log("RESPONSE", response);

      if (response.status === 200) {
        toast.success("File uploaded");
      } else {
        console.error("Upload failed:", response.data.message);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  },
  clientFile: async (credential) => {
    console.log("CREDENTIAL", credential);

    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/v1/upload/client-file`,
        credential,

        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
        { withCredentials: true }
      );
      console.log("RESPONSE", response);

      if (response.status === 200) {
        toast.success("File uploaded");
      } else {
        console.error("Upload failed:", response.data.message);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  },
}));

export default useAppStore;