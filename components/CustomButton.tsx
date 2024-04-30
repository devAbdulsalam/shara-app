import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { forwardRef } from 'react';

type ButtonProps = {
	text: string;
	type: string;
	bgColor: string;
	fgColor: string;
} & React.ComponentPropsWithoutRef<typeof Pressable>;

const CustomButton = forwardRef<View | null, ButtonProps>(
	({ text, type = 'PRIMARY', bgColor, fgColor, ...pressableProps }, ref) => {
		return (
			<Pressable
				ref={ref}
				{...pressableProps}
				style={[
					styles.container,
					styles[`container_${type}`],
					bgColor ? { backgroundColor: bgColor } : {},
				]}
			>
				<Text
					style={[
						styles.text,
						styles[`text_${type}`],
						fgColor ? { color: fgColor } : {},
					]}
				>
					{text}
				</Text>
			</Pressable>
		);
	}
);

const styles = StyleSheet.create({
	container: {
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center',
		padding: 15,
		borderRadius: 5,
		elevation: 3,
		marginVertical: 5,
	},
	container_PRIMARY: {
		backgroundColor: '#3b71f3',
	},
	container_TERTIARY: {},
	text: {
		fontSize: 16,
		lineHeight: 21,
		fontWeight: 'bold',
		letterSpacing: 0.25,
		color: 'white',
	},
	text_PRIMARY: {
		color: 'white',
	},
	text_TERTIARY: {},
});
export default CustomButton;
