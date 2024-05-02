import { Text, View, StyleSheet, ScrollView } from 'react-native';
import { useContext, useEffect, useState } from 'react';
import Features from '@/components/Features';
import Promos from '@/components/Promos';
import { StatusBar } from 'expo-status-bar';
import { AuthContext } from '@/context/AuthContext';

export default function index() {
	const { user } = useContext(AuthContext);

	return (
		<ScrollView style={styles.container}>
			<StatusBar />
			<View style={styles.header}>
				<Text style={styles.headerText}>
					{user ? `Welcome ${user?.firstName}` : 'Welcome'}
				</Text>
			</View>
			<Features />
			<Promos />
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
	},
	header: {
		flex: 1,
	},
	headerText: {
		fontSize: 20,
		fontWeight: 'bold',
	},
	separator: {
		marginVertical: 30,
		height: 1,
		width: '80%',
	},
});
