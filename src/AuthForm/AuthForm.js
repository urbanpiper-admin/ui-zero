import React, { Component } from 'react';
import styled from 'styled-components';

import Anchor from '../Anchor/Anchor';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import TextField from '../TextField/TextField';
import getComputedStyleAttributeValue from '../utils/getComputedStyleAttributeValue';

// import facebookLogo from '../public/images/fb.png';
// import googleLogo from '../public/images/go.png';

// TODO: add image support and social login
// TODO: find better alternate to detect local change

const Header = styled.div`
	padding: 20px;

	background-color: ${({ theme, primaryColor }) =>
		getComputedStyleAttributeValue(primaryColor, theme.primaryColor)};

	color: ${({ theme, secondaryColor }) =>
		getComputedStyleAttributeValue(secondaryColor, 'white')};
`;

const Body = styled.form`
	background-color: ${({ theme, secondaryColor }) =>
		getComputedStyleAttributeValue(secondaryColor, 'white')};
`;

const Container = styled.div`
	padding: 20px;
`;

const SocialContainer = styled(Container)`
	border-bottom: 1px solid #e2e2e2;
`;

const ContainerItem = styled.div`
	padding: 15px 0;
`;

const ModalAnchor = styled(Anchor)`
	margin: 0 20px;
`;

const Centered = styled.div`
	display: inline-block;

	width: ${({ width }) => getComputedStyleAttributeValue(width, '50%')};

	text-align: center;

	@media (max-width: 600px) {
		width: ${({ smWidth }) => getComputedStyleAttributeValue(smWidth, '100%')};
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
	color: hsl(0, 0%, 75%);
`;

export default class AuthForm extends Component {
	static getDerivedStateFromProps(props, state) {
		if (props.stage && props.stage !== state.stage && !state.isLocalChange) {
			return {
				stage: props.stage
			};
		}

		return {
			// TODO: evaluate need for this
			isLocalChange: false
		};
	}

	constructor(props) {
		super(props);

		this.state = {
			// stage: 'login' | 'signup' | 'forgot' | 'reset'
			stage: props.stage || 'reset',

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
		const { stage } = this.state;

		switch (stage) {
			case 'login':
				return 'Sign in to your account';
			case 'signup':
				return 'Create new account';
			default:
				return 'Reset your password';
		}
	}

	getButtonText() {
		const { stage } = this.state;

		switch (stage) {
			case 'login':
				return 'Sign in';
			case 'signup':
				return 'Sign up';
			case 'forgot':
				return 'Send OTP';
			case 'reset':
				return 'Reset password';
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
		event.preventDefault();

		this.setState({
			stage: newStage,
			isLocalChange: true
		});
	}

	inputChangeHandler(event, type) {
		this.setState({
			[type]: event.target.value,
			isLocalChange: true
		});
	}

	formSubmitHandler(event) {
		event.preventDefault();

		const { onSendOTP, onResetPassword, onLogin, onSignUp } = this.props;
		const { stage, phone, name, email, password, otp } = this.state;

		switch (stage) {
			case 'login':
				onLogin({
					phone,
					password
				});
				break;

			case 'signup':
				this.runIfPasswordsMatch(() =>
					onSignUp({
						phone,
						name,
						email,
						password
					})
				);

				break;

			case 'forgot':
				onSendOTP({
					phone
				});
				break;

			case 'reset':
				this.runIfPasswordsMatch(() => {
					onResetPassword({
						otp,
						password
					});

					this.resetFormFields();
				});

				break;

			default:
				return 'Unknown error';
		}
	}

	formCloseHandler(event) {
		const { onClose } = this.props;

		this.resetFormFields();

		onClose();
	}

	render() {
		const {
			primaryColor,
			secondaryColor,
			visible,
			onSendOTP,
			onResetPassword,
			onLogin,
			onSignUp,
			onGoogleLogin,
			onFacebookLogin,
			onClose,
			...otherProps
		} = this.props;
		const {
			stage,
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
					{stage === 'login' || stage === 'signup' ? (
						<SocialContainer>
							{/* <Centered smWidth="50%">
								<img src={facebookLogo} alt="facebook logo" width="80%" onClick={onFacebookLogin} />
							</Centered>
							<Centered smWidth="50%">
								<img src={googleLogo} alt="google logo" width="80%" onClick={onGoogleLogin} />
							</Centered> */}
							Social Login
						</SocialContainer>
					) : null}
					<Container>
						{stage === 'reset' ? (
							<ContainerItem>
								<TextField
									disabled={!visible}
									required
									width="100%"
									placeholder="OTP"
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
									maxLength="10"
									width="100%"
									placeholder="Phone"
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
										placeholder="Name"
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
										placeholder="Email"
										value={email}
										onChange={event => this.inputChangeHandler(event, 'email')}
									/>
								</ContainerItem>
							</React.Fragment>
						) : null}

						{stage !== 'forgot' ? (
							<ContainerItem>
								<TextField
									disabled={!visible}
									required
									type="password"
									width="100%"
									placeholder={stage === 'reset' ? 'New password' : 'Password'}
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
									placeholder="Confirm Password"
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
								<Centered>
									<ModalAnchor
										disabled={!visible}
										href="#"
										onClick={event =>
											this.stageChangeClickHandler(event, 'forgot')
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
									backgroundColor={primaryColor}
									color={getComputedStyleAttributeValue(
										secondaryColor,
										'white'
									)}
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
					</Container>
				</Body>
			</Modal>
		);
	}
}
