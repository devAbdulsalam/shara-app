import { useEffect, useState } from 'react';
import Onboarding from '@/components/Onboarding';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeScreen from '@/components/HomeScreen';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';

const Loading = () => {
	return (
		<View>
			<ActivityIndicator size="large" />
		</View>
	);
};

const Index = () => {
	const [isOnboarded, setIsOnboarded] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const checkOnboarding = async () => {
		try {
			setIsLoading(true);
			const value = await AsyncStorage.getItem('isOnboarded');
			if (value !== null) {
				// await AsyncStorage.removeItem('isOnboarded');
				// setIsOnboarded(false);
				setIsOnboarded(true);
			}
		} catch (e) {
			console.log('Error @checkOnbaording', e);
		} finally {
			setIsLoading(false);
		}
	};
	useEffect(() => {
		checkOnboarding();
	}, []);
	return (
		<View style={styles.container}>
			<Stack.Screen
				options={{
					headerShown: false,
				}}
			/>
			{isLoading ? (
				<Loading />
			) : isOnboarded ? (
				<HomeScreen />
			) : (
				<Onboarding checkOnboarding={checkOnboarding} />
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
});
export default Index;
