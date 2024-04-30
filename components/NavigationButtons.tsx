import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';

const NavigationButtons = ({ scrollForward, scrollBack, currentIndex }) => {
	return (
		<View style={styles.container}>
			{currentIndex > 0 && (
				<TouchableOpacity onPress={scrollBack} style={styles.button}>
					<AntDesign name="arrowleft" size={18} color="white" />
				</TouchableOpacity>
			)}
			<TouchableOpacity onPress={scrollForward} style={styles.button}>
				<AntDesign name="arrowright" size={18} color="white" />
			</TouchableOpacity>
		</View>
	);
};

export default NavigationButtons;

const styles = StyleSheet.create({
	container: {
		width: '100%',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: 10,
	},
	button: {
		backgroundColor: 'green',
		borderRadius: 100,
		padding: 20,
	},
});
