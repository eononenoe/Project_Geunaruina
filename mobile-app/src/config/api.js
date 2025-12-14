import { Platform } from 'react-native';

// 개발 환경 API URL 설정
const getApiUrl = () => {
  // Web 환경 (브라우저)
  if (Platform.OS === 'web') {
    return 'http://localhost:3000';
  }

  // 모바일 환경 (Expo Go 앱)
  // PC의 실제 IP 주소 사용 (같은 Wi-Fi 네트워크 내)
  return 'http://192.168.219.105:3000';
};

export const API_URL = getApiUrl();
