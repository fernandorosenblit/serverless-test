import React from 'react';
import { useSelector } from 'react-redux';
import SnackMessage from './SnackMessage';

const Snackbars = () => {
  const { isOpen, snackbars } = useSelector(({ ui: { snackbar: { isOpen, snackbars } } }) => ({
    isOpen,
    snackbars
  }));

  if (!isOpen) {
    return null;
  }

  return (
    <div className="snackbars">
      {snackbars.map((snackbar, index) => (
        <SnackMessage key={`snackbar-${index}`} data={snackbar} />
      ))}
    </div>
  );
};

export default Snackbars;
