import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import AppRoutes from '@/routes/AppRoutes';
import { MBTIProvider } from '@/context/MBTIContext';

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="mbti-ui-theme">
      <MBTIProvider>
        <BrowserRouter>
          <AppRoutes />
          <Toaster />
        </BrowserRouter>
      </MBTIProvider>
    </ThemeProvider>
  );
}

export default App;