import React, { Component } from 'react';
import styled from 'styled-components';

import Anchor from '../Anchor';
import Button from '../Button';
import Modal from '../Modal';
import TextField from '../TextField';

const Header = styled.div`
	padding: 20px;

	background-color: ${({ theme, primaryColor }) =>
		primaryColor || theme.primaryColor};

	color: ${({ theme, secondaryColor }) => secondaryColor};
`;

const Body = styled.div`
	background-color: ${({ theme, secondaryColor }) => secondaryColor};
`;

const Form = styled.form`
	padding: 20px;
`;

const SocialContainer = styled.div`
	padding: 20px;
	border-bottom: 1px solid #e2e2e2;
`;

const SocialButton = styled(Button)`
	padding: 0;
`;

const ContainerItem = styled.div`
	padding: 15px 0;
`;

const ModalAnchor = styled(Anchor)`
	margin: 0 20px;
`;

const Centered = styled.div`
	display: inline-block;

	width: ${({ width }) => width || '50%'};

	text-align: center;

	@media (max-width: 600px) {
		width: ${({ smWidth }) => smWidth || '100%'};
		${({ smPadding }) => (smPadding ? `padding: ${smPadding}` : '')}
	}
`;

const OptionsSeparator = styled.div`
	display: flex;
	align-items: center;

	width: 100%;

	color: #bfbfbf;

	::before,
	::after {
		content: '';

		height: 1px;
		width: 100%;

		background-color: #bfbfbf;
	}

	::before {
		margin: 0 10px 0 0;
	}

	::after {
		margin: 0 0 0 10px;
	}
`;

const ModalButton = styled(Button)`
	width: 80%;

	@media (max-width: 600px) {
		width: 100%;
	}
`;

const CheckMessage = styled.span`
	font-size: 12px;
	color: #bfbfbf;
`;

export default class AuthForm extends Component {
	// static getDerivedStateFromProps(props, state) {
	// 	console.log('update', props, state);

	// 	if (props.stage !== state.stage) {
	// 		// if (props.stage && props.stage !== state.stage) {
	// 		return {
	// 			stage: props.stage
	// 			// isLocalChange: false
	// 		};
	// 	}

	// 	return {};

	// 	return {
	// 		isLocalChange: false
	// 	};
	// }

	constructor(props) {
		super(props);

		this.state = {
			// stage: 'login' | 'signup' | 'verify' | 'reset' | 'guest'
			stage: props.stage || 'login',

			phone: '',
			name: '',
			email: '',
			password: '',
			confirmPassword: '',
			otp: '',
			isLocalChange: false,

			passwordMatchFail: false
		};

		this.runIfPasswordsMatch = this.runIfPasswordsMatch.bind(this);
		this.getHeaderMessage = this.getHeaderMessage.bind(this);
		this.getButtonText = this.getButtonText.bind(this);
		this.resetFormFields = this.resetFormFields.bind(this);

		this.stageChangeClickHandler = this.stageChangeClickHandler.bind(this);
		this.inputChangeHandler = this.inputChangeHandler.bind(this);
		this.formSubmitHandler = this.formSubmitHandler.bind(this);
		this.formCloseHandler = this.formCloseHandler.bind(this);
	}

	runIfPasswordsMatch(onMatch) {
		const { password, confirmPassword } = this.state;

		if (password === confirmPassword) {
			onMatch();

			this.setState({
				passwordMatchFail: false,
				isLocalChange: true
			});
		} else {
			this.setState({
				passwordMatchFail: true,
				isLocalChange: true
			});
		}
	}

	getHeaderMessage() {
		// const { stage } = this.state;
		const { stage } = this.props;

		switch (stage) {
			case 'login':
				return 'Sign in to your account';
			case 'signup':
				return 'Create new account';
			case 'guest':
				return 'Continue as guest';
			case 'verify':
				return 'Verify phone';
			case 'phone':
				return 'Enter your phone number';
			case 'reset':
				return 'Reset your password';
			default:
				return 'Error occured';
		}
	}

