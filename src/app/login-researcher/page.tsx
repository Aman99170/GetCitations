'use client'
import { LoginUser } from "../../../modules/auth/loginUser";
import BottomBar from "../../../modules/navigation/bottombar";
import TopBar from "../../../modules/navigation/topbar";

export default function loginForResearcher() {
    return (
        <>
            <TopBar />
            <LoginUser userType={"Researcher"} />
            <BottomBar />
        </>
    )
}