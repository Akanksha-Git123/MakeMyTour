"use client";

import { createContext, useContext, useState } from "react";

const PriceContext = createContext<any>(null);

export const PriceProvider = ({ children }: any) => {
  const [frozenPrice, setFrozenPrice] = useState<number | null>(null);
  const [expiry, setExpiry] = useState<number | null>(null);

  const freeze = (price: number, duration = 30000) => {
    const exp = Date.now() + duration;

    setFrozenPrice(price);
    setExpiry(exp);

    setTimeout(() => {
      setFrozenPrice(null);
      setExpiry(null);
    }, duration);
  };

  return (
    <PriceContext.Provider value={{ frozenPrice, expiry, freeze }}>
      {children}
    </PriceContext.Provider>
  );
};

export const usePrice = () => useContext(PriceContext);