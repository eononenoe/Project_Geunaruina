import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  FlatList,
  Animated,
  SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ScaledSheet, scale, verticalScale } from 'react-native-size-matters';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const MAX_WIDTH = 500; // 최대 너비 제한
const SLIDE_WIDTH = Math.min(SCREEN_WIDTH, MAX_WIDTH);

// 화면 높이에 따른 상단 여백 계산 (5단계)
const getTopPadding = () => {
  if (SCREEN_HEIGHT >= 1000) {
    return 350; // 매우 큰 화면 (iPad 등): 350
  } else if (SCREEN_HEIGHT >= 900) {
    return 280; // 큰 화면 (iPhone Pro Max 등): 280
  } else if (SCREEN_HEIGHT >= 800) {
    return 200; // 중간 화면 (iPhone 11/12/13 등): 200
  } else if (SCREEN_HEIGHT >= 700) {
    return 130; // 작은 화면 (iPhone 8 등): 130
  } else {
    return 80; // 매우 작은 화면 (iPhone SE 등): 80
  }
};
const TOP_PADDING = getTopPadding();

const onboardingSlides = [
  {
    id: '1',
    icon: 'heart-flash',
    title: '재회,',
    subtitle: '언제 다시 만날 수 있을까요?',
    description: '정확한 사주로 알아보세요',
  },
  {
    id: '2',
    icon: 'crystal-ball',
    title: '정확한',
    subtitle: '만세력 기반 사주 분석',
    description: '나의 운명을 확인하세요',
  },
  {
    id: '3',
    icon: 'star-four-points',
    title: '매일 업데이트되는',
    subtitle: '오늘의 운세',
    description: '당신의 하루를 응원합니다',
  },
];

export default function OnboardingScreen({ navigation }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);
  const scrollX = useRef(new Animated.Value(0)).current;

  const handleNext = () => {
    if (currentIndex < onboardingSlides.length - 1) {
      const nextIndex = currentIndex + 1;
      flatListRef.current?.scrollToOffset({
        offset: nextIndex * SLIDE_WIDTH,
        animated: true,
      });
      setCurrentIndex(nextIndex);
    } else {
      navigation.navigate('Login');
    }
  };

  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / SLIDE_WIDTH);
    if (index !== currentIndex && index >= 0 && index < onboardingSlides.length) {
      setCurrentIndex(index);
    }
  };

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index || 0);
    }
  }).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  const renderItem = ({ item }) => (
    <View style={[styles.slideContainer, { width: SLIDE_WIDTH }]}>
      <View style={styles.slideContent}>
        <Icon
          name={item.icon}
          size={scale(100)}
          color="#9333EA"
          style={styles.icon}
        />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <LinearGradient
            colors={['#9333EA', '#EC4899']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradientText}
          >
            <Text style={styles.subtitle}>{item.subtitle}</Text>
          </LinearGradient>
          <Text style={styles.description}>{item.description}</Text>
        </View>
      </View>
    </View>
  );

  const renderDots = () => (
    <View style={styles.dotsContainer}>
      {onboardingSlides.map((_, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => {
            flatListRef.current?.scrollToOffset({
              offset: index * SLIDE_WIDTH,
              animated: true,
            });
            setCurrentIndex(index);
          }}
          style={[
            styles.dot,
            index === currentIndex && styles.activeDot,
          ]}
        />
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.skipButton}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.skipText}>건너뛰기</Text>
      </TouchableOpacity>

      <View style={styles.contentArea}>
        <View style={styles.flatListWrapper}>
          <FlatList
            ref={flatListRef}
            data={onboardingSlides}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onViewableItemsChanged={onViewableItemsChanged}
            viewabilityConfig={viewabilityConfig}
            scrollEventThrottle={16}
            bounces={false}
            snapToInterval={SLIDE_WIDTH}
            snapToAlignment="start"
            decelerationRate="fast"
            removeClippedSubviews={true}
            getItemLayout={(data, index) => ({
              length: SLIDE_WIDTH,
              offset: SLIDE_WIDTH * index,
              index,
            })}
            onScroll={(event) => {
              handleScroll(event);
              Animated.event(
                [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                { useNativeDriver: false }
              )(event);
            }}
          />
        </View>
      </View>

      <View style={styles.footer}>
        {renderDots()}

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleNext}>
            <LinearGradient
              colors={['#9333EA', '#EC4899']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.buttonGradient}
            >
              <Text style={styles.buttonText}>
                {currentIndex === onboardingSlides.length - 1 ? '시작하기' : '다음'}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
  },
  skipButton: {
    position: 'absolute',
    top: '16@vs',
    right: '24@s',
    zIndex: 10,
    paddingVertical: '8@vs',
    paddingHorizontal: '16@s',
  },
  skipText: {
    fontSize: '16@ms',
    color: '#6B7280',
    fontWeight: '600',
  },
  contentArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatListWrapper: {
    width: SLIDE_WIDTH,
    flex: 1,
    overflow: 'hidden',
  },
  slideContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: TOP_PADDING,
  },
  slideContent: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: '40@s',
  },
  icon: {
    marginBottom: '32@vs',
  },
  textContainer: {
    alignItems: 'center',
    width: '100%',
  },
  title: {
    fontSize: '28@ms',
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: '8@vs',
    textAlign: 'center',
  },
  gradientText: {
    borderRadius: 4,
    paddingHorizontal: '4@s',
  },
  subtitle: {
    fontSize: '28@ms',
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: '12@vs',
    textAlign: 'center',
  },
  description: {
    fontSize: '16@ms',
    color: '#6B7280',
    textAlign: 'center',
    marginTop: '8@vs',
  },
  footer: {
    backgroundColor: '#FFFFFF',
    paddingBottom: '20@vs',
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: '20@vs',
  },
  dot: {
    width: '8@s',
    height: '8@s',
    borderRadius: '4@s',
    backgroundColor: '#D1D5DB',
    marginHorizontal: '4@s',
  },
  activeDot: {
    width: '24@s',
    backgroundColor: '#9333EA',
  },
  buttonContainer: {
    paddingHorizontal: '24@s',
    paddingBottom: '16@vs',
  },
  button: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  buttonGradient: {
    paddingVertical: '16@vs',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: '18@ms',
    fontWeight: '600',
  },
});
