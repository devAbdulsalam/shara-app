import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';

const { createContext } = require('react');

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [userToken, setUserToken] = useState(null);
	const [user, setUser] = useState(null);

	const login = async (data) => {
		AsyncStorage.setItem('accessToken', data.accessToken);
		AsyncStorage.setItem('userInfo', JSON.stringify(data.user));
		AsyncStorage.setItem('refreshToken', data.refreshToken);
		setUserToken(user?.accessToken);
		setUser(user?.user);
	};

	const getUser = async () => {
		try {
			setIsLoading(true);
			const user = await AsyncStorage.getItem('userInfo');
			if (user) {
				setIsLoading(false);
				console.log(user);
				setUserToken(JSON.parse(user));
				return;
			} else {
				return setIsLoading(false);
			}
		} catch (error) {
			console.log('@ getUser login', error);
		}
	};
	useEffect(() => {
		getUser();
	}, []);
	const logout = async () => {
		setUserToken(null);
		setUser(null);
		setIsLoading(false);
		await AsyncStorage.removeItem('accessToken');
		await AsyncStorage.removeItem('userInfo');
		await AsyncStorage.removeItem('refreshToken');
		console.log('logout');
		router.navigate('/index');
	};

	return (
		<AuthContext.Provider
			value={{
				isLoading,
				user,
				userToken,
				setIsLoading,
				setUser,
				login,
				logout,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
