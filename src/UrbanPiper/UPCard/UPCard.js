import React from 'react';
import styled from 'styled-components';

import Button from '../../Button/Button';
import Card from '../../Card/Card';
import Counter from '../../Counter/Counter';

const CardHeader = styled.div`
	display: inline-block;

	overflow: hidden;

	width: 100%;
	margin: 10px 0 0;

	white-space: nowrap;
	text-overflow: ellipsis;
	font-weight: bolder;
	font-size: 16px;
`;

const CardBody = styled.p`
	margin: 5px 0 20px;

	font-weight: lighter;
	font-size: 14px;
`;

const CardFooter = styled.div`
	display: flex;
	flex-wrap: wrap;
	align-items: center;

	margin-bottom: 5px;
`;

const CardFooterItem = styled.div`
	display: flex;
	justify-content: ${({ align }) =>
		align === 'left' ? 'flex-start' : 'flex-end'};
	align-items: center;

	width: 50%;
`;

const Price = styled(CardFooterItem)`
	font-weight: bolder;
	font-size: 16px;
`;

const Icon = styled.span`
	display: inline-flex;

	position: relative;

	box-sizing: border-box;
	height: 16px;
	width: 16px;
	border-radius: 3px;
	margin-right: 3px;

	border: 1px solid
		${({ type }) => (type && type === 'veg' ? '#3cae4d' : '#f56349')};

	::after {
		box-sizing: border-box;

		content: '';

		position: absolute;
		top: 50%;
		left: 50%;

		height: 6px;
		width: 6px;
		border-radius: 50%;

		background-color: ${({ type }) =>
			type && type === 'veg' ? '#3cae4d' : '#f56349'};

		transform: translate(-50%, -50%);
	}
`;

const CardCounter = styled(Counter)`
	font-size: 14px;
`;

const CardButton = styled(Button)`
	font-size: 13px;
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
				<Price align="left">{itemPrice}</Price>
				<CardFooterItem align="right">
					{itemQty && itemQty > 0 ? (
						<CardCounter
							width="110px"
							primaryColor={primaryColor}
							useCarets
							onIncrement={onItemQtyIncrease}
							onDecrement={onItemQtyDecrease}
						>
							{itemQty}
						</CardCounter>
					) : (
						<CardButton
							width="110px"
							borderColor={primaryColor}
							color={primaryColor}
							onClick={onItemQtyIncrease}
						>
							ADD
						</CardButton>
					)}
				</CardFooterItem>
			</CardFooter>
		</Card>
	);
}
