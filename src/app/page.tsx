'use client'
import { AuthProvider } from '../../context/AuthProvider';
import { LandingPageResearcher } from '../../modules/LandingPageResearcher';
export default function Home() {
  return (
    <AuthProvider>
      <LandingPageResearcher/>
    </AuthProvider>
  )
}
