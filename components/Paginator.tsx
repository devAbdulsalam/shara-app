import { StyleSheet, Animated, View, useWindowDimensions } from 'react-native';
import React from 'react';

const Paginator = ({ data, scollX }) => {
	const { width } = useWindowDimensions();
	return (
		<View style={styles.container}>
			{data.map((item, index) => {
				const inputRange = [
					(index - 1) * width,
					index * width,
					(index + 1) * width,
				];
				const dotWidth = scollX.interpolate({
					inputRange,
					outputRange: [10, 20, 10],
					extrapolate: 'clamp',
				});
				const opacity = scollX.interpolate({
					inputRange,
					outputRange: [0.3, 1, 0.3],
					extrapolate: 'clamp',
				});
				return (
					<Animated.View
						key={item.id}
						style={[
							styles.dot,
							{
								width: dotWidth,
								opacity,
							},
						]}
					/>
				);
			})}
		</View>
	);
};

export default Paginator;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		height: 64,
	},
	dot: {
		height: 10,
		borderRadius: 5,
		backgroundColor: "#4A9",
		marginHorizontal: 8,
	},
});
