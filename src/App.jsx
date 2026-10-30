import { useState, useCallback } from 'react'
import { getRegisteredActivityIds } from './lib/storage.js'
import ScrollProgress from './components/ScrollProgress.jsx'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Marquee from './components/Marquee.jsx'
import About from './components/About.jsx'
import Journey from './components/Journey.jsx'
import Activities from './components/Activities.jsx'
import Wellness from './components/Wellness.jsx'
import Support from './components/Support.jsx'
import Faq from './components/Faq.jsx'
import FinalCta from './components/FinalCta.jsx'
import Footer from './components/Footer.jsx'
import StickyCta from './components/StickyCta.jsx'
import RegisterDialog from './components/RegisterDialog.jsx'

export default function App() {
  const [dialogState, setDialogState] = useState({ open: false, preselectedIds: [] })
  const [registeredIds, setRegisteredIds] = useState(() => getRegisteredActivityIds())
  const [selectedDay, setSelectedDay] = useState('all')

  const openRegister = useCallback(({ open, preselectedIds }) => {
    setDialogState({ open, preselectedIds: preselectedIds || [] })
  }, [])

  const closeRegister = useCallback(() => {
    setDialogState((s) => ({ ...s, open: false }))
  }, [])

  const handleSuccess = useCallback(() => {
    // Refresh registered IDs from storage after a successful registration
    setRegisteredIds(getRegisteredActivityIds())
  }, [])

  return (
    <>
      <ScrollProgress />
      <Navbar onRegister={openRegister} />
      <main id="main-content">
        <Hero onRegister={openRegister} />
        <Marquee />
        <About />
        <Journey onSelectDay={setSelectedDay} />
        <Activities
          onRegister={openRegister}
          registeredIds={registeredIds}
          selectedDay={selectedDay}
          onDayChange={setSelectedDay}
        />
        <Wellness />
        <Support />
        <Faq />
        <FinalCta onRegister={openRegister} />
      </main>
      <Footer />
      <StickyCta onRegister={openRegister} dialogOpen={dialogState.open} />
      <RegisterDialog
        open={dialogState.open}
        preselectedIds={dialogState.preselectedIds}
        onClose={closeRegister}
        onSuccess={handleSuccess}
      />
    </>
  )
}
