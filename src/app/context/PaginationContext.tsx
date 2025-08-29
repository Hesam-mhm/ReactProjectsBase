/**
 * PaginationContext - کانتکست مدیریت وضعیت صفحه‌بندی، مرتب‌سازی و فیلتر کردن
 *
 * این کانتکست برای مدیریت وضعیت جداول و لیست‌ها استفاده می‌شود و شامل موارد زیر است:
 * - صفحه فعلی و تعداد آیتم در هر صفحه
 * - مرتب‌سازی ستون‌ها
 * - فیلترها
 * - جستجو
 *
 * مثال استفاده:
 * ```tsx
 * // در کامپوننت اصلی برنامه
 * function App() {
 *   return (
 *     <PaginationProvider>
 *       <YourComponents />
 *     </PaginationProvider>
 *   );
 * }
 *
 * // در کامپوننت جدول یا لیست
 * function DataGrid() {
 *   const { getPaginationState, setPaginationState } = usePagination();
 *
 *   // دریافت وضعیت فعلی برای یک جدول خاص
 *   const gridState = getPaginationState('users-table');
 *
 *   // تغییر صفحه
 *   const handlePageChange = (newPage: number) => {
 *     setPaginationState('users-table', { page: newPage });
 *   };
 *
 *   // تغییر تعداد آیتم در هر صفحه
 *   const handlePageSizeChange = (newSize: number) => {
 *     setPaginationState('users-table', { pageSize: newSize });
 *   };
 *
 *   // اعمال مرتب‌سازی
 *   const handleSort = (field: string, direction: 'asc' | 'desc') => {
 *     setPaginationState('users-table', {
 *       sortModel: [{ field, sort: direction }]
 *     });
 *   };
 *
 *   // اعمال فیلتر
 *   const handleFilter = (field: string, value: any) => {
 *     setPaginationState('users-table', {
 *       filterModel: [{ field, operator: 'contains', value }]
 *     });
 *   };
 *
 *   // جستجو
 *   const handleSearch = (query: string) => {
 *     setPaginationState('users-table', { searchQuery: query });
 *   };
 * }
 * ```
 */

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

interface SortModel {
  field: string;
  sort: "asc" | "desc";
}

interface FilterModel {
  field: string;
  operator: string;
  value: any;
}

interface PaginationState {
  page: number;
  pageSize: number;
  selectedItemId?: string | number;
  sortModel?: SortModel[];
  filterModel?: FilterModel[];
  searchQuery?: string;
}

interface PaginationContextType {
  paginationStates: Record<string, PaginationState>;
  setPaginationState: (gridId: string, state: Partial<PaginationState>) => void;
  getPaginationState: (gridId: string) => PaginationState;
  resetPaginationState: (gridId: string) => void;
  resetAllPaginationStates: () => void;
}

const defaultPaginationState: PaginationState = {
  page: 0,
  pageSize: 10,
  sortModel: [],
  filterModel: [],
  searchQuery: "",
};

const STORAGE_KEY = "pagination-states";

const PaginationContext = createContext<PaginationContextType | undefined>(
  undefined
);

export const PaginationProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [paginationStates, setPaginationStates] = useState<
    Record<string, PaginationState>
  >({});

  // Load states from localStorage on mount
  useEffect(() => {
    const savedStates = localStorage.getItem(STORAGE_KEY);
    if (savedStates) {
      try {
        setPaginationStates(JSON.parse(savedStates));
      } catch (error) {
        console.error("Error loading pagination states:", error);
      }
    }
  }, []);

  // Save states to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(paginationStates));
  }, [paginationStates]);

  const setPaginationState = (
    gridId: string,
    newState: Partial<PaginationState>
  ) => {
    setPaginationStates((prev) => ({
      ...prev,
      [gridId]: {
        ...defaultPaginationState,
        ...prev[gridId],
        ...newState,
      },
    }));
  };

  const getPaginationState = (gridId: string): PaginationState => {
    return paginationStates[gridId] || defaultPaginationState;
  };

  const resetPaginationState = (gridId: string) => {
    setPaginationStates((prev) => {
      const newStates = { ...prev };
      delete newStates[gridId];
      return newStates;
    });
  };

  const resetAllPaginationStates = () => {
    setPaginationStates({});
  };

  return (
    <PaginationContext.Provider
      value={{
        paginationStates,
        setPaginationState,
        getPaginationState,
        resetPaginationState,
        resetAllPaginationStates,
      }}
    >
      {children}
    </PaginationContext.Provider>
  );
};

export const usePagination = () => {
  const context = useContext(PaginationContext);
  if (!context) {
    throw new Error("usePagination must be used within a PaginationProvider");
  }
  return context;
};
