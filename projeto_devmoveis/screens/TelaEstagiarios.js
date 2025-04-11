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
import { getDatabase, ref, onValue } from 'firebase/database';
import { useEffect, useState } from 'react';

const cor1 = '#000000' //preto
const cor2 = "#FFFFFF" //dourado


export default function TelaEstagiarios() {
  const [estagiarios, setEstagiarios] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const db = getDatabase();
    const estagiariosRef = ref(db, 'EstagiariosTeste');

    onValue(estagiariosRef, (snapshot) => {
      const data = snapshot.val();
      console.log("Dados recebidos do Firebase:", data); // <--- TESTE
      if (data) {
        const lista = Object.entries(data).map(([id, info]) => ({
          id,
          ...info,
        }));
        setEstagiarios(lista);
      }
    });
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('TelaPerfilEstagiario', { estagiario: item })}
      style={styles.card}
    >
      <View style={styles.info}>
        <Text style={styles.name}>{item.nome}</Text>
        <Text style={styles.email}>{item.email}</Text>
        <Text style={styles.carga}>Carga Horária: {item.cargaHoraria} horas</Text>
      </View>
    </TouchableOpacity>
  );
 
  return (
    <View style={styles.container}>
      {/* Título */}
      <View style={styles.header}>
        <Text style={styles.title}>Estagiários</Text>
      </View>

      {/* Lista */}
      <FlatList
        data={estagiarios}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.scrollContainer}
      />
      

      {/* Rodapé com ícones */} 
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => navigation.navigate('TelaRecursos')}>
          <MaterialCommunityIcons name="cog-outline" size={30} color="#000" />{' '}
          
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('TelaRequisicoes')}>
          <MaterialCommunityIcons name="comment-text-multiple" size={30} color="#000" />{' '}
          
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('TelaEstagiarios')}>
          <MaterialCommunityIcons name="account-group" size={30} color="#000" />{' '}
          
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
    email: {
      fontSize: 14,
      marginTop: 2,
      color: '#444',
    },
    carga: {
      fontSize: 13,
      marginTop: 2,
      color: '#666',
    },
  });

