import React, { lazy, Suspense, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { setAuthorizeInterceptor, setDefaultAxios } from './lib/helpers/axiosHelper';
import AuthContextProvider from './data/contexts/AuthContext';
import useAuth from './hooks/contexts/useAuth';
import { USER_ROLE } from './types/entity/User';
import ErrorPage from './pages/ErrorPage';
import FragranceDetailPage from './pages/FragnanceDetailPage';
import MainPage from './pages/MainPage'; // Import MainPage

const Authorize = lazy(() => import('./pages/Authorize'));
const AppStore = lazy(() => import('./AppStore'));
const AboutPage = lazy(() => import('./pages/store/AboutPage'));

const queryClient = new QueryClient();

function App() {
  const { me, user } = useAuth();

  useEffect(() => {
    setDefaultAxios();
    setAuthorizeInterceptor();
    checkMe();
  }, []);

  const checkMe = async () => {
    try {
      await me();
    } catch (error) {
      console.error('Error checking me', error);
    }
  };

  const getRoutes = () => {
    const customerRoutes = (
      <>
        <Route path="/" element={<AppStore />}>
          <Route index element={<MainPage />} /> {/* Add this line */}
          <Route path="about" element={<AboutPage />} />
          <Route path="perfume/:id" element={<FragranceDetailPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
        <Route path="/auth" element={<Authorize />} />
      </>
    );

    const productManagerRoutes = <></>;
    const salesManagerRoutes = <></>;

    switch (user?.role) {
      case USER_ROLE.CUSTOMER:
        return customerRoutes;
      case USER_ROLE.PRODUCT_MANAGER:
        return productManagerRoutes;
      case USER_ROLE.SALES_MANAGER:
        return salesManagerRoutes;
      default:
        return customerRoutes;
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <BrowserRouter>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>{getRoutes()}</Routes>
          </Suspense>
        </BrowserRouter>
      </AuthContextProvider>
    </QueryClientProvider>
  );
}

export default App;