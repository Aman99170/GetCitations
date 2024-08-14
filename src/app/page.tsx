'use client'
import { AuthProvider } from '../../context/AuthProvider';
import { LandingPage } from '../../modules/LandingPage';
export default function Home() {
  return (
    <AuthProvider>
      <LandingPage/>
    </AuthProvider>
  )
}
