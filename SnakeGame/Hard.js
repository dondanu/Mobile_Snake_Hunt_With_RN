import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Hard = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Level 3 - Hard</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  text: {
    color: 'white',
    fontSize: 30,
  },
});

export default Hard;
