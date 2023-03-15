import { useState } from 'react';

export default function useTrackLocation() {
	const [locationErrorMessage, setLocationErrorMessage] = useState('');
	const [latLong, setLatLong] = useState(null);
	const [isFindingLocation, setIsFindingLocation] = useState(false);

	const success = (position) => {
		const { coords } = position;
		const { latitude, longitude } = coords;

		setLocationErrorMessage('');
		setLatLong({ lat: latitude, lng: longitude });
		setIsFindingLocation(false);
	};
	const error = () => {
		setIsFindingLocation(false);
		setLocationErrorMessage('unable to retrieve your location');
	};
	const handleTrackLocation = () => {
		setIsFindingLocation(true);
		if (!navigator.geolocation) {
			setLocationErrorMessage(
				'Geolocation is not supported by your browser'
			);
			setIsFindingLocation(false);
		} else {
			navigator.geolocation.getCurrentPosition(success, error);
		}
	};

	return {
		latLong,
		isFindingLocation,
		handleTrackLocation,
		locationErrorMessage,
	};
}
