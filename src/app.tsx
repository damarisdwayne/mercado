import { ErrorBoundary } from '@/components/error-boundary'
import { MercadoPage } from '@/pages/mercado'

const App = () => (
  <ErrorBoundary>
    <MercadoPage />
  </ErrorBoundary>
)

export default App
