import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Import the level screens
import Small from './Small';  // Make sure the path is correct
import Medium from './Medium';  // Make sure the path is correct
import Hard from './Hard';  // Make sure the path is correct
import Contact from './Contact'; // Make sure the path is correct

// Create a Stack Navigator
const Stack = createStackNavigator();

const Home = ({ navigation }) => {
  const scaleValue = new Animated.Value(1);

  const onPressButton = (screen) => {
    Animated.sequence([
      Animated.spring(scaleValue, { toValue: 0.9, useNativeDriver: true }),
      Animated.spring(scaleValue, { toValue: 1, useNativeDriver: true })
    ]).start(() => navigation.navigate(screen));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Snake Hunt</Text>
      <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => onPressButton('Small')}
        >
          <Text style={styles.buttonText}>Level 1</Text>
        </TouchableOpacity>
      </Animated.View>
      <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => onPressButton('Medium')}
        >
          <Text style={styles.buttonText}>Level 2</Text>
        </TouchableOpacity>
      </Animated.View>
      <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => onPressButton('Hard')}
        >
          <Text style={styles.buttonText}>Level 3</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};


const App = () => {
  return (
    
<NavigationContainer>
  <Stack.Navigator initialRouteName="Home">
    <Stack.Screen
      name="Home"
      component={Home}
      options={({ navigation }) => ({
        headerStyle: {
          backgroundColor: '#3498db', // Customize the header background color
          
        },
        headerTitleStyle: {
          color: 'white', // Set the color of the title in the header
          fontSize: 20,
          fontWeight: 'bold',
              fontFamily: 'Roboto', // Optional: Custom font
        },
        headerRight: () => (
          <TouchableOpacity style={styles.licenseButton} onPress={() => navigation.navigate('License')}>
            <Text style={styles.buttonText2}>License</Text>
          </TouchableOpacity>
        ),
      })}
    />
    {/* Other screens */}
    <Stack.Screen name="Small" component={Small} />
        <Stack.Screen name="Medium" component={Medium} />
        <Stack.Screen name="Hard" component={Hard} />
        <Stack.Screen name="License" component={Contact} />
  </Stack.Navigator>
</NavigationContainer>


 
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  title: {
    color: 'white',
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 40,
    fontFamily: 'Roboto', // Optional: Custom font
  },
  button: {
    backgroundColor: '#3498db', // Default button color
    padding: 10,
    margin: 10,
    borderRadius: 5,
    width: 200,
    alignItems: 'center',
  },
  homeButton: {
    backgroundColor: '#2ecc71', // Only Home button is green
    padding: 15,
    margin: 12,
    borderRadius: 10,
    width: 250,
    alignItems: 'center',
    elevation: 5, // Adds a subtle shadow effect
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold'
  },

  buttonText2: {
    color: 'white',
    fontSize: 20,
  },

  licenseButton: {
    marginRight: 15,
    padding: 10,
    backgroundColor: '#3498db',
    borderRadius: 5,
    alignItems: 'center',
  },
});

export default App;
