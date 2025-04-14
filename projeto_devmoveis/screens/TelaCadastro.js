import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function TelaCadastro() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmaSenha, setConfirmaSenha] = useState('');
  const navigation = useNavigation();
  


  const handleCadastro = () => {
    if (senha !== confirmaSenha) {
      Alert.alert("Erro", "As senhas não coincidem. Tente novamente.");
      return;
    }

    // Aqui você pode adicionar a lógica para salvar os dados no Firebase ou outro backend
    Alert.alert("Sucesso", "Cadastro realizado com sucesso!");
    navigation.navigate('TelaLogin'); // Redireciona para a tela de login após o cadastro
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome Completo"
        placeholderTextColor="gray"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="gray"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="gray"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry={true}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirma Senha"
        placeholderTextColor="gray"
        value={confirmaSenha}
        onChangeText={setConfirmaSenha}
        secureTextEntry={true}
      />
      <TouchableOpacity style={styles.botao} onPress={handleCadastro}>
        <Text style={styles.textoBotao}>Cadastrar</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.botaoVoltar}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.textoBotao}>Voltar</Text>
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
    marginBottom: 20,
  },
  input: {
    width: '85%',
    height: 50,
    backgroundColor: '#f9f9f9',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  botao: {
    backgroundColor: 'black',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    width: '85%',
  },
  botaoVoltar: {
    backgroundColor: 'gray',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    width: '85%',
  },
  textoBotao: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default TelaCadastro;