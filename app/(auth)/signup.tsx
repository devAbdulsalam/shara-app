import {
	ActivityIndicator,
	Platform,
	Image,
	KeyboardAvoidingView,
	ScrollView,
	StatusBar,
	StyleSheet,
	Text,
	TextInput,
	View,
	useWindowDimensions,
	TouchableOpacity,
} from 'react-native';
import Toast from 'react-native-root-toast';
import { COLORS } from '@/constants/Colors';
import { useContext, useState } from 'react';
import { router } from 'expo-router';
import axios from 'axios';
import images from '@/constants/Images';
import CustomButton from '@/components/CustomButton';
import { AuthContext } from '@/context/AuthContext';
import { FontAwesome } from '@expo/vector-icons';
// const api = 'https://shara-api.onrender.com';
const api = 'https://localhost:8000/api/v1';
const forgetPassword = () => {
	const [name, onChangeName] = useState('');
	const [email, onChangeEmail] = useState('');
	const [phone, onChangePhone] = useState('');
	const [password, onChangePassword] = useState('');
	const [cPassword, onChangeCPassword] = useState('');
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [showCPassword, setShowCPassword] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const { login } = useContext(AuthContext);
	const { height } = useWindowDimensions();
	const [isError, setIsError] = useState('');
	const handleSignup = async () => {
		setIsError('');
		if (!email) {
			return setIsError('Name and password is required');
		}
		setIsLoading(true);
		const data = {
			name,
			email,
			phone,
			password,
		};
		axios
			.post(`${api}/users/register`, data)
			.then((res) => res.data)
			.then((data) => {
				login(data);
				setIsLoading(false);
				Toast.show('Logged in successfully!', {
					duration: Toast.durations.SHORT,
					position: Toast.positions.BOTTOM,
					shadow: true,
					animation: true,
				});
				router.replace('/(auth)/reset_password');
			})
			.catch((err) => {
				console.warn('Error', '@post forgot password', err);
				const message = err?.response?.data?.message || 'Something went wrong!';
				setIsError(message);
				Toast.show(message, {
					duration: Toast.durations.SHORT,
					position: Toast.positions.BOTTOM,
					shadow: true,
					animation: true,
				});
				setIsLoading(false);
			});
	};
	const handleLogin = () => {
		router.navigate('/(auth)/login');
	};
	const handleGoogleAuth = () => {
		console.log('handleGoogleAuth');
	};
	const handleShowPassword = () => setShowPassword(!showPassword);

	const handleShowCPassword = () => setShowCPassword(!showCPassword);
	return (
		<>
			{isLoading ? (
				<View style={[styles.container, styles.horizontal]}>
					<ActivityIndicator size="large" color={COLORS.lime} />
				</View>
			) : (
				<KeyboardAvoidingView
					behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
					style={{ flex: 1 }}
				>
					<ScrollView showsVerticalScrollIndicator={false}>
						<View style={styles.container}>
							<Image
								source={images.logo}
								style={[styles.image, { height: height * 0.3 }]}
								resizeMode="contain"
							/>
							<Text style={styles.titleText}>Sign up into your Account</Text>
							<View style={{ width: '100%', flex: 1, marginBottom: 5 }}>
								<Text style={styles.lable}>User name</Text>
								<TextInput
									style={styles.input}
									value={name}
									onChangeText={onChangeName}
									placeholder="john doe"
								/>
							</View>
							<View style={{ width: '100%', flex: 1, marginBottom: 5 }}>
								<Text style={styles.lable}>Email</Text>
								<TextInput
									style={styles.input}
									value={email}
									onChangeText={onChangeEmail}
									placeholder="abc@mail.com"
								/>
							</View>
							<View style={{ width: '100%', flex: 1, marginBottom: 5 }}>
								<Text style={styles.lable}>Phone number</Text>
								<TextInput
									style={styles.input}
									value={phone}
									onChangeText={onChangePhone}
									placeholder="09035989123"
								/>
							</View>
							<View style={{ width: '100%' }}>
								<Text style={styles.lable}>Password</Text>
								<View style={styles.passwordContainer}>
									<TextInput
										style={styles.password}
										onChangeText={onChangePassword}
										value={password}
										secureTextEntry={!showPassword}
										placeholder="******"
									/>
									<TouchableOpacity
										style={styles.eyes}
										onPress={handleShowPassword}
									>
										{!showPassword ? (
											<FontAwesome name="eye" size={16} />
										) : (
											<FontAwesome name="eye-slash" size={16} />
										)}
									</TouchableOpacity>
								</View>
							</View>

							<View style={{ width: '100%' }}>
								<Text style={styles.lable}>Confirm password</Text>
								<View style={styles.passwordContainer}>
									<TextInput
										style={styles.password}
										onChangeText={onChangeCPassword}
										value={cPassword}
										secureTextEntry={!showCPassword}
										placeholder="******"
									/>
									<TouchableOpacity
										style={styles.eyes}
										onPress={handleShowCPassword}
									>
										{!showCPassword ? (
											<FontAwesome name="eye" size={16} />
										) : (
											<FontAwesome name="eye-slash" size={16} />
										)}
									</TouchableOpacity>
								</View>
							</View>
							<View>
								{isError && <Text style={styles.error}>{isError}</Text>}
							</View>
							<CustomButton
								text="Register"
								onPress={handleSignup}
								type="PRIMARY"
								bgColor="green"
								fgColor="white"
							/>
							<View style={{ flex: 1, width: '100%', marginTop: 20 }}>
								<CustomButton
									text="Already have Account? login"
									onPress={handleLogin}
									type="TERTIARY"
									bgColor="#e3e3e3"
									fgColor="#363636"
								/>
								<CustomButton
									text="Sign in with Google"
									onPress={handleGoogleAuth}
									type="TERTIARY"
									bgColor="#E7EAF4"
									fgColor="#4A9"
								/>
							</View>
						</View>
					</ScrollView>
				</KeyboardAvoidingView>
			)}
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		paddingTop: StatusBar.currentHeight,
		padding: 8,
	},
	horizontal: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		padding: 10,
	},
	image: {
		width: '70%',
		aspectRatio: 1,
		maxHeight: 700,
		maxWidth: 400,
	},
	titleText: {
		fontSize: 16,
		fontWeight: 'bold',
		color: 'green',
		marginTop: 10,
		marginBottom: 20,
	},
	lable: {
		color: 'black',
	},
	input: {
		backgroundColor: 'white',
		borderColor: 'gray',
		borderRadius: 5,
		borderWidth: 1,
		marginTop: 5,
		padding: 10,
	},
	passwordContainer: {
		alignItems: 'center',
		backgroundColor: 'white',
		borderColor: 'gray',
		borderRadius: 5,
		borderWidth: 1,
		flexDirection: 'row',
		height: 48,
		justifyContent: 'space-between',
		marginBottom: 20,
		width: '100%',
	},
	password: {
		width: '100%',
		height: '100%',
		padding: 10,
	},
	eyes: {
		right: 5,
		top: 0,
		justifyContent: 'center',
		padding: 2,
		height: '100%',
		position: 'absolute',
		zIndex: 50,
	},
	button: {
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 6,
		paddingHorizontal: 32,
		borderRadius: 4,
		elevation: 3,
		backgroundColor: 'green',
	},
	text: {
		fontSize: 16,
		lineHeight: 21,
		fontWeight: 'bold',
		letterSpacing: 0.25,
		color: 'white',
	},
	link: {
		color: 'white',
	},
	error: {
		color: 'red',
		fontSize: 16,
		lineHeight: 21,
		letterSpacing: 0.25,
	},
});

export default forgetPassword;
