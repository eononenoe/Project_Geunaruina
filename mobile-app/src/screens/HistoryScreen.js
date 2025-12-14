import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const historyItems = [
  {
    type: '재회 사주',
    date: '2024.12.10',
    summary: '재회 가능성 75% - 3월 중순이 최적기',
    icon: 'crystal-ball',
  },
  {
    type: '궁합 보기',
    date: '2024.12.05',
    summary: '궁합 점수 85점 - 연애 궁합 우수',
    icon: 'heart-multiple',
  },
  {
    type: '만남 시기',
    date: '2024.11.28',
    summary: '2025년 4월이 가장 좋은 시기',
    icon: 'heart',
  },
];

const filters = ['전체', '재회', '만남', '궁합'];

export default function HistoryScreen() {
  const [selectedFilter, setSelectedFilter] = useState(0);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>히스토리</Text>
          <View style={styles.filterContainer}>
            {filters.map((filter, idx) => (
              <TouchableOpacity
                key={idx}
                style={[
                  styles.filterButton,
                  selectedFilter === idx && styles.filterButtonActive,
                ]}
                onPress={() => setSelectedFilter(idx)}
              >
                <Text
                  style={[
                    styles.filterText,
                    selectedFilter === idx && styles.filterTextActive,
                  ]}
                >
                  {filter}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* History Items */}
        <View style={styles.listContainer}>
          {historyItems.map((item, idx) => (
            <View key={idx} style={styles.historyItem}>
              <View style={styles.itemHeader}>
                <Icon name={item.icon} size={32} color="#9333EA" />
                <View style={styles.itemInfo}>
                  <View style={styles.itemTitleRow}>
                    <Text style={styles.itemType}>{item.type}</Text>
                    <View style={styles.statusBadge}>
                      <Text style={styles.statusText}>완료</Text>
                    </View>
                  </View>
                  <Text style={styles.itemDate}>{item.date}</Text>
                  <Text style={styles.itemSummary}>{item.summary}</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.viewButton}>
                <Text style={styles.viewButtonText}>다시 보기</Text>
              </TouchableOpacity>
            </View>
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
    marginBottom: 16,
  },
  filterContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
  },
  filterButtonActive: {
    backgroundColor: '#9333EA',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  filterTextActive: {
    color: '#FFFFFF',
  },
  listContainer: {
    paddingHorizontal: 24,
    paddingTop: 24,
    gap: 12,
  },
  historyItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
  },
  itemHeader: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  itemInfo: {
    flex: 1,
  },
  itemTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  itemType: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  statusBadge: {
    backgroundColor: '#F3E8FF',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    color: '#9333EA',
  },
  itemDate: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 8,
  },
  itemSummary: {
    fontSize: 14,
    color: '#374151',
  },
  viewButton: {
    backgroundColor: '#F3E8FF',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  viewButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#9333EA',
  },
});
