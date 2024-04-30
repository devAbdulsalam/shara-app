import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '@/constants/Colors';
import CustomButton from './CustomButton';
import images from '@/constants/Images';

const HomeScreen = () => {
	const handelGetStarted = () => {
		router.push('/(auth)/login');
	};
	return (
		<LinearGradient
			colors={[COLORS.lime, COLORS.emerald]}
			style={{ flex: 1, width: '100%' }}
		>
			<View style={styles.container}>
				<Image source={images.logo} style={styles.image} resizeMode="contain" />
				<Text style={styles.text}>Healthy, Wealthy, Together</Text>
			</View>
			<View
				style={{
					marginHorizontal: 10,
					marginTop: 'auto',
					marginBottom: 10,
				}}
			>
				<CustomButton
					text="Get started"
					onPress={handelGetStarted}
					type="TERTIARY"
					bgColor="white"
					fgColor="green"
				/>
			</View>
		</LinearGradient>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center',
	},
	image: {
		width: '70%',
		aspectRatio: 1,
		maxHeight: 700,
		maxWidth: 400,
	},
	header: {
		fontSize: 20,
		fontWeight: 'bold',
		color: 'white',
	},
	text: {
		color: 'white',
	},
});
