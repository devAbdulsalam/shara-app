import { StyleSheet, TextInput, View } from 'react-native';
import React from 'react';

const CustomInput = ({ placeholder, value, setValue }) => {
	return (
		<View style={styles.container}>
			<TextInput
				value={value}
				onChangeText={setValue}
				placeholder={placeholder}
				style={styles.input}
			/>
		</View>
	);
};

export default CustomInput;

const styles = StyleSheet.create({
	container: {
		width: '100%',
		marginVertical: 5,
		paddingHorizontal: 10,
		borderRadius: 5,
	},
	input: {
		width: 200,
		height: 44,
		padding: 10,
		borderWidth: 1,
		backgroundColor: 'white',
		borderColor: '#e8e8e8',
		marginBottom: 10,
		borderRadius: 5,
	},
});
