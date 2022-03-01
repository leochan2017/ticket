import React, { useState } from 'react'
import './App.css'

import TicketPage from './pages/ticket'
import HiddenPage from './pages/hidden'

enum EShowPage {
  'none' = '',
  'ticket' = 'ticket'
}

function App() {
  const [showPage, setShowPage] = useState<EShowPage>(EShowPage.none)

  if (!showPage) {
    return <HiddenPage onChange={() => { setShowPage(EShowPage.ticket) }} />
  }

  if (showPage === EShowPage.ticket) {
    return <TicketPage />
  }

  return <div>No data...</div>
}

export default App
