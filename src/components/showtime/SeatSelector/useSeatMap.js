import pick from 'lodash/pick';

import useShowtime from 'components/showtime/useShowtime';

const buildZonesWithSeatsStatus = (zones, unavailableSeats) => {
  const _zones = [];
  zones.forEach(zone => {
    const areas = [];
    zone.areas.forEach(_area => {
      const _seats = zone.seats.seats.filter(
        currentSeat => currentSeat.areaIndex === _area.areaIndex
      );
      const seatsWithStatus = _seats[0].rows.map(row => {
        const _rowSeats = row.rowSeats.map(rowSeatData => ({
          ...rowSeatData,
          status: unavailableSeats.find(
            seat =>
              seat.seatPosition.areaIndex === _area.areaIndex &&
              seat.seatPosition.columnIndex === rowSeatData.columnIndex &&
              seat.seatPosition.rowIndex === row.rowIndex &&
              seat.seatPosition.zoneIndex === zone.zoneIndex
          )?.seatStatus
        }));
        return { ...row, rowSeats: _rowSeats };
      });
      areas.push({ ..._area, ..._seats[0], rows: seatsWithStatus });
    });
    _zones.push({ ...pick(zone, ['areaCount', 'seatCount', 'zoneIndex']), areas });
  });
  return _zones;
};

export default () => {
  const { currentShowtime, unavailableSeats } = useShowtime();

  const seatZones = currentShowtime?.seatMap?.seatZones;

  return buildZonesWithSeatsStatus(seatZones, unavailableSeats.seats);
};
