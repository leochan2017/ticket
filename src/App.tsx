import { useState } from 'react'
import './App.css'
import TicketPage from './pages/ticket'
import HiddenPage from './pages/hidden'
import { EType } from './pages/hidden'

enum EShowPage {
  'none' = '',
  'ticket' = 'ticket'
}

function App() {
  const [showPage, setShowPage] = useState<EShowPage>(EShowPage.none)
  const [pageType, setPageType] = useState<EType>(EType.left)

  if (!showPage) {
    return <HiddenPage onShowPage={(type: EType) => {
      setPageType(type)
      setShowPage(EShowPage.ticket)
    }} />
  }

  if (showPage === EShowPage.ticket) {
    return <TicketPage pageType={pageType} />
  }

  return <div>No data...</div>
}

export default App
