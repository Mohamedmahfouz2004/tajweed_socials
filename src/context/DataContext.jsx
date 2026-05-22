import React, { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const API_URL = import.meta.env.DEV ? 'http://localhost:4002' : '';
      const res = await fetch(`${API_URL}/api/data`);
      const d = await res.json();
      setData(d);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const updateData = async (newData) => {
    try {
      const API_URL = import.meta.env.DEV ? 'http://localhost:4002' : '';
      await fetch(`${API_URL}/api/data`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newData)
      });
      setData(newData);
      return { success: true };
    } catch (e) {
      return { success: false };
    }
  };

  return (
    <DataContext.Provider value={{ data, loading, updateData, refetch: fetchData }}>
      {children}
    </DataContext.Provider>
  );
};
