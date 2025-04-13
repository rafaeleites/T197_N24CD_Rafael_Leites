import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const cor1 = '#000000'; //preto
const cor2 = "#f0dc82"; //dourado
const cor3 = '2F2F2F'; // Cinza
const cor4 = 'F5F5DC'; // Bege
const cor5 = 'B8860B'; // dourado2

export default function TelaRequisicoes() {
  const navigation = useNavigation();

  const requisicoes = [
    { nome: "Nome", tipo: "Tipo de requisição", icon: "account" },
    { nome: "Daniel Silva", tipo: "Aprovação de conta", icon: "account-tie" },
    { nome: "Jaqueline Santos", tipo: "Alteração no ponto", icon: "account-circle" },
    { nome: "Joice Barbosa", tipo: "Alteração no ponto", icon: "account-clock" },
  ];

  return (
    <View style={styles.container}>
      {/* Botão Voltar */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <MaterialCommunityIcons name="arrow-left" size={30} color="#fff" />
      </TouchableOpacity>

      {/* Título */}
      <Text style={styles.title}>Requisições</Text>

      {/* Lista de Requisições */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {requisicoes.map((item, index) => (
          <View key={index} style={styles.card}>
            <MaterialCommunityIcons name={item.icon} size={24} color="#000" style={styles.avatar} />
            <View>
              <Text style={styles.nome}>{item.nome}</Text>
              <Text style={styles.tipo}>{item.tipo}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Rodapé com ícones */}
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => navigation.navigate('TelaRecursos')}>
          <MaterialCommunityIcons name="cog-outline" size={30} color="#000" /> 
          {/* Engrenagem */}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('TelaRequisicoes')}>
          <MaterialCommunityIcons name="comment-text-multiple" size={30} color="#000" />
          {/* Comentários */}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('TelaEstagiarios')}>
          <MaterialCommunityIcons name="account-group" size={30} color="#000" />
          {/* Pessoas */}
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: cor1,
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  backButton: {
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: cor2,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    textAlign: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
  scrollContainer: {
    paddingBottom: 80,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F1F1',
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
  },
  avatar: {
    marginRight: 15,
  },
  nome: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#000',
  },
  tipo: {
    fontSize: 13,
    color: '#555',
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
