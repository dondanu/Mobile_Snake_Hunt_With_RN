// Contact.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Contact = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contact Information</Text>
      <Text style={styles.info}>Snake Game Support</Text>
      <Text style={styles.info}>Email: support@snakegame.com</Text>
      <Text style={styles.info}>Phone: +1 234 567 8900</Text>
      <Text style={styles.info}>Address: 123 Gaming Blvd, Fun City, GA</Text>
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
  title: {
    color: 'white',
    fontSize: 24,
    marginBottom: 20,
  },
  info: {
    color: 'white',
    fontSize: 18,
    marginBottom: 10,
  }
});

export default Contact;
