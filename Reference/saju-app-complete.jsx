import React, { useState } from 'react';
import { TrendingUp, Calendar, Star, ChevronRight, Home, Search, Heart, User, Bell, Clock, Sparkles, Lock } from 'lucide-react';

export default function SajuApp() {
  const [currentPage, setCurrentPage] = useState('onboarding');
  const [slideIndex, setSlideIndex] = useState(0);
  const [showPayment, setShowPayment] = useState(false);

  const onboardingSlides = [
    {
      emoji: '💫',
      title: '재회,',
      subtitle: '언제 다시 만날 수 있을까요?',
      description: '정확한 사주로 알아보세요'
    },
    {
      emoji: '🔮',
      title: '정확한',
      subtitle: '만세력 기반 사주 분석',
      description: '나의 운명을 확인하세요'
    },
    {
      emoji: '✨',
      title: '매일 업데이트되는',
      subtitle: '오늘의 운세',
      description: '당신의 하루를 응원합니다'
    }
  ];

  const quickMenu = [
    { icon: '🔮', title: '재회 사주', price: '990원', isPremium: true },
    { icon: '💕', title: '만남 시기', price: '990원', isPremium: true },
    { icon: '💑', title: '궁합 보기', price: '1,900원', isPremium: true },
    { icon: '📅', title: '월간 운세', price: '무료', isPremium: false }
  ];

  const historyItems = [
    { type: '재회 사주', date: '2024.12.10', summary: '재회 가능성 75% - 3월 중순이 최적기', icon: '🔮' },
    { type: '궁합 보기', date: '2024.12.05', summary: '궁합 점수 85점 - 연애 궁합 우수', icon: '💑' },
    { type: '만남 시기', date: '2024.11.28', summary: '2025년 4월이 가장 좋은 시기', icon: '💕' },
  ];

  const monthlyFortune = [
    { category: '연애운', score: 4, message: '새로운 만남 가능성', icon: '💕', color: 'text-pink-500' },
    { category: '재물운', score: 3, message: '안정적인 수입', icon: '💰', color: 'text-yellow-500' },
    { category: '직업운', score: 5, message: '승진 기회', icon: '💼', color: 'text-blue-500' },
    { category: '건강운', score: 3, message: '컨디션 관리 필요', icon: '🏥', color: 'text-green-500' },
  ];

  // Onboarding Page
  if (currentPage === 'onboarding') {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <div className="px-6 pt-4 pb-2 flex justify-between items-center">
          <span className="text-sm font-medium">3:18</span>
          <div className="flex gap-1 items-center">
            <div className="w-4 h-3 border border-black rounded-sm"></div>
            <span className="text-xs">📶</span>
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center px-8 pb-32">
          <div className="text-8xl mb-8 animate-bounce-slow">{onboardingSlides[slideIndex].emoji}</div>
          
          <div className="text-center mb-4">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {onboardingSlides[slideIndex].title}
            </h1>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
              {onboardingSlides[slideIndex].subtitle}
            </h2>
            <p className="text-lg text-gray-600">
              {onboardingSlides[slideIndex].description}
            </p>
          </div>
        </div>

        <div className="flex justify-center gap-2 mb-6">
          {[0, 1, 2].map((idx) => (
            <button
              key={idx}
              onClick={() => setSlideIndex(idx)}
              className={`w-2 h-2 rounded-full transition-all ${
                slideIndex === idx ? 'bg-purple-600 w-6' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>

        <div className="px-6 pb-8">
          <button
            onClick={() => slideIndex === 2 ? setCurrentPage('login') : setSlideIndex(slideIndex + 1)}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white text-lg font-semibold py-4 rounded-2xl hover:shadow-lg transition-all"
          >
            {slideIndex === 2 ? '시작하기' : '다음'}
          </button>
        </div>

        <div className="flex justify-center pb-2">
          <div className="w-32 h-1 bg-black rounded-full"></div>
        </div>
      </div>
    );
  }

  // Login Page
  if (currentPage === 'login') {
    return (
      <div className="min-h-screen bg-white">
        <div className="px-6 pt-16 pb-8">
          <button onClick={() => setCurrentPage('onboarding')} className="mb-8">
            <ChevronRight size={24} className="rotate-180 text-gray-800" />
          </button>
          
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            가장 편한 방법으로
          </h1>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            시작해 보세요!
          </h1>
          <p className="text-sm bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent font-semibold">
            1분이면 운세 확인 가능해요
          </p>
        </div>

        <div className="px-6 space-y-3">
          <button
            onClick={() => setCurrentPage('home')}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-4 rounded-xl flex items-center justify-center gap-2 hover:shadow-lg transition-all"
          >
            휴대폰 번호로 계속하기
          </button>

          <div className="text-center text-sm text-gray-400 py-2">또는</div>

          <button className="w-full bg-yellow-400 text-gray-800 font-medium py-4 rounded-xl flex items-center justify-center gap-3 hover:bg-yellow-500 transition-colors">
            <span className="text-xl">💬</span>
            카카오로 계속하기
          </button>

          <button className="w-full bg-green-500 text-white font-medium py-4 rounded-xl flex items-center justify-center gap-3 hover:bg-green-600 transition-colors">
            <span className="text-xl font-bold">N</span>
            네이버로 계속하기
          </button>

          <button className="w-full bg-white border border-gray-300 text-gray-800 font-medium py-4 rounded-xl flex items-center justify-center gap-3 hover:bg-gray-50 transition-colors">
            <span className="text-xl">G</span>
            Google로 계속하기
          </button>
        </div>

        <div className="flex justify-center pb-2 pt-8">
          <div className="w-32 h-1 bg-black rounded-full"></div>
        </div>
      </div>
    );
  }

  // Home Page
  if (currentPage === 'home') {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white px-6 pt-12 pb-4 rounded-b-3xl shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="text-sm text-gray-600 mb-1">안녕하세요</p>
              <h1 className="text-2xl font-bold text-gray-800">김지수님 ✨</h1>
            </div>
            <button className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center hover:bg-purple-200 transition-colors relative">
              <Bell size={20} className="text-purple-600" />
              <div className="absolute top-1 right-1 w-2 h-2 bg-pink-500 rounded-full"></div>
            </button>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar size={16} className="text-purple-600" />
            <span>2024년 12월 14일 토요일</span>
          </div>
        </div>

        {/* Today's Fortune Card */}
        <div className="px-6 pt-6 pb-4">
          <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl p-6 text-white relative overflow-hidden shadow-lg">
            <div className="absolute top-0 right-0 opacity-20">
              <div className="text-9xl">🌟</div>
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles size={20} />
                <span className="font-semibold">오늘의 운세</span>
              </div>
              <div className="flex items-center gap-1 mb-4">
                {[1, 2, 3, 4].map((i) => (
                  <span key={i} className="text-2xl">⭐</span>
                ))}
                <span className="text-2xl opacity-40">⭐</span>
              </div>
              <p className="text-lg mb-4 font-medium">
                오늘은 새로운 시작을 준비하기 좋은 날이에요
              </p>
              <div className="bg-white/20 rounded-2xl p-3 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <span className="text-sm opacity-90">오늘의 연애운</span>
                  <span className="font-bold">상상 💕</span>
                </div>
              </div>
              <button 
                onClick={() => setCurrentPage('todayDetail')}
                className="mt-4 w-full bg-white text-purple-600 py-2.5 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
              >
                자세히 보기
              </button>
            </div>
          </div>
        </div>

        {/* Quick Menu */}
        <div className="px-6 pb-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">빠른 메뉴</h2>
          <div className="grid grid-cols-2 gap-3">
            {quickMenu.map((menu, idx) => (
              <button
                key={idx}
                onClick={() => menu.isPremium ? setShowPayment(true) : setCurrentPage('monthly')}
                className="bg-white rounded-2xl p-5 hover:shadow-lg transition-all relative"
              >
                {menu.isPremium && (
                  <div className="absolute top-3 right-3">
                    <Lock size={14} className="text-yellow-600" />
                  </div>
                )}
                <div className="text-4xl mb-3">{menu.icon}</div>
                <div className="text-base font-bold text-gray-800 mb-1">{menu.title}</div>
                <div className={`text-sm font-semibold ${menu.isPremium ? 'text-yellow-600' : 'text-green-600'}`}>
                  {menu.price}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Promo Banner */}
        <div className="px-6 pb-24">
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl p-5 text-white">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold mb-1">🎉 첫 구매 특별 혜택</div>
                <div className="text-xl font-bold">50% 할인</div>
              </div>
              <ChevronRight size={24} />
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-2">
          <div className="flex justify-around items-center">
            {[
              { icon: Home, label: '홈', active: true, page: 'home' },
              { icon: Star, label: '사주풀이', active: false, page: 'saju' },
              { icon: Clock, label: '히스토리', active: false, page: 'history' },
              { icon: User, label: '마이', active: false, page: 'my' }
            ].map((item, idx) => (
              <button 
                key={idx} 
                className="flex flex-col items-center gap-1 py-2"
                onClick={() => setCurrentPage(item.page)}
              >
                <item.icon size={24} className={item.active ? 'text-purple-600' : 'text-gray-400'} />
                <span className={`text-xs ${item.active ? 'text-purple-600 font-semibold' : 'text-gray-400'}`}>
                  {item.label}
                </span>
              </button>
            ))}
          </div>
          <div className="flex justify-center pt-1">
            <div className="w-32 h-1 bg-black rounded-full"></div>
          </div>
        </div>
      </div>
    );
  }

  // Saju Detail Page
  if (currentPage === 'saju') {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white px-6 pt-12 pb-4 rounded-b-3xl shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <button onClick={() => setCurrentPage('home')}>
              <ChevronRight size={24} className="rotate-180 text-gray-800" />
            </button>
            <h1 className="text-2xl font-bold text-gray-800">내 사주</h1>
          </div>
        </div>

        {/* Saju Card */}
        <div className="px-6 pt-6 pb-4">
          <div className="bg-white rounded-3xl p-6 shadow-lg">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <Star size={20} className="text-white" />
              </div>
              <div>
                <div className="font-bold text-gray-800">김지수님의 사주</div>
                <div className="text-xs text-gray-500">1995년 3월 15일 (음력)</div>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-3 mb-4">
              {[
                { label: '년주', hanja: '甲子', hangul: '갑자' },
                { label: '월주', hanja: '乙丑', hangul: '을축' },
                { label: '일주', hanja: '丙寅', hangul: '병인' },
                { label: '시주', hanja: '丁卯', hangul: '정묘' }
              ].map((item, idx) => (
                <div key={idx} className="bg-purple-50 rounded-xl p-3 text-center">
                  <div className="text-xs text-gray-600 mb-1">{item.label}</div>
                  <div className="text-lg font-bold text-purple-700 mb-1">{item.hanja}</div>
                  <div className="text-xs text-gray-600">{item.hangul}</div>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-100 pt-4 space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600">반합</span>
                <div className="flex-1 flex items-center gap-2">
                  <span className="text-sm font-semibold text-gray-800">인오반합</span>
                  <span className="text-green-500">✅</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600">원진살</span>
                <div className="flex-1 flex items-center gap-2">
                  <span className="text-sm font-semibold text-gray-800">자미원진</span>
                  <span className="text-yellow-500">⚠️</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600">천을귀인</span>
                <div className="flex-1 flex items-center gap-2">
                  <span className="text-sm font-semibold text-gray-800">술해</span>
                  <span className="text-purple-500">✨</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Analysis Menu */}
        <div className="px-6 pb-24">
          <h2 className="text-lg font-bold text-gray-800 mb-4">상세 분석</h2>
          <div className="space-y-3">
            {[
              { title: '재회 가능성 보기', price: '990원', icon: '🔮', premium: true },
              { title: '만남 시기 보기', price: '990원', icon: '💕', premium: true },
              { title: '내 사주 자세히 알아보기', price: '무료', icon: '📖', premium: false }
            ].map((item, idx) => (
              <button
                key={idx}
                onClick={() => item.premium ? setShowPayment(true) : null}
                className="w-full bg-white rounded-2xl p-5 hover:shadow-lg transition-all flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{item.icon}</div>
                  <div className="text-left">
                    <div className="font-bold text-gray-800">{item.title}</div>
                    <div className={`text-sm font-semibold ${item.premium ? 'text-yellow-600' : 'text-green-600'}`}>
                      {item.price}
                    </div>
                  </div>
                </div>
                <ChevronRight size={20} className="text-gray-400" />
              </button>
            ))}
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-2">
          <div className="flex justify-around items-center">
            {[
              { icon: Home, label: '홈', active: false, page: 'home' },
              { icon: Star, label: '사주풀이', active: true, page: 'saju' },
              { icon: Clock, label: '히스토리', active: false, page: 'history' },
              { icon: User, label: '마이', active: false, page: 'my' }
            ].map((item, idx) => (
              <button 
                key={idx} 
                className="flex flex-col items-center gap-1 py-2"
                onClick={() => setCurrentPage(item.page)}
              >
                <item.icon size={24} className={item.active ? 'text-purple-600' : 'text-gray-400'} />
                <span className={`text-xs ${item.active ? 'text-purple-600 font-semibold' : 'text-gray-400'}`}>
                  {item.label}
                </span>
              </button>
            ))}
          </div>
          <div className="flex justify-center pt-1">
            <div className="w-32 h-1 bg-black rounded-full"></div>
          </div>
        </div>
      </div>
    );
  }

  // History Page
  if (currentPage === 'history') {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white px-6 pt-12 pb-4 rounded-b-3xl shadow-sm">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">히스토리</h1>
          
          <div className="flex gap-2">
            {['전체', '재회', '만남', '궁합'].map((filter, idx) => (
              <button
                key={idx}
                className={`px-4 py-2 rounded-xl text-sm font-semibold ${
                  idx === 0
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="px-6 pt-6 pb-24 space-y-3">
          {historyItems.map((item, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-start gap-3 mb-3">
                <div className="text-3xl">{item.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-gray-800">{item.type}</span>
                    <span className="text-xs px-2 py-0.5 bg-purple-100 text-purple-600 rounded-full">
                      완료
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 mb-2">{item.date}</div>
                  <div className="text-sm text-gray-700">{item.summary}</div>
                </div>
              </div>
              <button className="w-full py-2.5 bg-purple-50 text-purple-600 rounded-xl font-semibold text-sm hover:bg-purple-100 transition-colors">
                다시 보기
              </button>
            </div>
          ))}
        </div>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-2">
          <div className="flex justify-around items-center">
            {[
              { icon: Home, label: '홈', active: false, page: 'home' },
              { icon: Star, label: '사주풀이', active: false, page: 'saju' },
              { icon: Clock, label: '히스토리', active: true, page: 'history' },
              { icon: User, label: '마이', active: false, page: 'my' }
            ].map((item, idx) => (
              <button 
                key={idx} 
                className="flex flex-col items-center gap-1 py-2"
                onClick={() => setCurrentPage(item.page)}
              >
                <item.icon size={24} className={item.active ? 'text-purple-600' : 'text-gray-400'} />
                <span className={`text-xs ${item.active ? 'text-purple-600 font-semibold' : 'text-gray-400'}`}>
                  {item.label}
                </span>
              </button>
            ))}
          </div>
          <div className="flex justify-center pt-1">
            <div className="w-32 h-1 bg-black rounded-full"></div>
          </div>
        </div>
      </div>
    );
  }

  // My Page
  if (currentPage === 'my') {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white px-6 pt-12 pb-4 rounded-b-3xl shadow-sm">
          <h1 className="text-2xl font-bold text-gray-800">마이 페이지</h1>
        </div>

        {/* Profile Card */}
        <div className="px-6 pt-6 pb-4">
          <div className="bg-white rounded-3xl p-6 shadow-lg">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                김
              </div>
              <div className="flex-1">
                <div className="font-bold text-gray-800 text-lg mb-1">김지수</div>
                <div className="text-sm text-gray-600">user@example.com</div>
                <div className="text-xs text-gray-500">1995.03.15 (음력)</div>
              </div>
            </div>
            <button className="w-full py-2.5 bg-purple-50 text-purple-600 rounded-xl font-semibold hover:bg-purple-100 transition-colors">
              프로필 수정
            </button>
          </div>
        </div>

        {/* Menu List */}
        <div className="px-6 pb-24 space-y-3">
          {[
            { title: '구매 내역', icon: '💳' },
            { title: '푸시 알림 설정', icon: '🔔' },
            { title: '버전 정보', icon: 'ℹ️' },
            { title: '이용약관', icon: '📄' },
            { title: '개인정보처리방침', icon: '🔒' },
            { title: '고객센터', icon: '💬' }
          ].map((menu, idx) => (
            <button
              key={idx}
              className="w-full bg-white rounded-2xl p-5 hover:shadow-md transition-all flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{menu.icon}</span>
                <span className="font-semibold text-gray-800">{menu.title}</span>
              </div>
              <ChevronRight size={20} className="text-gray-400" />
            </button>
          ))}

          <button className="w-full bg-white rounded-2xl p-5 hover:shadow-md transition-all text-red-600 font-semibold">
            로그아웃
          </button>
        </div>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-2">
          <div className="flex justify-around items-center">
            {[
              { icon: Home, label: '홈', active: false, page: 'home' },
              { icon: Star, label: '사주풀이', active: false, page: 'saju' },
              { icon: Clock, label: '히스토리', active: false, page: 'history' },
              { icon: User, label: '마이', active: true, page: 'my' }
            ].map((item, idx) => (
              <button 
                key={idx} 
                className="flex flex-col items-center gap-1 py-2"
                onClick={() => setCurrentPage(item.page)}
              >
                <item.icon size={24} className={item.active ? 'text-purple-600' : 'text-gray-400'} />
                <span className={`text-xs ${item.active ? 'text-purple-600 font-semibold' : 'text-gray-400'}`}>
                  {item.label}
                </span>
              </button>
            ))}
          </div>
          <div className="flex justify-center pt-1">
            <div className="w-32 h-1 bg-black rounded-full"></div>
          </div>
        </div>
      </div>
    );
  }

  // Monthly Fortune Page
  if (currentPage === 'monthly') {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white px-6 pt-12 pb-4 rounded-b-3xl shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <button onClick={() => setCurrentPage('home')}>
              <ChevronRight size={24} className="rotate-180 text-gray-800" />
            </button>
            <h1 className="text-2xl font-bold text-gray-800">월간 운세</h1>
          </div>
        </div>

        {/* Month Card */}
        <div className="px-6 pt-6 pb-4">
          <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-sm opacity-90 mb-1">2024년</div>
                <div className="text-3xl font-bold">12월 운세</div>
              </div>
              <div className="flex gap-1">
                {[1, 2, 3, 4].map((i) => (
                  <span key={i} className="text-2xl">⭐</span>
                ))}
              </div>
            </div>
            <p className="text-lg opacity-95">
              새로운 시작과 변화의 달입니다
            </p>
          </div>
        </div>

        {/* Fortune Categories */}
        <div className="px-6 pb-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">분야별 운세</h2>
          <div className="space-y-3">
            {monthlyFortune.map((item, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-5 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">{item.icon}</span>
                  <div className="flex-1">
                    <div className="font-bold text-gray-800 mb-1">{item.category}</div>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={`text-lg ${i < item.score ? item.color : 'text-gray-300'}`}>
                          ⭐
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="text-sm text-gray-700 bg-gray-50 rounded-xl p-3">
                  {item.message}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lucky Days */}
        <div className="px-6 pb-24">
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <h3 className="font-bold text-gray-800 mb-3">이번 달 특별한 날</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-green-500 font-bold">🟢</span>
                <span className="text-sm text-gray-700">좋은 날: 12월 5일, 12일, 18일</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-red-500 font-bold">🔴</span>
                <span className="text-sm text-gray-700">조심할 날: 12월 9일, 23일</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-2">
          <div className="flex justify-around items-center">
            {[
              { icon: Home, label: '홈', active: false, page: 'home' },
              { icon: Star, label: '사주풀이', active: false, page: 'saju' },
              { icon: Clock, label: '히스토리', active: false, page: 'history' },
              { icon: User, label: '마이', active: false, page: 'my' }
            ].map((item, idx) => (
              <button 
                key={idx} 
                className="flex flex-col items-center gap-1 py-2"
                onClick={() => setCurrentPage(item.page)}
              >
                <item.icon size={24} className={item.active ? 'text-purple-600' : 'text-gray-400'} />
                <span className={`text-xs ${item.active ? 'text-purple-600 font-semibold' : 'text-gray-400'}`}>
                  {item.label}
                </span>
              </button>
            ))}
          </div>
          <div className="flex justify-center pt-1">
            <div className="w-32 h-1 bg-black rounded-full"></div>
          </div>
        </div>
      </div>
    );
  }

  // Payment Modal
  if (showPayment) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-end justify-center z-50 animate-fadeIn">
        <div className="bg-white w-full rounded-t-3xl p-6 animate-slideUp max-h-[80vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">재회 사주 보기</h2>
            <button 
              onClick={() => setShowPayment(false)}
              className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              ✕
            </button>
          </div>

          {/* Service Info */}
          <div className="bg-purple-50 rounded-2xl p-5 mb-6">
            <h3 className="font-bold text-gray-800 mb-3">어떤 내용을 확인할 수 있나요?</h3>
            <div className="space-y-2">
              {[
                '✓ 재회 가능성 분석',
                '✓ 최적의 연락 시기',
                '✓ 재회를 위한 조언'
              ].map((item, idx) => (
                <div key={idx} className="text-sm text-gray-700">{item}</div>
              ))}
            </div>
          </div>

          {/* Price */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600">상품 금액</span>
              <span className="text-2xl font-bold text-gray-800">990원</span>
            </div>
            <div className="text-xs text-yellow-600 bg-yellow-50 rounded-lg p-2">
              🎉 첫 구매 50% 할인 적용 (원가 1,980원)
            </div>
          </div>

          {/* Payment Methods */}
          <div className="mb-6">
            <h3 className="font-bold text-gray-800 mb-3">결제 수단</h3>
            <div className="space-y-2">
              {[
                { name: '카카오페이', color: 'bg-yellow-400' },
                { name: '토스페이', color: 'bg-blue-500' },
                { name: '네이버페이', color: 'bg-green-500' }
              ].map((method, idx) => (
                <button
                  key={idx}
                  className={`w-full ${method.color} text-white font-semibold py-3 rounded-xl hover:opacity-90 transition-opacity`}
                >
                  {method.name}
                </button>
              ))}
            </div>
          </div>

          {/* Terms */}
          <div className="mb-6 space-y-2">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="w-4 h-4 accent-purple-600" />
              <span className="text-sm text-gray-700">결제 정보 확인 및 구매 동의</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="w-4 h-4 accent-purple-600" />
              <span className="text-sm text-gray-700">환불 정책 동의</span>
            </label>
          </div>

          <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-4 rounded-2xl hover:shadow-lg transition-all">
            990원 결제하기
          </button>
        </div>
      </div>
    );
  }

  return null;
}
