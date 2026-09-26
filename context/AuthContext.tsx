"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";

export type UserRole = "customer" | "vendor" | "delivery" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatar?: string;
  loyaltyPoints: number;
  referralCode: string;
  addresses: Address[];
  defaultAddressId?: string;
}

export interface Address {
  id: string;
  label: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  pincode: string;
  lat?: number;
  lng?: number;
}

interface AuthContextValue {
  user: User | null;
  isLoggedIn: boolean;
  login: (user: User) => void;
  logout: () => void;
  updateUser: (partial: Partial<User>) => void;
  selectedCity: string;
  setSelectedCity: (city: string) => void;
  selectedAddress: Address | null;
  setSelectedAddress: (address: Address) => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);
const STORAGE_KEY = "sipswift_auth_v1";
const CITY_KEY = "sipswift_city_v1";

const MOCK_USER: User = {
  id: "u1",
  name: "Arjun Sharma",
  email: "arjun@example.com",
  phone: "+91 98765 43210",
  role: "customer",
  avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200",
  loyaltyPoints: 1240,
  referralCode: "ARJUN50",
  addresses: [
    {
      id: "a1",
      label: "Home",
      line1: "B-204, Amrapali Silicon City",
      line2: "Sector 76",
      city: "Noida",
      state: "Uttar Pradesh",
      pincode: "201301",
      lat: 28.5355,
      lng: 77.391,
    },
    {
      id: "a2",
      label: "Office",
      line1: "DLF Cyber City, Tower B",
      city: "Gurugram",
      state: "Haryana",
      pincode: "122002",
      lat: 28.4943,
      lng: 77.0888,
    },
  ],
  defaultAddressId: "a1",
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [selectedCity, setSelectedCity] = useState("Delhi");
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setUser(JSON.parse(raw));
      const city = window.localStorage.getItem(CITY_KEY);
      if (city) setSelectedCity(city);
    } catch {
      /* ignore */
    }
  }, []);

  const login = useCallback((newUser: User) => {
    setUser(newUser);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
    const defaultAddr = newUser.addresses.find(
      (a) => a.id === newUser.defaultAddressId
    );
    if (defaultAddr) setSelectedAddress(defaultAddr);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    window.localStorage.removeItem(STORAGE_KEY);
  }, []);

  const updateUser = useCallback((partial: Partial<User>) => {
    setUser((prev) => {
      if (!prev) return prev;
      const updated = { ...prev, ...partial };
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const handleSetCity = useCallback((city: string) => {
    setSelectedCity(city);
    window.localStorage.setItem(CITY_KEY, city);
  }, []);

  // Demo: Auto-login as customer for showcase
  useEffect(() => {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      login(MOCK_USER);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        login,
        logout,
        updateUser,
        selectedCity,
        setSelectedCity: handleSetCity,
        selectedAddress,
        setSelectedAddress,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

export { MOCK_USER };
