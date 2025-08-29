/* eslint-disable react-refresh/only-export-components */
import { FC, useState, useEffect, createContext, useContext, Dispatch, SetStateAction } from 'react';
import { LayoutSplashScreen } from '../../../../_metronic/layout/core';
import { WithChildren } from '../../../../_metronic/helpers';
import axios from 'axios';
import { BaseUrl } from '../../../configs/base_url_constant';
import { UserRole } from '../../../types/Auth/Auth.type';

export interface FrappeUserType {
  name: string;
  email: string;
  full_name: string;
  user_image?: string;
  role_profile_name?: string;
  language?: string;
  time_zone?: string;
  send_welcome_email?: number;
  unsubscribed?: number;
  user_type?: string;
  creation?: string;
  modified?: string;
  modified_by?: string;
  owner?: string;
  docstatus?: number;
  idx?: number;
  enabled?: number;
  doctype?: string;
  roles: UserRole[];
}

type AuthContextProps = {
  currentFrappeUser: FrappeUserType | undefined;
  setCurrentFrappeUser: Dispatch<SetStateAction<FrappeUserType | undefined>>;
  currentFrappeRoles: string[] | undefined;
  setcurrentFrappeRoles: Dispatch<SetStateAction<string[] | undefined>>;
  saveFrappeUser: (user: FrappeUserType | undefined) => void;
  logout: () => void;
};

const initAuthContextPropsState = {
  currentFrappeUser: undefined,
  setCurrentFrappeUser: () => {},
  currentFrappeRoles: undefined,
  setcurrentFrappeRoles: () => {},
  saveFrappeUser: () => {},
  logout: () => {},
};

const AuthContext = createContext<AuthContextProps>(initAuthContextPropsState);

const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider: FC<WithChildren> = ({ children }) => {
  const [currentFrappeUser, setCurrentFrappeUser] = useState<FrappeUserType | undefined>(
    localStorage.getItem('FRAPPE_USER') ? JSON.parse(localStorage.getItem('FRAPPE_USER')!) : undefined
  );
  const [currentFrappeRoles, setcurrentFrappeRoles] = useState<string[] | undefined>(
    localStorage.getItem('FRAPPE_ROLE') ? JSON.parse(localStorage.getItem('FRAPPE_ROLE')!) : undefined
  );

  const saveFrappeUser = (user: FrappeUserType | undefined) => {
    if (user) {
      localStorage.setItem('FRAPPE_USER', JSON.stringify(user));
      setCurrentFrappeUser(user);
      localStorage.setItem('FRAPPE_ROLE', JSON.stringify(user.roles.map((role) => role.role)));
      setcurrentFrappeRoles(user.roles.map((role) => role.role));
    } else {
      localStorage.removeItem('FRAPPE_USER');
      setCurrentFrappeUser(undefined);
      localStorage.removeItem('FRAPPE_ROLE');
      setcurrentFrappeRoles(undefined);
    }
  };

  const logout = async () => {
    try {
      // لاگ‌اوت از Frappe
      await axios.post(`${BaseUrl.frappe}/api/method/logout`, {}, { withCredentials: true });
    } catch (error) {
      console.error('خطا در خروج از سیستم:', error);
    } finally {
      localStorage.removeItem('FRAPPE_USER');
      setCurrentFrappeUser(undefined);
      localStorage.removeItem('FRAPPE_ROLE');
      setcurrentFrappeRoles(undefined);
      window.location.href = '/auth/login';
    }
  };

  // گوش دادن به رویدادهای خطای احراز هویت
  useEffect(() => {
    const handleAuthError = () => {
      logout();
    };

    window.addEventListener('frappe-auth-error', handleAuthError);

    return () => {
      window.removeEventListener('frappe-auth-error', handleAuthError);
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        currentFrappeUser,
        setCurrentFrappeUser,
        currentFrappeRoles,
        setcurrentFrappeRoles,
        saveFrappeUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const AuthInit: FC<WithChildren> = ({ children }) => {
  const { currentFrappeUser, logout } = useAuth();
  const [showSplashScreen, setShowSplashScreen] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (currentFrappeUser) {
          // بررسی اعتبار کوکی با درخواست به Frappe
          await axios.get(`${BaseUrl.frappe}/api/method/frappe.auth.get_logged_user`, { withCredentials: true });
        }
      } catch (error) {
        console.error('خطا در بررسی وضعیت احراز هویت:', error);
        logout();
      } finally {
        setShowSplashScreen(false);
      }
    };

    checkAuth();
  }, [currentFrappeUser, logout]);

  return showSplashScreen ? <LayoutSplashScreen /> : <>{children}</>;
};

export { AuthProvider, AuthInit, useAuth };
