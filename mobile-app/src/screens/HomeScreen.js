import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const quickMenu = [
  { icon: 'crystal-ball', title: '재회 사주', price: '990원', isPremium: true },
  { icon: 'heart', title: '만남 시기', price: '990원', isPremium: true },
  { icon: 'heart-multiple', title: '궁합 보기', price: '1,900원', isPremium: true },
  { icon: 'calendar-month', title: '월간 운세', price: '무료', isPremium: false },
];

export default function HomeScreen() {
  const navigation = useNavigation();

  const handleQuickMenu = (menu) => {
    if (menu.isPremium) {
      // TODO: 결제 모달 표시
      alert('결제 기능 구현 예정');
    } else {
      navigation.navigate('MonthlyFortune');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>안녕하세요</Text>
            <View style={styles.nameContainer}>
              <Text style={styles.name}>김지수님</Text>
              <Icon name="star-four-points" size={20} color="#FBBF24" />
            </View>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Icon name="bell-outline" size={24} color="#9333EA" />
            <View style={styles.badge} />
          </TouchableOpacity>
        </View>

        <View style={styles.dateContainer}>
          <Icon name="calendar" size={16} color="#9333EA" />
          <Text style={styles.dateText}>2024년 12월 14일 토요일</Text>
        </View>

        {/* Today's Fortune Card */}
        <View style={styles.cardContainer}>
          <LinearGradient
            colors={['#9333EA', '#EC4899']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.fortuneCard}
          >
            <View style={styles.iconBackground}>
              <Icon name="star-four-points" size={100} color="rgba(255, 255, 255, 0.2)" />
            </View>
            <View style={styles.fortuneContent}>
              <View style={styles.fortuneHeader}>
                <Icon name="shimmer" size={20} color="#FFFFFF" />
                <Text style={styles.fortuneTitle}>오늘의 운세</Text>
              </View>
              <View style={styles.starsContainer}>
                {[1, 2, 3, 4].map((i) => (
                  <Icon key={i} name="star" size={24} color="#FFFFFF" />
                ))}
                <Icon name="star" size={24} color="rgba(255, 255, 255, 0.4)" />
              </View>
              <Text style={styles.fortuneText}>
                오늘은 새로운 시작을 준비하기 좋은 날이에요
              </Text>
              <View style={styles.loveFortuneBox}>
                <View style={styles.loveFortuneContent}>
                  <Text style={styles.loveFortuneLabel}>오늘의 연애운</Text>
                  <View style={styles.loveFortuneValue}>
                    <Text style={styles.loveFortuneText}>상상</Text>
                    <Icon name="heart" size={16} color="#FFFFFF" />
                  </View>
                </View>
              </View>
              <TouchableOpacity style={styles.detailButton}>
                <Text style={styles.detailButtonText}>자세히 보기</Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>

        {/* Quick Menu */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>빠른 메뉴</Text>
          <View style={styles.menuGrid}>
            {quickMenu.map((menu, idx) => (
              <TouchableOpacity
                key={idx}
                style={styles.menuItem}
                onPress={() => handleQuickMenu(menu)}
              >
                {menu.isPremium && (
                  <View style={styles.lockBadge}>
                    <Icon name="lock" size={14} color="#D97706" />
                  </View>
                )}
                <Icon name={menu.icon} size={40} color="#9333EA" />
                <Text style={styles.menuTitle}>{menu.title}</Text>
                <Text
                  style={[
                    styles.menuPrice,
                    menu.isPremium ? styles.premiumPrice : styles.freePrice,
                  ]}
                >
                  {menu.price}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Promo Banner */}
        <View style={styles.section}>
          <TouchableOpacity>
            <LinearGradient
              colors={['#FBBF24', '#F59E0B']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.promoBanner}
            >
              <View>
                <Text style={styles.promoSubtitle}>[OK] 첫 구매 특별 혜택</Text>
                <Text style={styles.promoTitle}>50% 할인</Text>
              </View>
              <Icon name="chevron-right" size={24} color="#FFFFFF" />
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <View style={{ height: 80 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 8,
    backgroundColor: '#FFFFFF',
  },
  greeting: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3E8FF',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EC4899',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 24,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
  },
  dateText: {
    fontSize: 14,
    color: '#6B7280',
  },
  cardContainer: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 16,
  },
  fortuneCard: {
    borderRadius: 24,
    padding: 24,
    position: 'relative',
    overflow: 'hidden',
  },
  iconBackground: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  fortuneContent: {
    position: 'relative',
    zIndex: 10,
  },
  fortuneHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  fortuneTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  starsContainer: {
    flexDirection: 'row',
    gap: 4,
    marginBottom: 16,
  },
  fortuneText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  loveFortuneBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 16,
    padding: 12,
    marginBottom: 16,
  },
  loveFortuneContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  loveFortuneLabel: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  loveFortuneValue: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  loveFortuneText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  detailButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  detailButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#9333EA',
  },
  section: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  menuGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  menuItem: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    position: 'relative',
  },
  lockBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginTop: 12,
    marginBottom: 4,
  },
  menuPrice: {
    fontSize: 14,
    fontWeight: '600',
  },
  premiumPrice: {
    color: '#D97706',
  },
  freePrice: {
    color: '#059669',
  },
  promoBanner: {
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  promoSubtitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  promoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});
