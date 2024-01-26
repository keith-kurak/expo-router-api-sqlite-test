import { useCallback, useEffect, useState } from 'react';

import { StyleSheet, Button } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';

async function postNameWithSequelize() {
  try {
    const response = await fetch(`/sequelize`, {
      method: "POST",
      headers: {
        Accept: "application.json",
        "Content-Type": "application/json",
      },
      cache: "default",
      body: JSON.stringify({ firstName: "Zaphod", lastName: "Beeblebrox"}),
    });
    const data = await response.json();
  } catch (error) {
    console.log(error);
  }
}

async function postNameWithSqlLite() {
  try {
    const response = await fetch(`/sqlite`, {
      method: "POST",
      headers: {
        Accept: "application.json",
        "Content-Type": "application/json",
      },
      cache: "default",
      body: JSON.stringify({ firstName: "Ford", lastName: "Prefect"}),
    });
    const data = await response.json();
  } catch (error) {
    console.log(error);
  }
}

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Button title="Try Sequelize" onPress={postNameWithSequelize} />
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Button title="Try Plain SQLite" onPress={postNameWithSqlLite} />
      <EditScreenInfo path="app/(tabs)/index.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
