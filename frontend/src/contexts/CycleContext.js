import { createContext, useState, useEffect } from 'react';
import api from '../services/api';
export const CycleContext = createContext();
export const CycleProvider = ({ children }) => {
  const [cycle, setCycle] = useState(null);
  useEffect(() => {
    const fetchCycle = async () => { const res = await api.get('/cycle/active'); setCycle(res.data); };
    fetchCycle();
    const interval = setInterval(fetchCycle, 3000);
    return () => clearInterval(interval);
  }, []);
  return <CycleContext.Provider value={{ cycle, setCycle }}>{children}</CycleContext.Provider>;
};
