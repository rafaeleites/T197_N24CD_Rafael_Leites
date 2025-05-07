import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const cor1 = '#000000'; // preto

function TelaRecursos() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recursos</Text>
      <View style={styles.grid}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('TelaModerador')}
        >
          <MaterialCommunityIcons name="database-edit" size={32} color={cor1} />
          <Text style={styles.buttonText}>Moderador</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('TelaPerfilEstagiario')}
        >
          <MaterialCommunityIcons
            name="account-group-outline"
            size={32}
            color={cor1}
          />
          <Text style={styles.buttonText}>Lista de Estagiários</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('TelaRegistro')}
        >
          <MaterialCommunityIcons name="history" size={32} color={cor1} />
          <Text style={styles.buttonText}>Histórico de registros</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('TelaRequisicoes')}
        >
          <MaterialCommunityIcons
            name="comment-text-multiple"
            size={32}
            color={cor1}
          />
          <Text style={styles.buttonText}>Requisições</Text>
        </TouchableOpacity>
      </View>

      {/* Rodapé (USAR IGUAL EM TODAS AS TELAS) */}
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => navigation.navigate('TelaConfiguracoes')}>
          <MaterialCommunityIcons name="cog-outline" size={30} color={cor1} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('TelaNotificacoes')}>
          <MaterialCommunityIcons name="bell-ring-outline" size={30} color={cor1} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('TelaPerfil')}>
          <MaterialCommunityIcons
            name="account-circle-outline" // Foto de perfil
            size={30}
            color={cor1}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5', // Alterado para o padrão
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    backgroundColor: 'transparent', // Fundo branco removido
    color: cor1, // Texto "Recursos" em preto
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