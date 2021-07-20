import { useState } from 'react';

export default initialState => {
  const [state, setState] = useState(initialState);
  const toggleState = () => setState(!state);

  return [state, toggleState, setState];
};
