import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../contexts/ThemeContext'; // Importar o contexto do tema

function TelaRecursos() {
  const navigation = useNavigation();
  const { isDarkMode } = useTheme(); // Usar o estado do tema

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? 'black' : '#f5f5f5' }]}>
      <Text style={[styles.title, { color: isDarkMode ? 'white' : '#000' }]}>Recursos</Text>
      <View style={styles.grid}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: isDarkMode ? '#333' : '#fff' }]}
          onPress={() => navigation.navigate('TelaModerador')}
        >
          <MaterialCommunityIcons
            name="database-edit"
            size={32}
            color={isDarkMode ? 'white' : '#000'}
          />
          <Text style={[styles.buttonText, { color: isDarkMode ? 'white' : '#000' }]}>
            Moderador
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: isDarkMode ? '#333' : '#fff' }]}
          onPress={() => navigation.navigate('TelaPerfilEstagiario')}
        >
          <MaterialCommunityIcons
            name="account-group-outline"
            size={32}
            color={isDarkMode ? 'white' : '#000'}
          />
          <Text style={[styles.buttonText, { color: isDarkMode ? 'white' : '#000' }]}>
            Lista de Estagiários
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: isDarkMode ? '#333' : '#fff' }]}
          onPress={() => navigation.navigate('TelaRegistro')}
        >
          <MaterialCommunityIcons
            name="history"
            size={32}
            color={isDarkMode ? 'white' : '#000'}
          />
          <Text style={[styles.buttonText, { color: isDarkMode ? 'white' : '#000' }]}>
            Histórico de registros
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: isDarkMode ? '#333' : '#fff' }]}
          onPress={() => navigation.navigate('TelaRequisicoes')}
        >
          <MaterialCommunityIcons
            name="comment-text-multiple"
            size={32}
            color={isDarkMode ? 'white' : '#000'}
          />
          <Text style={[styles.buttonText, { color: isDarkMode ? 'white' : '#000' }]}>
            Requisições
          </Text>
        </TouchableOpacity>
      </View>

      {/* Rodapé */}
      <View
        style={[
          styles.footer,
          { backgroundColor: isDarkMode ? '#333' : 'white', borderColor: isDarkMode ? '#555' : '#ccc' },
        ]}
      >
        <TouchableOpacity onPress={() => navigation.navigate('TelaConfiguracoes')}>
          <MaterialCommunityIcons
            name="cog-outline"
            size={30}
            color={isDarkMode ? 'white' : '#000'}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('TelaNotificacoes')}>
          <MaterialCommunityIcons
            name="bell-ring-outline"
            size={30}
            color={isDarkMode ? 'white' : '#000'}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('TelaPerfil')}>
          <MaterialCommunityIcons
            name="account-circle-outline"
            size={30}
            color={isDarkMode ? 'white' : '#000'}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    backgroundColor: 'transparent',
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
    textAlign: 'center',
    marginTop: 10,
  },
  footer: {
    position: 'absolute',
    bottom: 10,
    left: 30,
    right: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 15,
    borderWidth: 1,
  },
});

export default TelaRecursos;