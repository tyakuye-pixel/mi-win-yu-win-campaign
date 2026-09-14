import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider } from 'react-redux';
import store from './redux/store';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Screens
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import DashboardScreen from './screens/DashboardScreen';
import SupportersScreen from './screens/SupportersScreen';
import VolunteersScreen from './screens/VolunteersScreen';
import TargetsScreen from './screens/TargetsScreen';
import BudgetScreen from './screens/BudgetScreen';
import ProfileScreen from './screens/ProfileScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Auth Stack
function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
}

// Main App Stack
function AppStack() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          title: 'Campaign Dashboard',
        }}
      />
      <Tab.Screen
        name="Supporters"
        component={SupportersScreen}
        options={{
          title: 'Supporters',
        }}
      />
      <Tab.Screen
        name="Volunteers"
        component={VolunteersScreen}
        options={{
          title: 'Volunteers',
        }}
      />
      <Tab.Screen
        name="Targets"
        component={TargetsScreen}
        options={{
          title: 'Ward Targets',
        }}
      />
      <Tab.Screen
        name="Budget"
        component={BudgetScreen}
        options={{
          title: 'Budget',
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Profile',
        }}
      />
    </Tab.Navigator>
  );
}

// Root Navigator
function RootNavigator({ initialRoute }) {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {initialRoute === 'Auth' ? (
          <Stack.Screen
            name="Auth"
            component={AuthStack}
            options={{ animationEnabled: false }}
          />
        ) : (
          <Stack.Screen
            name="App"
            component={AppStack}
            options={{ animationEnabled: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  const [initialRoute, setInitialRoute] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    // Check if user is logged in
    const checkAuth = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken');
        setInitialRoute(token ? 'App' : 'Auth');
      } catch (error) {
        console.error('Error checking auth:', error);
        setInitialRoute('Auth');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return null;
  }

  return (
    <Provider store={store}>
      <RootNavigator initialRoute={initialRoute} />
    </Provider>
  );
}
