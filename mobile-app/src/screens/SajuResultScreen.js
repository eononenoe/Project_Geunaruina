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
import { useNavigation, useRoute } from '@react-navigation/native';

export default function SajuResultScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { sajuData } = route.params;

  const { birth_info, pillars, additional } = sajuData;

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
          <Text style={styles.headerTitle}>사주 결과</Text>
          <View style={{ width: 28 }} />
        </View>

        {/* Birth Info Card */}
        <View style={styles.cardContainer}>
          <LinearGradient
            colors={['#9333EA', '#EC4899']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.birthCard}
          >
            <View style={styles.birthInfo}>
              <View style={styles.birthRow}>
                <Icon name="calendar" size={20} color="#FFFFFF" />
                <Text style={styles.birthText}>
                  {birth_info.solar_date} {birth_info.time}
                </Text>
              </View>
              {birth_info.is_lunar && (
                <Text style={styles.lunarText}>음력: {birth_info.lunar_date}</Text>
              )}
              <Text style={styles.genderText}>
                {birth_info.gender === 'M' ? '남성' : '여성'}
              </Text>
            </View>
          </LinearGradient>
        </View>

        {/* Saju Pillars */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>사주팔자</Text>
          <View style={styles.pillarsCard}>
            <View style={styles.pillarsGrid}>
              <View style={styles.pillarItem}>
                <Text style={styles.pillarLabel}>년주</Text>
                <Text style={styles.pillarHanja}>{pillars.year.combined}</Text>
                <Text style={styles.pillarHangul}>{pillars.year.combined_hangul}</Text>
              </View>
              <View style={styles.pillarItem}>
                <Text style={styles.pillarLabel}>월주</Text>
                <Text style={styles.pillarHanja}>{pillars.month.combined}</Text>
                <Text style={styles.pillarHangul}>{pillars.month.combined_hangul}</Text>
              </View>
              <View style={styles.pillarItem}>
                <Text style={styles.pillarLabel}>일주</Text>
                <Text style={styles.pillarHanja}>{pillars.day.combined}</Text>
                <Text style={styles.pillarHangul}>{pillars.day.combined_hangul}</Text>
              </View>
              <View style={styles.pillarItem}>
                <Text style={styles.pillarLabel}>시주</Text>
                <Text style={styles.pillarHanja}>{pillars.time.combined}</Text>
                <Text style={styles.pillarHangul}>{pillars.time.combined_hangul}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Additional Info */}
        {additional && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>추가 정보</Text>
            <View style={styles.additionalCard}>
              <View style={styles.additionalRow}>
                <Icon name="weather-sunny" size={20} color="#9333EA" />
                <View style={styles.additionalInfo}>
                  <Text style={styles.additionalLabel}>절기</Text>
                  <Text style={styles.additionalValue}>{additional.jeolgi}</Text>
                </View>
              </View>
              <View style={styles.divider} />
              <View style={styles.additionalRow}>
                <Icon name="calendar-check" size={20} color="#9333EA" />
                <View style={styles.additionalInfo}>
                  <Text style={styles.additionalLabel}>절기 입절일</Text>
                  <Text style={styles.additionalValue}>{additional.jeolgi_date}</Text>
                </View>
              </View>
            </View>
          </View>
        )}

        {/* Info Box */}
        <View style={styles.section}>
          <View style={styles.infoBox}>
            <Icon name="information-outline" size={24} color="#9333EA" />
            <Text style={styles.infoText}>
              위 사주를 바탕으로 더 자세한 운세를 확인하시려면 프리미엄 서비스를 이용해주세요.
            </Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.saveButton}>
            <Icon name="bookmark-outline" size={20} color="#9333EA" />
            <Text style={styles.saveButtonText}>사주 저장하기</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.shareButton}>
            <Icon name="share-variant" size={20} color="#6B7280" />
            <Text style={styles.shareButtonText}>결과 공유하기</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 40 }} />
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
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  cardContainer: {
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  birthCard: {
    borderRadius: 20,
    padding: 20,
  },
  birthInfo: {
    gap: 8,
  },
  birthRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  birthText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  lunarText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  genderText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  section: {
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 12,
  },
  pillarsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
  },
  pillarsGrid: {
    flexDirection: 'row',
    gap: 12,
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
    fontSize: 24,
    fontWeight: 'bold',
    color: '#7C3AED',
    marginBottom: 4,
  },
  pillarHangul: {
    fontSize: 12,
    color: '#6B7280',
  },
  additionalCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
  },
  additionalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  additionalInfo: {
    flex: 1,
  },
  additionalLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 2,
  },
  additionalValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  divider: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginVertical: 12,
  },
  infoBox: {
    flexDirection: 'row',
    gap: 12,
    backgroundColor: '#EDE9FE',
    borderRadius: 16,
    padding: 16,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: '#5B21B6',
    lineHeight: 20,
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#F3E8FF',
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#9333EA',
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  shareButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
  },
});
