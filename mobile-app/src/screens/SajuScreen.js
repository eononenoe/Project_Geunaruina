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

const sajuData = [
  { label: '년주', hanja: '甲子', hangul: '갑자' },
  { label: '월주', hanja: '乙丑', hangul: '을축' },
  { label: '일주', hanja: '丙寅', hangul: '병인' },
  { label: '시주', hanja: '丁卯', hangul: '정묘' },
];

const analysisMenu = [
  { title: '재회 가능성 보기', price: '990원', icon: 'crystal-ball', isPremium: true },
  { title: '만남 시기 보기', price: '990원', icon: 'heart', isPremium: true },
  { title: '내 사주 자세히 알아보기', price: '무료', icon: 'book-open-variant', isPremium: false },
];

export default function SajuScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>내 사주</Text>
        </View>

        {/* New Saju Button */}
        <View style={styles.newSajuContainer}>
          <TouchableOpacity
            style={styles.newSajuButton}
            onPress={() => navigation.navigate('SajuInput')}
          >
            <LinearGradient
              colors={['#9333EA', '#EC4899']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.newSajuGradient}
            >
              <Icon name="plus-circle" size={24} color="#FFFFFF" />
              <Text style={styles.newSajuText}>새로운 사주 보기</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Saju Card */}
        <View style={styles.cardContainer}>
          <View style={styles.sajuCard}>
            <View style={styles.sajuHeader}>
              <View style={styles.iconCircle}>
                <LinearGradient
                  colors={['#9333EA', '#EC4899']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.iconGradient}
                >
                  <Icon name="star" size={20} color="#FFFFFF" />
                </LinearGradient>
              </View>
              <View>
                <Text style={styles.sajuName}>김지수님의 사주</Text>
                <Text style={styles.sajuBirthdate}>1995년 3월 15일 (음력)</Text>
              </View>
            </View>

            <View style={styles.pillarsContainer}>
              {sajuData.map((item, idx) => (
                <View key={idx} style={styles.pillarItem}>
                  <Text style={styles.pillarLabel}>{item.label}</Text>
                  <Text style={styles.pillarHanja}>{item.hanja}</Text>
                  <Text style={styles.pillarHangul}>{item.hangul}</Text>
                </View>
              ))}
            </View>

            <View style={styles.divider} />

            <View style={styles.detailsContainer}>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>반합</Text>
                <View style={styles.detailValue}>
                  <Text style={styles.detailText}>인오반합</Text>
                  <Icon name="check-circle" size={16} color="#10B981" />
                </View>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>원진살</Text>
                <View style={styles.detailValue}>
                  <Text style={styles.detailText}>자미원진</Text>
                  <Icon name="alert-circle" size={16} color="#F59E0B" />
                </View>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>천을귀인</Text>
                <View style={styles.detailValue}>
                  <Text style={styles.detailText}>술해</Text>
                  <Icon name="star-four-points" size={16} color="#9333EA" />
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Analysis Menu */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>상세 분석</Text>
          {analysisMenu.map((item, idx) => (
            <TouchableOpacity key={idx} style={styles.menuItem}>
              <View style={styles.menuLeft}>
                <Icon name={item.icon} size={32} color="#9333EA" />
                <View>
                  <Text style={styles.menuTitle}>{item.title}</Text>
                  <Text
                    style={[
                      styles.menuPrice,
                      item.isPremium ? styles.premiumPrice : styles.freePrice,
                    ]}
                  >
                    {item.price}
                  </Text>
                </View>
              </View>
              <Icon name="chevron-right" size={20} color="#9CA3AF" />
            </TouchableOpacity>
          ))}
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
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 16,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  newSajuContainer: {
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  newSajuButton: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  newSajuGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
  },
  newSajuText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  cardContainer: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 16,
  },
  sajuCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
  },
  sajuHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
  },
  iconGradient: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sajuName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  sajuBirthdate: {
    fontSize: 12,
    color: '#6B7280',
  },
  pillarsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  pillarItem: {
    flex: 1,
    backgroundColor: '#F3E8FF',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
  },
  pillarLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  pillarHanja: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#7C3AED',
    marginBottom: 4,
  },
  pillarHangul: {
    fontSize: 12,
    color: '#6B7280',
  },
  divider: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginVertical: 16,
  },
  detailsContainer: {
    gap: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  detailLabel: {
    fontSize: 14,
    color: '#6B7280',
    width: 80,
  },
  detailValue: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
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
  menuItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
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
});
