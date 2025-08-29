import { lazy, FC, Suspense } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { MasterLayout } from '../../_metronic/layout/MasterLayout';
import TopBarProgress from 'react-topbar-progress-indicator';
import { getCSSVariableValue } from '../../_metronic/assets/ts/_utils';
import { RouteMapper } from './RouteMapper/RouteMapper';



// const FinancialManagerReviewAdvancePayment = lazy(
//   () =>
//     import('../pages/Automation/RequestForAdvancePayment/FinancialManager/FinancialManagerReviewAdvancePayment/FinancialManagerReviewAdvancePayment'),
// );

// _______________________________________________________________________________

TopBarProgress.config({
  barColors: {
    '0': getCSSVariableValue('--bs-primary'),
    '1.0': getCSSVariableValue('--bs-primary'),
  },
  barThickness: 3,
  shadowBlur: 5,
});

// Fallback loading component
const LoadingFallback: FC = () => (
  <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
    <TopBarProgress />
  </div>
);

const PrivateRoutes = () => {
  return (
    <Routes>
      <Route element={<MasterLayout />}>
        {/* Redirect to Home after success login/registartion */}
        <Route path="auth/*" element={<Navigate to="/Home" />} />

        <Route
          path={RouteMapper.Home.path}
          element={
            <Suspense fallback={<LoadingFallback />}>
              <div>Salam</div>
            </Suspense>
          }
        />


        {/* Page Not Found */}
        <Route path="*" element={<Navigate to="/error/404" />} />
      </Route>
    </Routes>
  );
};

export { PrivateRoutes };
