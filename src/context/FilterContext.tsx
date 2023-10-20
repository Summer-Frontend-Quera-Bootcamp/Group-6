import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

export interface IFilterData {
  id: number;
  isOrNot: string;
  tag: string;
  where: string;
}

// 1. Create Context
interface IFilterContextType {
  filters: Array<IFilterData>;
  setFilters: Dispatch<SetStateAction<Array<IFilterData>>>;
}

export const FilterContext = createContext<IFilterContextType>(
  {} as IFilterContextType
);

// 2. Create Provider
export const FilterProvider = ({ children }: { children: ReactNode }) => {
  const [filters, setFilters] = useState<Array<IFilterData>>([]);

  return (
    <FilterContext.Provider value={{ filters, setFilters }}>
      {children}
    </FilterContext.Provider>
  );
};

// 3. useContext
// eslint-disable-next-line react-refresh/only-export-components
export const useFilterContext = () => {
  return useContext(FilterContext);
};
