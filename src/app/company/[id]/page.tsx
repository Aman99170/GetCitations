'use client'
import { AuthProvider } from "../../../../context/AuthProvider";
import { TermsAndPrivacyPage } from "../../../../modules/termsandprivacy";

export default function TermsAndPrivacy() {
    return (
        <AuthProvider>
            <TermsAndPrivacyPage />
        </AuthProvider>
    )
}