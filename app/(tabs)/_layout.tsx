import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#6D5EFC',
        tabBarInactiveTintColor: '#888',
        tabBarStyle: {
          backgroundColor: '#0A0C12',
          borderTopColor: 'rgba(255,255,255,0.1)',
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
        headerStyle: {
          backgroundColor: '#0A0C12',
        },
        headerTintColor: '#F4F6FF',
        headerTitleStyle: {
          fontWeight: '700',
        },
      }}
    >
      <Tabs.Screen
        name="board"
        options={{
          title: 'Game Board',
          headerTitle: 'Look-Alkemy',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="apps" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="packs"
        options={{
          title: 'Packs',
          headerTitle: 'Ingredient Packs',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="layers" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="collections"
        options={{
          title: 'Collections',
          headerTitle: 'My Collections',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="bookmark" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
