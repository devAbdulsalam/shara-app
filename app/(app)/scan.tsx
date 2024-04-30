import { StyleSheet, Text, Touchable, View } from 'react-native';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FontAwesome, FontAwesome6 } from '@expo/vector-icons';
import { router } from 'expo-router';

const scan = () => {
	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<TouchableOpacity
					style={{ width: 45, alignItems: 'center', justifyContent: 'center' }}
					onPress={() => router.navigate('(app)/home')}
				>
					<FontAwesome6 name="xmark" size={16} />
				</TouchableOpacity>
				<View
					style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
				>
					<Text style={{ fontSize: 20, fontWeight: 'bold' }}>Scan waste</Text>
				</View>
				<TouchableOpacity
					style={{ width: 45, alignItems: 'center', justifyContent: 'center' }}
					onPress={() => router.navigate('/modal')}
				>
					<FontAwesome name="info" size={16} />
				</TouchableOpacity>
			</View>
			<Text>scan</Text>
		</View>
	);
};

export default scan;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'black',
	},
	header: {
		backgroundColor: 'white',
		flexDirection: 'row',
		marginTop: 4,
		paddingHorizontal: 10,
		paddingVertical: 16,
	},
});
