'use client'
import { LoginPage } from "../../../modules/auth/login";
import BottomBar from "../../../modules/navigation/bottombar";
import TopBar from "../../../modules/navigation/topbar";

export default function Login() {
    return (
        <>
            <TopBar />
            <LoginPage />
            <BottomBar />
        </>
    )
}