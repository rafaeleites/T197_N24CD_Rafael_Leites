import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';

function TelaAlerta() {
  const [notificacaoAtraso, setNotificacaoAtraso] = useState(true);
  const [notificacaoFalta, setNotificacaoFalta] = useState(true);
  const [notificacaoExtra, setNotificacaoExtra] = useState(true);

  return (
    <View style={styles.container}>

      <View style={styles.container_title}>
      <Text style={styles.title}>Configurações de Notificações</Text>
      </View>

      <Text style={styles.title}>Notificações</Text>


      <View style={styles.option}>
        <Text style={styles.optionText}>Notificar atrasos</Text>
        <Switch
          value={notificacaoAtraso}
          onValueChange={setNotificacaoAtraso}
          thumbColor={notificacaoAtraso ? '#ccc' : '#ccc'}
          trackColor={{ false: '#767577', true: '#f0dc82' }}
        />
      </View>

      <View style={styles.option}>
        <Text style={styles.optionText}>Notificar faltas</Text>
        <Switch
          value={notificacaoFalta}
          onValueChange={setNotificacaoFalta}
          thumbColor={notificacaoFalta ? '#ccc' : '#ccc'}
          trackColor={{ false: '#767577', true: '#f0dc82' }}
        />
      </View>

      <View style={styles.option}>
        <Text style={styles.optionText}>Notificar saídas antes do previsto</Text>
        <Switch
          value={notificacaoExtra}
          onValueChange={setNotificacaoExtra}
          thumbColor={notificacaoExtra ? '#ccc' : '#ccc'}
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
    fontSize: 35,
    fontWeight: 'bold',
    color: 'black',
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
  container_title: {
    backgroundColor: 'white', // Fundo dourado
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
});

export default TelaAlerta;