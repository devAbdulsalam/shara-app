import { StyleSheet, FlatList, View, Animated } from 'react-native';
import React, { useRef, useState } from 'react';
import OnBoardingItem from './OnBoardingItem';
import { onBoardingData } from '@/constants/Data';
import Paginator from './Paginator';
import NavigationButtons from './NavigationButtons';
import AsyncStorage from '@react-native-async-storage/async-storage';
type onBoardingDataProps = {
	checkOnboarding: () => void;
};
const Onboarding = ({ checkOnboarding }: onBoardingDataProps) => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [slides, setSlides] = useState(onBoardingData);
	const scrollX = useRef(new Animated.Value(0)).current;
	const slidesRef = useRef(null);

	const viewableItemsChange = useRef(({ viewableItems }: any) => {
		setCurrentIndex(viewableItems[0].index);
	}).current;

	const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;
	const scrollBack = () => {
		if (currentIndex > 0) {
			slidesRef.current.scrollToIndex({ index: currentIndex - 1 });
		} else {
			console.log('FIRST ITEM');
		}
	};
	const scrollForward = async () => {
		if (currentIndex < slides.length - 1) {
			slidesRef.current.scrollToIndex({ index: currentIndex + 1 });
		} else {
			try {
				console.log('last slide');
				await AsyncStorage.setItem('isOnboarded', 'true');
				checkOnboarding();
			} catch (error) {
				console.log('Error @ set isOnbaording', error);
			}
		}
	};
	return (
		<View style={styles.container}>
			<View style={{ flex: 3 }}>
				<FlatList
					data={onBoardingData}
					keyExtractor={(item) => `${item.id}`}
					renderItem={({ item }) => <OnBoardingItem item={item} />}
					horizontal
					showsHorizontalScrollIndicator={false}
					pagingEnabled
					bounces={false}
					onScroll={Animated.event(
						[{ nativeEvent: { contentOffset: { x: scrollX } } }],
						{
							useNativeDriver: false,
						}
					)}
					scrollEventThrottle={32}
					viewabilityConfig={viewConfig}
					onViewableItemsChanged={viewableItemsChange}
					ref={slidesRef}
				/>
			</View>
			<Paginator data={onBoardingData} scollX={scrollX} />
			<NavigationButtons
				scrollForward={scrollForward}
				scrollBack={scrollBack}
				currentIndex={currentIndex}
			/>
		</View>
	);
};

export default Onboarding;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
});
