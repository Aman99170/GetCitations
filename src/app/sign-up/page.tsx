'use client'
import { SignUp } from "../../../modules/auth/signup";
import BottomBar from "../../../modules/navigation/bottombar";
import TopBar from "../../../modules/navigation/topbar";

export default function signup() {
    return (
        <>
            <TopBar />
            <SignUp />
            <BottomBar />
        </>
    )
}