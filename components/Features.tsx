import { StyleSheet, Text, View, Image } from 'react-native';
import React, { useState } from 'react';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { featuresData } from '../constants/Data';

interface feature {
	item: {
		icon: string | any;
		description: string;
		color: string;
		backgroundColor: string;
	};
}

const Features = () => {
	const [features, setFeatures] = useState(featuresData);

	const Header = () => (
		<View style={{ marginBottom: 12 }}>
			<Text style={{ fontSize: 20 }}>Features</Text>
		</View>
	);

	const renderItem = ({ item }: feature) => (
		<TouchableOpacity
			style={{
				marginBottom: 12,
				width: 60,
				alignItems: 'center',
			}}
			onPress={() => console.log(item.description)}
		>
			<View
				style={[styles.features, { backgroundColor: item.backgroundColor }]}
			>
				<Image
					source={item.icon}
					resizeMode="contain"
					style={[
						styles.image,
						{
							tintColor: item.color,
						},
					]}
				/>
			</View>
			<Text style={{ textAlign: 'center', flexWrap: 'wrap' }}>
				{item.description}
			</Text>
		</TouchableOpacity>
	);

	return (
		<FlatList
			ListHeaderComponent={Header}
			data={features}
			numColumns={4}
			columnWrapperStyle={{ justifyContent: 'space-between' }}
			keyExtractor={(item) => `${item.id}`}
			renderItem={renderItem}
			style={{ marginTop: 12 }}
		/>
	);
};

const styles = StyleSheet.create({
	features: {
		height: 50,
		width: 50,
		marginBottom: 5,
		borderRadius: 20,
		alignItems: 'center',
		justifyContent: 'center',
	},
	image: {
		height: 20,
		width: 20,
	},
});
export default Features;
