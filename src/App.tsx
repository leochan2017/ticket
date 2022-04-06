import { useState } from 'react'
import './App.css'
import TicketPage from './pages/ticket'
import ShuttlePage from './pages/shuttle'
import HiddenPage from './pages/hidden'
import { EType } from './pages/hidden'

enum EShowPage {
  'none' = '',
  'ticket' = 'ticket',
  'shuttle' = 'shuttle'
}

function App() {
  const [showPage, setShowPage] = useState<EShowPage>(EShowPage.none)
  const [pageType, setPageType] = useState<EType>(EType.left)

  if (!showPage) {
    return <HiddenPage onShowPage={(type: EType) => {
      setPageType(type)
      if (type === EType.left || type === EType.right) {
        setShowPage(EShowPage.ticket)
      } else if (type === EType.leftBottom || type === EType.rightBottom) {
        setShowPage(EShowPage.shuttle)
      } else {
        console.log('unknown type:', type)
      }
    }} />
  }

  if (showPage === EShowPage.ticket) {
    return <TicketPage pageType={pageType} />
  }

  if (showPage === EShowPage.shuttle) {
    return <ShuttlePage pageType={pageType} />
  }

  return <div>No data...</div>
}

export default App
