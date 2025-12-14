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

const monthlyFortune = [
  {
    category: '연애운',
    score: 4,
    message: '새로운 만남 가능성',
    icon: 'heart',
    color: '#EC4899',
  },
  {
    category: '재물운',
    score: 3,
    message: '안정적인 수입',
    icon: 'cash',
    color: '#F59E0B',
  },
  {
    category: '직업운',
    score: 5,
    message: '승진 기회',
    icon: 'briefcase',
    color: '#3B82F6',
  },
  {
    category: '건강운',
    score: 3,
    message: '컨디션 관리 필요',
    icon: 'hospital-box',
    color: '#10B981',
  },
];

export default function MonthlyFortuneScreen() {
  const navigation = useNavigation();

  const renderStars = (score, color) => {
    return [...Array(5)].map((_, i) => (
      <Icon
        key={i}
        name="star"
        size={18}
        color={i < score ? color : '#D1D5DB'}
      />
    ));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Icon name="chevron-left" size={28} color="#1F2937" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>월간 운세</Text>
          <View style={{ width: 28 }} />
        </View>

        {/* Month Card */}
        <View style={styles.cardContainer}>
          <LinearGradient
            colors={['#9333EA', '#EC4899']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.monthCard}
          >
            <View style={styles.monthHeader}>
              <View>
                <Text style={styles.monthYear}>2024년</Text>
                <Text style={styles.monthTitle}>12월 운세</Text>
              </View>
              <View style={styles.starsRow}>
                {[1, 2, 3, 4].map((i) => (
                  <Icon key={i} name="star" size={24} color="#FFFFFF" />
                ))}
              </View>
            </View>
            <Text style={styles.monthDescription}>
              새로운 시작과 변화의 달입니다
            </Text>
          </LinearGradient>
        </View>

        {/* Fortune Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>분야별 운세</Text>
          {monthlyFortune.map((item, idx) => (
            <View key={idx} style={styles.fortuneItem}>
              <View style={styles.fortuneHeader}>
                <Icon name={item.icon} size={32} color={item.color} />
                <View style={styles.fortuneInfo}>
                  <Text style={styles.fortuneCategory}>{item.category}</Text>
                  <View style={styles.fortuneStars}>
                    {renderStars(item.score, item.color)}
                  </View>
                </View>
              </View>
              <View style={styles.fortuneMessage}>
                <Text style={styles.fortuneMessageText}>{item.message}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Lucky Days */}
        <View style={styles.section}>
          <View style={styles.luckyDaysCard}>
            <Text style={styles.luckyDaysTitle}>이번 달 특별한 날</Text>
            <View style={styles.luckyDaysList}>
              <View style={styles.luckyDayItem}>
                <Icon name="circle" size={16} color="#10B981" />
                <Text style={styles.luckyDayText}>
                  좋은 날: 12월 5일, 12일, 18일
                </Text>
              </View>
              <View style={styles.luckyDayItem}>
                <Icon name="circle" size={16} color="#EF4444" />
                <Text style={styles.luckyDayText}>
                  조심할 날: 12월 9일, 23일
                </Text>
              </View>
            </View>
          </View>
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  cardContainer: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 16,
  },
  monthCard: {
    borderRadius: 24,
    padding: 24,
  },
  monthHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  monthYear: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 4,
  },
  monthTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  starsRow: {
    flexDirection: 'row',
    gap: 4,
  },
  monthDescription: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.95)',
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
  fortuneItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
  },
  fortuneHeader: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  fortuneInfo: {
    flex: 1,
  },
  fortuneCategory: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  fortuneStars: {
    flexDirection: 'row',
    gap: 4,
  },
  fortuneMessage: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 12,
  },
  fortuneMessageText: {
    fontSize: 14,
    color: '#374151',
  },
  luckyDaysCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
  },
  luckyDaysTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 12,
  },
  luckyDaysList: {
    gap: 8,
  },
  luckyDayItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  luckyDayText: {
    fontSize: 14,
    color: '#374151',
  },
});
