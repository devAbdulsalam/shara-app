import { useState } from 'react';
import { StyleSheet, View, Text, FlatList, Image } from 'react-native';
import { specialPromoData } from '../constants/Data';

const Promos = () => {
	const [specialPromos, setSpecialPromos] = useState(specialPromoData);

	const renderItem = (item: any) => (
		<View style={styles.item}>
			<Image style={styles.image} source={item.img} />
			<Text style={styles.title}>{item.title}</Text>
			<Text style={styles.description}>{item.description}</Text>
		</View>
	);

	return (
		<FlatList
			data={specialPromos}
			contentContainerStyle={{ paddingHorizontal: 10 }}
			numColumns={2}
			columnWrapperStyle={{ justifyContent: 'space-between' }}
			showsVerticalScrollIndicator={false}
			keyExtractor={(item) => `${item.id}`}
			renderItem={renderItem}
		/>
	);
};
const styles = StyleSheet.create({
	item: {
		padding: 10,
		borderWidth: 1,
		borderColor: '#e8e8e8',
		borderRadius: 5,
		backgroundColor: 'white',
	},
	image: {
		width: 600,
	},
	title: {
		fontSize: 18,
		fontWeight: 'bold',
		color: 'blue',
	},
	description: {
		padding: 10,
	},
});
export default Promos;
