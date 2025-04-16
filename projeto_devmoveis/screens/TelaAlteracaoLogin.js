import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function TelaAlteracaoLogin() {
  const navigation = useNavigation();

  const handleAlterarSenha = () => {
    // Lógica para alterar senhaa (implementar futuramente)
    console.log("Alterar Senha clicado");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Alterar Dados de Acesso</Text>
      <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('handleAlterarSenha')}>
        <Text style={styles.textoBotao}>Alterar Senha</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.botaoVoltar}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.textoBotao}>VOLTAR</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 30,
  },
  botao: {
    backgroundColor: 'black',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
    width: '85%',
    borderWidth: 1,
    borderColor: 'white',
  },
  botaoVoltar: {
    backgroundColor: 'gray',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    width: '85%',
  },
  textoBotao: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default TelaAlteracaoLogin;