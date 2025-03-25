import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
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
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Snake Game</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Small')}>
        <Text style={styles.buttonText}>Level 1</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Medium')}>
        <Text style={styles.buttonText}>Level 2</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Hard')}>
        <Text style={styles.buttonText}>Level 3</Text>
      </TouchableOpacity>
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
    fontSize: 30,
    marginBottom: 30,
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
    padding: 10,
    margin: 10,
    borderRadius: 5,
    width: 200,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
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
