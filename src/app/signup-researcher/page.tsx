'use client'
import { SignUpUser } from "../../../modules/auth/signupUser";
import BottomBar from "../../../modules/navigation/bottombar";
import TopBar from "../../../modules/navigation/topbar";

export default function signupForResearcher() {
    return (
        <>
            <TopBar />
            <SignUpUser userType={"Researcher"} />
            <BottomBar />
        </>
    )
}