'use client'
import { useSearchParams } from 'next/navigation';
import { AuthProvider } from '../../context/AuthProvider';
import { LandingPageResearcher } from '../../modules/LandingPageResearcher';
import { LandingPageFreelancer } from '../../modules/LandingPageFreelancer';
export default function Home() {


  const searchParams = useSearchParams()
  const userType = searchParams.get('userType')

  return (
    <AuthProvider>
      {userType==="Freelancer" ? <LandingPageFreelancer/> :<LandingPageResearcher/> }
    </AuthProvider>
  )
}
