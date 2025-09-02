"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

// Định nghĩa kiểu dữ liệu cho User
interface User {
  id: string;
  email: string;
  name: string;
  avatar: string | null;
  role: string;
  noPassword: boolean;
}

// Định nghĩa kiểu dữ liệu cho AuthState
interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: RegisterData) => Promise<boolean>;
  verifyRegistration: (code: string) => Promise<boolean>;
  logout: () => void;
  updateAuthState: (authState: AuthState) => void;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  dob: string;
  gender: "MALE" | "FEMALE" | "OTHER";
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_BASE_URL = "https://api.sportbooking.site";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    accessToken: null,
    refreshToken: null,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const storedAuthState = localStorage.getItem("authState");
        if (storedAuthState) {
          const parsedAuthState = JSON.parse(storedAuthState) as AuthState;
          setAuthState(parsedAuthState);
        }
      } catch (error) {
        console.error("Authentication error:", error);
        // Xóa dữ liệu không hợp lệ
        localStorage.removeItem("authState");
      } finally {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, []);

  useEffect(() => {
    if (authState.user) {
      localStorage.setItem("authState", JSON.stringify(authState));
    }
  }, [authState]);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (data.code === 200) {
        if (data.data.user.role != "ROLE_ADMIN") {
          return false;
        }

        const newAuthState = {
          user: data.data.user,
          accessToken: data.data.access_token,
          refreshToken: data.data.refresh_token,
        };
        setAuthState(newAuthState);
        localStorage.setItem("authState", JSON.stringify(newAuthState));
        return true;
      }
      return false;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const register = async (userData: RegisterData): Promise<boolean> => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (data.code === 201) {
        return true;
      }
      return false;
    } catch (error) {
      console.error("Register error:", error);
      return false;
    }
  };

  const verifyRegistration = async (code: string): Promise<boolean> => {
    try {
      // Gọi API xác minh đăng ký
      const response = await fetch(
        `${API_BASE_URL}/auth/verifyRegister?code=${code}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();

      if (data.code === 200) {
        const newAuthState = {
          user: data.data.user,
          accessToken: data.data.access_token,
          refreshToken: data.data.refresh_token,
        };
        setAuthState(newAuthState);
        localStorage.setItem("authState", JSON.stringify(newAuthState));
        return true;
      }
      return false;
    } catch (error) {
      console.error("Verification error:", error);
      return false;
    }
  };

  const logout = () => {
    setAuthState({
      user: null,
      accessToken: null,
      refreshToken: null,
    });
    localStorage.removeItem("authState");
  };

  const updateAuthState = (newAuthState: AuthState) => {
    setAuthState(newAuthState);
    if (newAuthState.user) {
      localStorage.setItem("authState", JSON.stringify(newAuthState));
    } else {
      localStorage.removeItem("authState");
    }
  };

  const value = {
    user: authState.user,
    isAuthenticated: !!authState.user,
    accessToken: authState.accessToken,
    refreshToken: authState.refreshToken,
    login,
    register,
    verifyRegistration,
    logout,
    updateAuthState,
  };

  if (isLoading) {
    return null; // Hoặc một loading spinner
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
