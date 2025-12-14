import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function LoginScreen({ navigation }) {
  const handlePhoneLogin = () => {
    // 임시로 바로 메인으로 이동
    navigation.navigate('MainTabs');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="chevron-left" size={28} color="#1F2937" />
        </TouchableOpacity>

        <View style={styles.header}>
          <Text style={styles.title}>가장 편한 방법으로</Text>
          <Text style={styles.title}>시작해 보세요!</Text>
          <LinearGradient
            colors={['#9333EA', '#EC4899']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.subtitleGradient}
          >
            <Text style={styles.subtitle}>1분이면 운세 확인 가능해요</Text>
          </LinearGradient>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.phoneButton} onPress={handlePhoneLogin}>
            <LinearGradient
              colors={['#9333EA', '#EC4899']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.phoneButtonGradient}
            >
              <Text style={styles.phoneButtonText}>휴대폰 번호로 계속하기</Text>
            </LinearGradient>
          </TouchableOpacity>

          <Text style={styles.divider}>또는</Text>

          <TouchableOpacity style={[styles.socialButton, styles.kakaoButton]}>
            <Icon name="chat" size={24} color="#1F2937" />
            <Text style={styles.socialButtonText}>카카오로 계속하기</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.socialButton, styles.naverButton]}>
            <Text style={styles.naverIcon}>N</Text>
            <Text style={[styles.socialButtonText, styles.whiteText]}>
              네이버로 계속하기
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.socialButton, styles.googleButton]}>
            <Text style={styles.googleIcon}>G</Text>
            <Text style={styles.socialButtonText}>Google로 계속하기</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  backButton: {
    marginBottom: 32,
  },
  header: {
    marginBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  subtitleGradient: {
    alignSelf: 'flex-start',
    borderRadius: 4,
    paddingHorizontal: 4,
    marginTop: 16,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  buttonContainer: {
    gap: 12,
  },
  phoneButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  phoneButtonGradient: {
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  phoneButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  divider: {
    textAlign: 'center',
    fontSize: 14,
    color: '#9CA3AF',
    paddingVertical: 8,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 12,
  },
  kakaoButton: {
    backgroundColor: '#FEE500',
  },
  naverButton: {
    backgroundColor: '#03C75A',
  },
  googleButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },
  socialButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
  },
  whiteText: {
    color: '#FFFFFF',
  },
  naverIcon: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  googleIcon: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
  },
});