	getButtonText() {
		// const { stage } = this.state;
		const { stage } = this.props;

		switch (stage) {
			case 'login':
				return 'Sign in';
			case 'signup':
				return 'Sign up';
			case 'verify':
				return 'Submit OTP';
			// case 'forgot':
			// 	return 'Send OTP';
			case 'phone':
				return 'Send OTP';
			case 'reset':
				return 'Reset password';
			case 'guest':
				return 'Checkout as guest';
			default:
				return 'Unknown error';
		}
	}

	resetFormFields() {
		this.setState({
			phone: '',
			name: '',
			email: '',
			password: '',
			confirmPassword: '',
			otp: '',
			isLocalChange: true
		});
	}

	stageChangeClickHandler(event, newStage) {
		const { onStageChange } = this.props;

		event.preventDefault();

		onStageChange(event, newStage);

		// this.setState({
		// 	stage: newStage,
		// 	isLocalChange: true
		// });
	}

	inputChangeHandler(event, type) {
		this.setState({
			[type]: event.target.value,
			isLocalChange: true
		});
	}

	formSubmitHandler(event) {
		event.preventDefault();

		const {
			onSendOTP,
			onResetPassword,
			onLogin,
			onSignUp,
			onVerify,
			onGuestCheckout,
			stage
		} = this.props;
		const { phone, name, email, password, otp } = this.state;

		switch (stage) {
			case 'login':
				onLogin({
					phone,
					password
				});
				break;

			case 'signup':
				this.runIfPasswordsMatch(() => {
					onSignUp({
						phone,
						name,
						email,
						password
					});
				});
				break;

			// case 'forgot':
			case 'phone':
				onSendOTP({
					phone
				});
				break;

			case 'verify':
				onVerify({
					otp
				});
				break;

			case 'reset':
				this.runIfPasswordsMatch(() => {
					onResetPassword({
						otp,
						password
					});
				});
				break;

			case 'guest':
				onGuestCheckout({
					name,
					phone
				});
				break;

			default:
				return 'Unknown error';
		}

		this.resetFormFields();
	}

	formCloseHandler(event) {
		const { onClose } = this.props;

		this.resetFormFields();

		onClose();
	}

