import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { API_URL } from '../config/api';

export default function SajuInputScreen() {
  const navigation = useNavigation();

  const [formData, setFormData] = useState({
    year: '',
    month: '',
    day: '',
    hour: '12',
    minute: '0',
    isLunar: false,
    gender: 'M',
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCalculate = async () => {
    // 입력 검증
    if (!formData.year || !formData.month || !formData.day) {
      Alert.alert('알림', '생년월일을 모두 입력해주세요.');
      return;
    }

    const year = parseInt(formData.year);
    const month = parseInt(formData.month);
    const day = parseInt(formData.day);
    const hour = parseInt(formData.hour) || 12;
    const minute = parseInt(formData.minute) || 0;

    if (year < 1900 || year > 2100) {
      Alert.alert('알림', '년도는 1900-2100 사이로 입력해주세요.');
      return;
    }

    if (month < 1 || month > 12) {
      Alert.alert('알림', '월은 1-12 사이로 입력해주세요.');
      return;
    }

    if (day < 1 || day > 31) {
      Alert.alert('알림', '일은 1-31 사이로 입력해주세요.');
      return;
    }

    if (hour < 0 || hour > 23) {
      Alert.alert('알림', '시는 0-23 사이로 입력해주세요.');
      return;
    }

    if (minute < 0 || minute > 59) {
      Alert.alert('알림', '분은 0-59 사이로 입력해주세요.');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`${API_URL}/api/saju/calculate`, {
        year,
        month,
        day,
        hour,
        minute,
        is_lunar: formData.isLunar,
        gender: formData.gender,
      });

      if (response.data.success) {
        // 결과 화면으로 이동
        navigation.navigate('SajuResult', { sajuData: response.data.data });
      } else {
        Alert.alert('오류', response.data.error || '사주 계산에 실패했습니다.');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('오류', error.response?.data?.error || '서버 연결에 실패했습니다.');
    } finally {
      setLoading(false);
    }
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
          <Text style={styles.headerTitle}>사주 보기</Text>
          <View style={{ width: 28 }} />
        </View>

        {/* Info Card */}
        <View style={styles.infoCard}>
          <LinearGradient
            colors={['#9333EA', '#EC4899']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.infoGradient}
          >
            <Icon name="information-outline" size={24} color="#FFFFFF" />
            <Text style={styles.infoText}>
              정확한 사주 풀이를 위해 태어난 시간을 입력해주세요
            </Text>
          </LinearGradient>
        </View>

        {/* Form */}
        <View style={styles.formContainer}>
          {/* 생년월일 */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>생년월일</Text>
            <View style={styles.dateRow}>
              <View style={[styles.inputWrapper, { flex: 2 }]}>
                <TextInput
                  style={styles.input}
                  placeholder="년 (예: 1995)"
                  keyboardType="numeric"
                  maxLength={4}
                  value={formData.year}
                  onChangeText={(text) => handleInputChange('year', text)}
                />
              </View>
              <View style={[styles.inputWrapper, { flex: 1 }]}>
                <TextInput
                  style={styles.input}
                  placeholder="월"
                  keyboardType="numeric"
                  maxLength={2}
                  value={formData.month}
                  onChangeText={(text) => handleInputChange('month', text)}
                />
              </View>
              <View style={[styles.inputWrapper, { flex: 1 }]}>
                <TextInput
                  style={styles.input}
                  placeholder="일"
                  keyboardType="numeric"
                  maxLength={2}
                  value={formData.day}
                  onChangeText={(text) => handleInputChange('day', text)}
                />
              </View>
            </View>
          </View>

          {/* 음력/양력 */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>음력/양력</Text>
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={[
                  styles.optionButton,
                  !formData.isLunar && styles.optionButtonActive,
                ]}
                onPress={() => handleInputChange('isLunar', false)}
              >
                <Text
                  style={[
                    styles.optionButtonText,
                    !formData.isLunar && styles.optionButtonTextActive,
                  ]}
                >
                  양력
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.optionButton,
                  formData.isLunar && styles.optionButtonActive,
                ]}
                onPress={() => handleInputChange('isLunar', true)}
              >
                <Text
                  style={[
                    styles.optionButtonText,
                    formData.isLunar && styles.optionButtonTextActive,
                  ]}
                >
                  음력
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* 태어난 시간 */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>태어난 시간 (선택)</Text>
            <View style={styles.timeRow}>
              <View style={[styles.inputWrapper, { flex: 1 }]}>
                <TextInput
                  style={styles.input}
                  placeholder="시 (0-23)"
                  keyboardType="numeric"
                  maxLength={2}
                  value={formData.hour}
                  onChangeText={(text) => handleInputChange('hour', text)}
                />
              </View>
              <Text style={styles.timeSeparator}>:</Text>
              <View style={[styles.inputWrapper, { flex: 1 }]}>
                <TextInput
                  style={styles.input}
                  placeholder="분 (0-59)"
                  keyboardType="numeric"
                  maxLength={2}
                  value={formData.minute}
                  onChangeText={(text) => handleInputChange('minute', text)}
                />
              </View>
            </View>
          </View>

          {/* 성별 */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>성별</Text>
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={[
                  styles.optionButton,
                  formData.gender === 'M' && styles.optionButtonActive,
                ]}
                onPress={() => handleInputChange('gender', 'M')}
              >
                <Icon
                  name="gender-male"
                  size={20}
                  color={formData.gender === 'M' ? '#FFFFFF' : '#6B7280'}
                />
                <Text
                  style={[
                    styles.optionButtonText,
                    formData.gender === 'M' && styles.optionButtonTextActive,
                  ]}
                >
                  남성
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.optionButton,
                  formData.gender === 'F' && styles.optionButtonActive,
                ]}
                onPress={() => handleInputChange('gender', 'F')}
              >
                <Icon
                  name="gender-female"
                  size={20}
                  color={formData.gender === 'F' ? '#FFFFFF' : '#6B7280'}
                />
                <Text
                  style={[
                    styles.optionButtonText,
                    formData.gender === 'F' && styles.optionButtonTextActive,
                  ]}
                >
                  여성
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Calculate Button */}
          <TouchableOpacity
            style={styles.calculateButton}
            onPress={handleCalculate}
            disabled={loading}
          >
            <LinearGradient
              colors={['#9333EA', '#EC4899']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.calculateGradient}
            >
              {loading ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <>
                  <Icon name="star-four-points" size={20} color="#FFFFFF" />
                  <Text style={styles.calculateButtonText}>사주 보기</Text>
                </>
              )}
            </LinearGradient>
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
  infoCard: {
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  infoGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 16,
    borderRadius: 16,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: '#FFFFFF',
    lineHeight: 20,
  },
  formContainer: {
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 12,
  },
  dateRow: {
    flexDirection: 'row',
    gap: 12,
  },
  inputWrapper: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  input: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#1F2937',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
  },
  optionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  optionButtonActive: {
    backgroundColor: '#9333EA',
    borderColor: '#9333EA',
  },
  optionButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
  },
  optionButtonTextActive: {
    color: '#FFFFFF',
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  timeSeparator: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6B7280',
  },
  calculateButton: {
    marginTop: 8,
    borderRadius: 16,
    overflow: 'hidden',
  },
  calculateGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 18,
  },
  calculateButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});
