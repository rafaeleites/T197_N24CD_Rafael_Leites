import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../Back-End/firebaseConfig';
import { signInWithEmailAndPassword } from "firebase/auth";

function TelaLogin() {
  const [text_email, setText_email] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, text_email.trim(), password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("Logado como:", user.email);
        navigation.navigate("TelaRecursos"); // ou a tela que quiser
      })
      .catch((error) => {
        console.log("Erro ao logar:", error.message);
        Alert.alert(
          "Erro de Login",
          "Email ou senha incorretos.",
          [
            {
              text: "Tentar novamente",
              onPress: () => console.log("Usuário escolheu tentar novamente"),
            },
            {
              text: "Alterar dados de acesso",
              onPress: () => navigation.navigate('TelaAlteracaoLogin'), // Navega diretamente para a tela
            },
          ]
        );
      });
  };

  return (
    <View style={styles.container_principal}>
      <View style={styles.container_image_login}>
        <Image
          style={styles.imagem_login}
          source={require('../assets/Logo1.png')}
        />
      </View>

      <View style={styles.box_login}>
        <View style={styles.view_texto_contato}>
          <Text style={styles.texto_contato}>Bem Vindo</Text>
        </View>
        <TextInput
          style={styles.input_contato}
          placeholder="Digite seu email"
          placeholderTextColor="gray"
          value={text_email}
          onChangeText={setText_email}
        />
        <TextInput
          style={styles.input_contato}
          placeholder="Digite sua senha"
          placeholderTextColor="gray"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />
        <TouchableOpacity style={styles.botao_login} onPress={handleLogin}>
          <Text style={styles.texto_botao}>Entrar</Text>
        </TouchableOpacity>

        {/* Mensagem de cadastro */}
        <Text style={styles.mensagem_cadastro}>
          Não possui cadastro?{' '}
          <Text
            style={styles.link_cadastro}
            onPress={() => navigation.navigate('TelaCadastro')}
          >
            Clique aqui
          </Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container_principal: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    padding: 5,
  },
  box_login: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  input_contato: {
    height: 50,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  botao_login: {
    backgroundColor: 'black',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  texto_botao: {
    color: 'white',
    fontWeight: 'bold',
    padding: 5,
    fontSize: 15,
  },
  imagem_login: {
    width: 294,
    height: 119,
  },
  container_image_login: {
    flex: 0.6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  view_texto_contato: {
    alignItems: 'center',
  },
  texto_contato: {
    color: 'black',
    fontWeight: 'bold',
    padding: 10,
    fontSize: 25,
  },
  mensagem_cadastro: {
    marginTop: 15,
    fontSize: 14,
    color: 'gray',
    textAlign: 'center',
  },
  link_cadastro: {
    color: 'blue',
    fontWeight: 'bold',
  },
});

export default TelaLogin;