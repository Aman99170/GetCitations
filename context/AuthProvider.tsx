'use client'
import { PropsWithChildren, useCallback, useEffect, useMemo, useState } from "react";
import { AuthContext, IAuthContext } from "./AuthContext";
import TopBar from "../modules/navigation/topbar";
import BottomBar from "../modules/navigation/bottombar";
import { IUserInfo } from "./type";
import { useRouter } from "next/navigation";

export function AuthProvider({ children }: PropsWithChildren) {

    const [storage, setStorage] = useState<String | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const user = localStorage.getItem('user');
            setStorage(user);
            setIsLoggedIn(!!user);
            setLoading(false); // Set isLoggedIn based on user presence in localStorage
        }
    }, []);

    const isTokenExpired = useMemo(() => {
        let expirationTime
        if (typeof window !== 'undefined') {
            expirationTime = localStorage.getItem('tokenExpiration');
        }
        if (!expirationTime) {
            return true;
        }
        return Date.now() > parseInt(expirationTime, 10);
    }, []);

    const router = useRouter()
    let defaultDate = new Date()
    defaultDate.setDate(defaultDate.getDate() + 3)
    const [userInfo, setUserInfo] = useState<IUserInfo>({ _id: "", firstName: "", lastName: "", email: "", mobileNumber: "", createdAt: defaultDate, updatedAt: defaultDate })

    useEffect(() => {
        if (isLoggedIn && isTokenExpired) {
            setIsLoggedIn(false)
            localStorage.clear()
            router.replace("/")
        }
    }, [])

    useEffect(() => {
        const fetchUser = async () => {
            try {
                let res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/getUser`, {
                    method: 'POST',
                    headers: {
                        Authorization: `${storage}`,
                    },
                })
                if (res.status === 200) {
                    setUserInfo(await res.json())
                }
            } catch (error) {
                console.error(error)
            }
        }
        if (isLoggedIn) {
            fetchUser()
        }
    }, [isLoggedIn])

    const logOut = useCallback(() => {
        if (typeof window !== 'undefined') {
            localStorage.clear()
            router.replace("/");
        }
    }, [router])

    const contextValue: IAuthContext = useMemo(() => ({
        userInfo,
        isLoggedIn,
        loading,
        logOut,
        setIsLoggedIn,
        setUserInfo,
        setLoading
    }), [userInfo, isLoggedIn, logOut, setIsLoggedIn, setUserInfo])
    if (!loading) {
        return (
            <AuthContext.Provider value={contextValue}>
                <TopBar />
                {children}
                <BottomBar />
            </AuthContext.Provider>
        )
    }
}