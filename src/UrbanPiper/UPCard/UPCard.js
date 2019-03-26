import React from 'react';
import styled from 'styled-components';

import Button from '../../Button/Button';
import Card from '../../Card/Card';
import Counter from '../../Counter/Counter';

const CardHeader = styled.b`
	display: inline-block;

	white-space: nowrap;
	width: 100%;
	overflow: hidden;
	text-overflow: ellipsis;
`;

const CardBody = styled.p`
	font-size: 0.9em;
`;

const CardFooter = styled.div`
	display: flex;
	flex-wrap: wrap;
	align-items: center;
`;

const CardFooterItem = styled.div`
	display: flex;
	justify-content: ${({ align }) =>
		align === 'left' ? 'flex-start' : 'flex-end'};
	align-items: center;

	width: 50%;
`;

const Icon = styled.span`
	display: inline-flex;

	position: relative;

	box-sizing: border-box;
	height: 1em;
	width: 1em;
	border-radius: 3px;
	margin-right: 0.25em;

	border: 1px solid
		${({ type }) => (type && type === 'veg' ? '#3cae4d' : '#f56349')};

	::after {
		box-sizing: border-box;

		content: '';

		position: absolute;
		top: 50%;
		left: 50%;

		height: 0.4em;
		width: 0.4em;
		border-radius: 50%;

		background-color: ${({ type }) =>
			type && type === 'veg' ? '#3cae4d' : '#f56349'};

		transform: translate(-50%, -50%);
	}
`;

export default function UPCard({
	width,
	primaryColor,
	secondaryColor,
	imageRatio,
	imageSrc,
	imageAlt,
	imagePlaceholder,
	imageFallback,
	title,
	description,
	itemQty,
	itemPrice,
	itemType,
	onItemQtyIncrease,
	onItemQtyDecrease,
	...otherProps
}) {
	return (
		<Card
			width={width}
			imageRatio={imageRatio}
			imageSrc={imageSrc}
			imageAlt={imageAlt}
			imagePlaceholder={imagePlaceholder}
			imageFallback={imageFallback}
			{...otherProps}
		>
			<CardHeader>
				{itemType === 'veg' || itemType === 'non-veg' ? (
					<Icon type={itemType} />
				) : null}
				{title}
			</CardHeader>
			<CardBody>{description}</CardBody>
			<CardFooter>
				<CardFooterItem align="left">
					<b>{itemPrice}</b>
				</CardFooterItem>
				<CardFooterItem align="right">
					{itemQty && itemQty > 0 ? (
						<Counter
							width="110px"
							primaryColor={primaryColor}
							useCarets
							onIncrement={onItemQtyIncrease}
							onDecrement={onItemQtyDecrease}
						>
							{itemQty}
						</Counter>
					) : (
						<Button
							width="110px"
							borderColor={primaryColor}
							color={primaryColor}
							onClick={onItemQtyIncrease}
						>
							ADD
						</Button>
					)}
				</CardFooterItem>
			</CardFooter>
		</Card>
	);
}
