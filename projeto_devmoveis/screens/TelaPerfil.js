import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const cor1 = '#000000' //preto
const cor2 = '#FFFFFF' //branco


export default function TelaPerfil() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('TelaRecursos')}>
        <MaterialCommunityIcons name="arrow-left" size={30} color='#FFFFFF' />
      </TouchableOpacity>

      <Text style={styles.title}>Meu Perfil</Text>

      <Image
        source={{ uri: 'https://via.placeholder.com/100x100.png?text=Perfil' }}
        style={styles.avatar}
      />
      <Text style={styles.name}>Nome do Adm</Text>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>email@outlook.com</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Alterar email</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Alterar senha</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('TelaLogin')}>
        <Text style={styles.buttonText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: cor1,
    alignItems: 'center',
    paddingTop: 40,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    backgroundColor: cor2,
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderRadius: 15,
    color: cor1,
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#eee',
    marginBottom: 10,
  },
  name: {
    color: cor2,
    fontSize: 16,
    marginBottom: 30,
  },
  button: {
    width: '80%',
    backgroundColor: cor2,
    paddingVertical: 15,
    borderRadius: 20,
    marginBottom: 15,
    alignItems: 'center',
    elevation: 4,
  },
  buttonText: {
    color: cor1,
    fontWeight: 'bold',
  },
});
