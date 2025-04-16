import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const cor1 = '#000000'; // preto
const cor2 = 'f0dc82'; // dourado

function TelaRecursos() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recursos</Text>
      <View style={styles.grid}>

        <TouchableOpacity style={styles.button}>
          <MaterialCommunityIcons
            name="note-edit-outline"
            size={32}
            color="f0dc82"
          />
          <Text style={styles.buttonText}>Justificativas</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('TelaPerfilEstagiario')}
        >
          <MaterialCommunityIcons
            name="account-group-outline"
            size={32}
            color="f0dc82"
          />
          <Text style={styles.buttonText}>Lista de Estagiários</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('TelaEstagiarios')}
        >
          <MaterialCommunityIcons name="history" size={32} color="f0dc82" />
          <Text style={styles.buttonText}>Histórico de registros</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <MaterialCommunityIcons
            name="clock-outline"
            size={32}
            color="f0dc82"
          />
          <Text style={styles.buttonText}>Controle de carga horária</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('TelaRecursos')}
        >
          <MaterialCommunityIcons name="database-edit" size={32} color="f0dc82" />
          <Text style={styles.buttonText}>Moderador</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('TelaRequisicoes')}
        >
          <MaterialCommunityIcons
            name="comment-text-multiple"
            size={32}
            color="f0dc82"
          />
          <Text style={styles.buttonText}>Requisições</Text>
        </TouchableOpacity>
      </View>

      {/* Rodapé com ícones */}
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => navigation.navigate('TelaRecursos')}>
          <MaterialCommunityIcons name="cog-outline" size={30} color="#000" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('TelaNotificacoes')}>
          <MaterialCommunityIcons name="bell-outline" size={30} color="#000" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('TelaPerfil')}>
          <MaterialCommunityIcons
            name="account-circle-outline"
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
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    backgroundColor: '#fff',
    color: cor2,
    textAlign: 'center',
    marginBottom: 30,
    padding: 10,
    borderRadius: 10,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  button: {
    width: '47%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5, // sombra Android
    shadowColor: '#000', // sombra iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginTop: 10,
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
    borderRadius: 15,
  },
});

export default TelaRecursos;