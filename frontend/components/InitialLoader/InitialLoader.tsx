'use client';

import { useEffect, useState } from 'react';
import "./InitialLoader.css"

type InitialLoaderProps = {
  minDurationMs?: number;
};

const InitialLoader: React.FC<InitialLoaderProps> = ({ minDurationMs = 3000 }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, minDurationMs);

    return () => clearTimeout(timer);
  }, [minDurationMs]);

  if (!visible) return null;

  return (
    <div className="initial-loader">
      <div className="vault-wave-wrapper">
        <div className="vault-wave-text">
          <h2 className=" text-capitalize">Vault</h2>
          <h2 className=" text-capitalize">Vault</h2>
        </div>
      </div>
    </div>
  );
};

export default InitialLoader;


