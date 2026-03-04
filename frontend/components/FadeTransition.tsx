import React, { useState, useRef, useEffect } from 'react';

const FadeTransition = ({
  show,
  children,
}: {
  show: boolean;
  children: React.ReactNode;
}) => {
  const [render, setRender] = useState(show);
  const nodeRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (show) setRender(true);
  }, [show]);

  const onTransitionEnd = () => {
    if (!show) setRender(false);
  };

  return (
    <div
      ref={nodeRef}
      style={{
        transition: 'opacity 0.32s cubic-bezier(.4,0,.2,1)',
        opacity: show ? 1 : 0,
        pointerEvents: show ? 'auto' : 'none',
        position: show ? 'static' : 'absolute',
        width: '100%',
      }}
      onTransitionEnd={onTransitionEnd}
    >
      {render ? children : null}
    </div>
  );
};

export default FadeTransition;
