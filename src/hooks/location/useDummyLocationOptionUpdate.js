import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const useDummyLocationOptionUpdate = ref => {
  const { location, lat, lng } = useSelector(({ location: { location, lat, lng } }) => ({
    location,
    lat,
    lng
  }));

  useEffect(() => {
    ref.current?.select?.setValue({
      value: {
        dummyUpdate: true,
        location: {}
      },
      label: location
    });
  }, [location, lat, lng]);

  return location;
};

export default useDummyLocationOptionUpdate;
