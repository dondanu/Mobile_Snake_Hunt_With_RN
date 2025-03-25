import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const License = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>License Information</Text>

      {/* License Information */}
      <Text style={styles.info}>License: Open Source (MIT License)</Text>
      <Text style={styles.info}>Copyright: © 2025 Snake_Hunt</Text>
      <Text style={styles.info}>Author: MR. S. K. DANUSAN</Text>
      <Text style={styles.info}>Email: danusan.official@gmail.com</Text>
      <Text style={{ color: 'white' }}> --------------------------------------</Text>

      <Text style={styles.info}>This game is licensed under the MIT License.</Text>
      <Text style={styles.info}>Feel free to modify, distribute, or use this game code for personal and commercial projects.</Text>
      <Text style={styles.info}>For more details, please refer to the LICENSE file in the project repository.</Text>
      <Text> </Text>
      <Text style={{ color: 'white', fontSize: 20 }}> ~ All rights reserved</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#282828',
    padding: 20,
  },
  title: {
    color: '#FF6347', // Tomato Red for title
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  info: {
    color: '#00BFFF', // Deep Sky Blue for info text
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  }
});

export default License;
