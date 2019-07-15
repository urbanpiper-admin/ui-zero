import React from 'react';
import styled from 'styled-components';

import Button from '../Button';
import Modal from '../Modal';
import TextField from '../TextField';

const LocationSelectorElement = styled(Modal)`
	padding: 40px;

	min-height: 100%;
`;

const Modes = styled.div`
	display: flex;

	position: relative;

	margin-bottom: 30px;

	&::after {
		content: '';

		position: absolute;
		top: 100%;
		left: 0;

		height: 1px;
		width: 50%;

		background-color: ${({ theme }) => theme.primaryColor};

		transform: translateX(${({ mode }) => (mode === 'pickup' ? '100%' : '0')});
		transition: transform 0.16s;
	}
`;

const Mode = styled(Button)`
	border: 0;

	${({ isActive, theme }) =>
		isActive
			? `
				font-weight: 600;
				color: ${theme.primaryColor};
			`
			: ''}
`;

const SearchInput = styled(TextField)`
	height: 40px;

	&& + label,
	&&:focus + label,
	&&:hover + label {
		transform: translateY(-30px);
	}
`;

const Container = styled.div`
	margin-top: 25px;
	padding: 20px;

	border: 1px solid #c2c2c2;

	cursor: pointer;
`;

const CurrentLocationSelection = styled(Button)`
	justify-content: flex-start;

	text-align: left;
	font-family: inherit;
`;

const Heading = styled.div`
	font-weight: 400;
	font-size: 12px;
`;

const Location = styled(Button)`
	justify-content: flex-start;

	padding: 20px 0;
	border-bottom: 1px dashed #a2a2a2;

	text-align: left;
	font-family: inherit;

	&:first-child {
		padding-top: 0;
	}

	&:last-child {
		padding-bottom: 0;
		border-bottom: 0;
	}
`;

const Title = styled.div`
	width: 100%;

	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;
	font-weight: 500;
	color: #292929;
	font-size: 16px;

	${Container}:hover > &,
	${Location}:hover > &,
	${Container}:focus > &,
	${Location}:focus > & {
		color: ${({ theme }) => theme.primaryColor};
	}
`;

const Paragraph = styled.p`
	margin: 0;
	padding: 5px 0;

	font-size: 13px;
	color: #a2a2a2;
`;

const Locations = ({ disabled, locations = [], onLocationSelect }) => (
	<React.Fragment>
		{locations.map((location, index) => (
			<Location
				disabled={disabled}
				width="100%"
				height="100%"
				borderColor="transparent"
				backgroundColor="transparent"
				key={location.id || index}
				onClick={event => onLocationSelect(location)}
			>
				<Title>{location.name}</Title>
				<Paragraph>{location.address}</Paragraph>
			</Location>
		))}
	</React.Fragment>
);

function LocationSelector({
	mode = 'delivery',
	visible,
	savedLocations = [],
	searchResults = [],
	onClose,
	onGetCurrentLocation,
	onModeChange,
	searchKey,
	onSearchKeyChange,
	onLocationSelect,
	...otherProps
}) {
	const getLocation = event => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(onGetCurrentLocation);
		}
	};

	const isPickupMode = mode === 'pickup';

	const modeChangeHandler = mode => {
		onSearchKeyChange('');
		onModeChange(mode);
	};

	const SearchResults = (
		<Container>
			<Locations
				disabled={!visible}
				locations={searchResults}
				onLocationSelect={onLocationSelect}
			/>
		</Container>
	);

	const PickupModeBody =
		mode === 'pickup' && searchResults && searchResults.length
			? SearchResults
			: null;

	const DeliveryModeBody =
		searchResults && searchResults.length ? (
			SearchResults
		) : (
			<React.Fragment>
				<Container
					disabled={!visible}
					as={CurrentLocationSelection}
					width="100%"
					height="100%"
					borderColor="transparent"
					backgroundColor="transparent"
					onClick={getLocation}
				>
					<Title>Get current location</Title>
					<Paragraph>Using GPS</Paragraph>
				</Container>

				{savedLocations && savedLocations.length ? (
					<Container>
						<Heading>SAVED ADDRESSES</Heading>
						<Locations
							disabled={!visible}
							locations={savedLocations}
							onLocationSelect={onLocationSelect}
						/>
					</Container>
				) : null}
			</React.Fragment>
		);

	return (
		<LocationSelectorElement
			sliding
			align="left"
			showModal={visible}
			onClose={onClose}
			{...otherProps}
		>
			<Modes mode={mode}>
				<Mode
					width="50%"
					backgroundColor="transparent"
					color="inherit"
					isActive={!isPickupMode}
					onClick={event => modeChangeHandler('delivery')}
				>
					DELIVERY
				</Mode>
				<Mode
					width="50%"
					backgroundColor="transparent"
					color="inherit"
					isActive={isPickupMode}
					onClick={event => modeChangeHandler('pickup')}
				>
					PICKUP
				</Mode>
			</Modes>

			<SearchInput
				disabled={!visible}
				label="Enter a location"
				variant="boxed"
				width="100%"
				value={searchKey}
				onChange={event => onSearchKeyChange(event.target.value)}
			/>
			{isPickupMode ? PickupModeBody : DeliveryModeBody}
		</LocationSelectorElement>
	);
}

export default LocationSelector;
