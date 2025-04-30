import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';

function TelaAlerta() {
  const [notificacaoAtraso, setNotificacaoAtraso] = useState(false);
  const [notificacaoFalta, setNotificacaoFalta] = useState(false);
  const [notificacaoExtra, setNotificacaoExtra] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configurações de Notificações</Text>

      <View style={styles.option}>
        <Text style={styles.optionText}>Notificar atrasos</Text>
        <Switch
          value={notificacaoAtraso}
          onValueChange={setNotificacaoAtraso}
          thumbColor={notificacaoAtraso ? '#f0dc82' : '#ccc'}
          trackColor={{ false: '#767577', true: '#f0dc82' }}
        />
      </View>

      <View style={styles.option}>
        <Text style={styles.optionText}>Notificar faltas</Text>
        <Switch
          value={notificacaoFalta}
          onValueChange={setNotificacaoFalta}
          thumbColor={notificacaoFalta ? '#f0dc82' : '#ccc'}
          trackColor={{ false: '#767577', true: '#f0dc82' }}
        />
      </View>

      <View style={styles.option}>
        <Text style={styles.optionText}>Notificar saídas antes do previsto</Text>
        <Switch
          value={notificacaoExtra}
          onValueChange={setNotificacaoExtra}
          thumbColor={notificacaoExtra ? '#f0dc82' : '#ccc'}
          trackColor={{ false: '#767577', true: '#f0dc82' }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#f0dc82',
    textAlign: 'center',
    marginBottom: 30,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
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
    color: '#000',
    flex: 1,
    marginRight: 10,
  },
});

export default TelaAlerta;