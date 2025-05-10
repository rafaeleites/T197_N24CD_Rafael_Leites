import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { getDatabase, ref, get } from 'firebase/database';

function TelaAlteracaoLogin() {
  const [email, setEmail] = useState('');

  const handleEnviarEmail = async () => {
    if (!email) {
      Alert.alert('Erro', 'Por favor, insira um e-mail válido.');
      return;
    }

    try {
      const db = getDatabase();
      const adminRef = ref(db, 'administradores'); // Caminho onde os e-mails estão armazenados
      const snapshot = await get(adminRef);

      if (snapshot.exists()) {
        const data = snapshot.val();
        const emailExiste = Object.values(data).some((admin) => admin.email === email);

        if (!emailExiste) {
          Alert.alert('Erro', 'O e-mail informado não está registrado.');
          return;
        }

        // Se o e-mail existir, envia o e-mail de redefinição de senha
        const auth = getAuth();
        await sendPasswordResetEmail(auth, email);
        Alert.alert(
          'Sucesso',
          'Um e-mail para redefinição de senha foi enviado. Verifique sua caixa de entrada.'
        );
        setEmail(''); // Limpa o campo de e-mail após o envio
      } else {
        Alert.alert('Erro', 'Nenhum e-mail registrado foi encontrado.');
      }
    } catch (error) {
      console.error('Erro ao verificar e-mail:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao verificar o e-mail. Tente novamente.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Redefinir Senha</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu e-mail"
        placeholderTextColor="gray"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TouchableOpacity style={styles.botao} onPress={handleEnviarEmail}>
        <Text style={styles.textoBotao}>Enviar E-mail</Text>
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
    color: 'black',
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