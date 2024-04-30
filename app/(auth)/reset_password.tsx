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
} from 'react-native';
import Toast from 'react-native-root-toast';
import { COLORS } from '@/constants/Colors';
import { useContext, useState } from 'react';
import { router } from 'expo-router';
import axios from 'axios';
import images from '@/constants/Images';
import CustomButton from '@/components/CustomButton';
import { AuthContext } from '@/context/AuthContext';
// const api = 'https://shara-api.onrender.com';
const api = 'https://localhost:8000/api/v1';
const resetPassword = () => {
	const [password, onChangePassword] = useState('');
	const [cpassword, onChangeCPassword] = useState('');
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const { login } = useContext(AuthContext);
	const { height } = useWindowDimensions();
	const [isError, setIsError] = useState('');
	const handleForgotPassword = async () => {
		setIsError('');
		if (!password) {
			return setIsError('new password is required');
		}
		if (password !== cpassword) {
			return setIsError('Passwords must match');
		}
		setIsLoading(true);
		const data = {
			password,
		};
		axios
			.post(`${api}/users/reset-password`, data)
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
				router.replace('/(auth)/login');
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
	const handleSignup = () => {
		router.navigate('/(auth)/signup');
	};
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
							<Text style={styles.titleText}>Reset Password</Text>
							<View style={{ width: '100%', flex: 1, marginBottom: 5 }}>
								<Text style={styles.lable}>New Password</Text>
								<TextInput
									style={styles.input}
									value={password}
									onChangeText={onChangePassword}
									placeholder="password"
								/>
							</View>
							<View style={{ width: '100%', flex: 1, marginBottom: 5 }}>
								<Text style={styles.lable}>Confirm password</Text>
								<TextInput
									style={styles.input}
									value={cpassword}
									onChangeText={onChangeCPassword}
									placeholder="confirm password"
								/>
							</View>
							<View>
								{isError && <Text style={styles.error}>{isError}</Text>}
							</View>
							<CustomButton
								text="Reset Password"
								onPress={handleForgotPassword}
								type="PRIMARY"
								bgColor="green"
								fgColor="white"
							/>
							<View style={{ flex: 1, width: '100%', marginTop: 20 }}>
								<CustomButton
									text="Login"
									onPress={handleLogin}
									type="TERTIARY"
									bgColor="#E7EAF4"
									fgColor="#4765A9"
								/>
								<CustomButton
									text="Dont have Account? Signup"
									onPress={handleSignup}
									type="TERTIARY"
									bgColor="#e3e3e3"
									fgColor="#363636"
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

export default resetPassword;