	render() {
		const {
			primaryColor,
			secondaryColor = 'white',
			visible,
			onSendOTP,
			onVerify,
			stage,
			onResetPassword,
			onLogin,
			onSignUp,
			disableSocialLogin = false,
			onSocialLogin1,
			onSocialLogin2,
			disableGuestCheckout = false,
			onGuestCheckout,
			onClose,
			onStageChange,
			socialImageSrc1,
			socialImageSrc2,
			...otherProps
		} = this.props;

		const {
			// stage,
			phone,
			name,
			email,
			password,
			confirmPassword,
			otp,
			passwordMatchFail
		} = this.state;

		return (
			<Modal
				showModal={visible}
				onClose={this.formCloseHandler}
				{...otherProps}
			>
				<Header primaryColor={primaryColor} secondaryColor={secondaryColor}>
					{this.getHeaderMessage()}
				</Header>
				<Body onSubmit={this.formSubmitHandler}>
					{!disableSocialLogin && (stage === 'login' || stage === 'signup') ? (
						<SocialContainer>
							<Centered smWidth="50%">
								<div>
									<SocialButton
										width="80%"
										borderColor="transparent"
										onClick={onSocialLogin1}
									>
										<img
											src={socialImageSrc1}
											alt="social login 1"
											width="100%"
										/>
									</SocialButton>
								</div>
							</Centered>
							<Centered smWidth="50%">
								<SocialButton
									width="80%"
									borderColor="transparent"
									onClick={onSocialLogin2}
								>
									<img
										src={socialImageSrc2}
										alt="social login 2"
										width="100%"
									/>
								</SocialButton>
							</Centered>
						</SocialContainer>
					) : null}
					<Form>
						{/* TODO: Remove repetitive code. */}
						{stage === 'guest' ? (
							<ContainerItem>
								<TextField
									disabled={!visible}
									required
									type="text"
									width="100%"
									// placeholder="Name"
									label="Name"
									value={name}
									onChange={event => this.inputChangeHandler(event, 'name')}
								/>
							</ContainerItem>
						) : null}

						{stage === 'reset' || stage === 'verify' ? (
							<ContainerItem>
								<TextField
									disabled={!visible}
									required
									width="100%"
									// placeholder="OTP"
									label="OTP"
									value={otp}
									onChange={event => this.inputChangeHandler(event, 'otp')}
								/>
							</ContainerItem>
						) : (
							<ContainerItem>
								<TextField
									disabled={!visible}
									required
									type="tel"
									width="100%"
									// placeholder="Phone"
									label="Phone"
									value={phone}
									onChange={event => this.inputChangeHandler(event, 'phone')}
								/>
							</ContainerItem>
						)}
						{stage === 'signup' ? (
							<React.Fragment>
								<ContainerItem>
									<TextField
										disabled={!visible}
										required
										type="text"
										width="100%"
										// placeholder="Name"
										label="Name"
										value={name}
										onChange={event => this.inputChangeHandler(event, 'name')}
									/>
								</ContainerItem>
								<ContainerItem>
									<TextField
										disabled={!visible}
										required
										type="email"
										width="100%"
										// placeholder="Email"
										label="Email"
										value={email}
										onChange={event => this.inputChangeHandler(event, 'email')}
									/>
								</ContainerItem>
							</React.Fragment>
						) : null}
						{stage === 'login' || stage === 'signup' || stage === 'reset' ? (
							<ContainerItem>
								<TextField
									disabled={!visible}
									required
									type="password"
									width="100%"
									// placeholder={stage === 'reset' ? 'New password' : 'Password'}
									label={stage === 'reset' ? 'New password' : 'Password'}
									value={password}
									onChange={event => this.inputChangeHandler(event, 'password')}
								/>
							</ContainerItem>
						) : null}
						{stage === 'signup' || stage === 'reset' ? (
							<ContainerItem>
								<TextField
									disabled={!visible}
									required
									type="password"
									width="100%"
									// placeholder="Confirm Password"
									label="Confirm Password"
									warning={passwordMatchFail ? "Passwords don't match" : ''}
									value={confirmPassword}
									onChange={event =>
										this.inputChangeHandler(event, 'confirmPassword')
									}
								/>
							</ContainerItem>
						) : null}
						<ContainerItem>
							{stage === 'login' ? (
								<Centered smPadding="0 0 10px">
									<ModalAnchor
										disabled={!visible}
										href="#"
										onClick={event =>
											this.stageChangeClickHandler(event, 'phone')
										}
									>
										Forgot Password?
									</ModalAnchor>
								</Centered>
							) : null}
							<Centered width={stage !== 'login' ? '100%' : ''}>
								<ModalButton
									disabled={!visible}
									width="100%"
									variant="fill"
									backgroundColor={primaryColor}
									color={secondaryColor}
								>
									{this.getButtonText()}
								</ModalButton>
							</Centered>
						</ContainerItem>
						<ContainerItem>
							<Centered width="100%">
								<CheckMessage>
									{stage === 'login' ? "Don't have an account?" : 'Back to'}{' '}
								</CheckMessage>
								<Anchor
									disabled={!visible}
									href="#"
									onClick={event =>
										this.stageChangeClickHandler(
											event,
											stage === 'login' ? 'signup' : 'login'
										)
									}
								>
									{' '}
									SIGN {stage === 'login' ? 'UP' : 'IN'}
								</Anchor>
							</Centered>
						</ContainerItem>
						{!disableGuestCheckout && stage === 'login' ? (
							<React.Fragment>
								<ContainerItem>
									<Centered width="100%">
										<OptionsSeparator>OR</OptionsSeparator>
									</Centered>
								</ContainerItem>
								<ContainerItem>
									<Button
										width="100%"
										backgroundColor={secondaryColor}
										color="#9f9396"
										borderColor="#9f9396"
										styleOnHover={{
											color: primaryColor,
											'border-color': primaryColor
										}}
										onClick={event =>
											this.stageChangeClickHandler(event, 'guest')
										}
									>
										CONTINUE AS GUEST
									</Button>
								</ContainerItem>
							</React.Fragment>
						) : null}
					</Form>
				</Body>
			</Modal>
		);
	}
}
