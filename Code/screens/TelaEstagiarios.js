import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const cor1 = '#000000' //preto
const cor2 = "f0dc82" //dourado
const cor3 = "2F2F2F" // Cinza
const cor4 = "F5F5DC" // Bege
const cor5 = "B8860B" // dourado2

export default function TelaEstagiarios() {
  const navigation = useNavigation();

  const estagiarios = [
    {
      nome: 'Jadilson Coelho',
      setor: 'Administrativo',
      universidade: 'Universidade de Fortaleza',
      //avatar: require('./assets/avatar1.png'), // Substitua com seu caminho de imagem
    },
    {
      nome: 'Jucilene Lima',
      setor: 'Consultivo',
      universidade: 'Universidade Federal do Ceará',
      //avatar: require('./assets/avatar2.png'),
    },
    {
      nome: 'Marcio Santos',
      setor: 'Contencioso',
      universidade: 'Universidade Estadual do Ceará',
      //avatar: require('./assets/avatar3.png'),
    },
  ];

  return (
    <View style={styles.container}>
      {/* Título */}
      <View style={styles.header}>
        <Text style={styles.title}>Estagiários</Text>
      </View>

      {/* Lista de estagiários */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {estagiarios.map((item, index) => (
          <View key={index} style={styles.card}>
            <Image source={item.avatar} style={styles.avatar} />
            <View style={styles.info}>
              <Text style={styles.name}>{item.nome}</Text>
              <Text style={styles.setor}>Setor: {item.setor}</Text>
              <Text style={styles.universidade}>{item.universidade}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Rodapé com ícones */} // COPIAR COMO MODELO DE RODAPÉ
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => navigation.navigate('TelaRecursos')}>
          <MaterialCommunityIcons name="cog-outline" size={30} color="#000" />{' '}
          //Engrenagem
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('TelaRequisicoes')}>
          <MaterialCommunityIcons name="comment-text-multiple" size={30} color="#000" />{' '}
          //Engrenagem
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('TelaEstagiarios')}>
          <MaterialCommunityIcons name="account-group" size={30} color="#000" />{' '}
          //Pessoas
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('TelaPerfil')}>
          <MaterialCommunityIcons
            name="account-circle-outline" //Foto de perfil
            size={30}
            color="#000"
          />
        </TouchableOpacity>
      </View>
    </View>
  )}
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: cor1,
      paddingTop: 40,
    },
    header: {
      alignItems: 'center',
      marginBottom: 20,
    },
    title: {
      fontSize: 26,
      fontWeight: 'bold',
      color: cor2,
      backgroundColor: '#fff',
      paddingHorizontal: 30,
      paddingVertical: 10,
      borderRadius: 15,
    },
    scrollContainer: {
      paddingHorizontal: 20,
      paddingBottom: 80,
    },
    card: {
      flexDirection: 'row',
      backgroundColor: '#fff',
      borderRadius: 15,
      padding: 15,
      marginBottom: 20,
      alignItems: 'center',
      elevation: 5,
    },
    avatar: {
      width: 50,
      height: 50,
      marginRight: 15,
      borderRadius: 25,
    },
    info: {
      flex: 1,
    },
    name: {
      fontWeight: 'bold',
      fontSize: 16,
    },
    setor: {
      fontSize: 14,
      marginTop: 4,
    },
    universidade: {
      fontSize: 13,
      color: '#555',
      marginTop: 2,
    },
    footer: {
      backgroundColor: 'white',
      position: 'absolute',
      bottom: 10,
      left: 30,
      right: 30,
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 30,
      paddingVertical: 15,
      paddingTop: 15,
      borderRadius: 15,
    },
  });

