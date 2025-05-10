import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { useTheme } from '../contexts/ThemeContext'; // Importar o contexto do tema

function TelaAlerta() {
  const { isDarkMode } = useTheme(); // Usar o estado do tema
  const [notificacaoAtraso, setNotificacaoAtraso] = useState(true);
  const [notificacaoFalta, setNotificacaoFalta] = useState(true);
  const [notificacaoExtra, setNotificacaoExtra] = useState(true);

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#000' : '#f5f5f5' }]}>
      <Text style={[styles.title, { color: isDarkMode ? '#fff' : '#000' }]}>Configurar Alertas</Text>

      <View style={[styles.option, { backgroundColor: isDarkMode ? '#333' : '#fff' }]}>
        <Text style={[styles.optionText, { color: isDarkMode ? '#fff' : '#000' }]}>Notificar atrasos</Text>
        <Switch
          value={notificacaoAtraso}
          onValueChange={setNotificacaoAtraso}
          thumbColor={notificacaoAtraso ? (isDarkMode ? '#666' : '#ccc') : (isDarkMode ? '#444' : '#ccc')}
          trackColor={{ false: '#767577', true: isDarkMode ? '#81b0ff' : '#f0dc82' }}
        />
      </View>

      <View style={[styles.option, { backgroundColor: isDarkMode ? '#333' : '#fff' }]}>
        <Text style={[styles.optionText, { color: isDarkMode ? '#fff' : '#000' }]}>Notificar faltas</Text>
        <Switch
          value={notificacaoFalta}
          onValueChange={setNotificacaoFalta}
          thumbColor={notificacaoFalta ? (isDarkMode ? '#666' : '#ccc') : (isDarkMode ? '#444' : '#ccc')}
          trackColor={{ false: '#767577', true: isDarkMode ? '#81b0ff' : '#f0dc82' }}
        />
      </View>

      <View style={[styles.option, { backgroundColor: isDarkMode ? '#333' : '#fff' }]}>
        <Text style={[styles.optionText, { color: isDarkMode ? '#fff' : '#000' }]}>
          Notificar saídas antes do previsto
        </Text>
        <Switch
          value={notificacaoExtra}
          onValueChange={setNotificacaoExtra}
          thumbColor={notificacaoExtra ? (isDarkMode ? '#666' : '#ccc') : (isDarkMode ? '#444' : '#ccc')}
          trackColor={{ false: '#767577', true: isDarkMode ? '#81b0ff' : '#f0dc82' }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    elevation: 5, // sombra Android
    shadowColor: '#000', // sombra iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  optionText: {
    fontSize: 16,
    flex: 1,
    marginRight: 10,
  },
});

export default TelaAlerta;