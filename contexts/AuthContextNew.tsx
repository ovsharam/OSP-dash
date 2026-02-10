"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { User } from "@/types";

interface AuthContextType {
    user: User | null;
    login: (email: string) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check local storage or session
        const storedUser = localStorage.getItem("osp_user");
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (e) {
                console.error("Failed to parse user from storage", e);
                localStorage.removeItem("osp_user");
            }
        }
        setIsLoading(false);
    }, []);

    const login = async (email: string) => {
        setIsLoading(true);
        // Mock login for now
        await new Promise(resolve => setTimeout(resolve, 1000));

        const mockUser: User = {
            id: "u_123",
            email,
            name: "Demo User",
            firstName: "Demo",
            lastName: "User",
            role: "buyer",
            businessName: "Demo Company",
            isAuthenticated: true,
            address: { street: "", city: "", state: "", zipCode: "", country: "US" }
        };

        setUser(mockUser);
        localStorage.setItem("osp_user", JSON.stringify(mockUser));
        setIsLoading(false);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("osp_user");
    };

    return (
        <AuthContext.Provider value={{
            user,
            login,
            logout,
            isAuthenticated: !!user,
            isLoading
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
