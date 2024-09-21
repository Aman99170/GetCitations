'use client'
import { AuthProvider } from "../../../context/AuthProvider";
import { ResearchPapers } from "../../../modules/researchPapers";

export default function researchPapers() {
    return (
        <>
        <AuthProvider>
            <ResearchPapers />
        </AuthProvider>
        </>
    )
}