import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database';
import { useNavigation } from '@react-navigation/native';

function TelaCadastro() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmaSenha, setConfirmaSenha] = useState('');
  const [codigoAutenticacao, setCodigoAutenticacao] = useState('');

  const navigation = useNavigation();

  // Código de autenticação definido (idealmente, isso deve vir de um backend seguro)
  const CODIGO_VALIDO = '123456'; // Substitua por um código real e seguro

  const handleCadastro = async () => {
    if (!nome || !email || !senha || !confirmaSenha || !codigoAutenticacao) {
      Alert.alert("Atenção", "Preencha todos os campos.");
      return;
    }

    if (senha !== confirmaSenha) {
      Alert.alert("Erro", "As senhas não coincidem.");
      return;
    }

    if (codigoAutenticacao !== CODIGO_VALIDO) {
      Alert.alert("Erro", "Código de autenticação inválido.");
      return;
    }

    try {
      const auth = getAuth();
      const db = getDatabase();

      console.log("Iniciando cadastro...");
      const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
      const user = userCredential.user;

      console.log("✅ Usuário criado com UID:", user.uid);

      // Salva os dados no nó "administradores" no Realtime Database
      await set(ref(db, 'administradores/' + user.uid), {
        nome: nome,
        email: email
      })
      .then(() => {
        console.log("✅ Dados salvos no Realtime Database no nó 'administradores'.");

        // Alerta com navegação após confirmação
        Alert.alert("Sucesso", "Cadastro realizado com sucesso!", [
          {
            text: "OK",
            onPress: () => {
              console.log("Navegando para TelaLogin...");
              navigation.navigate('TelaLogin'); // Navega para a tela de login
            },
          },
        ]);

        // Limpa os campos após sucesso
        setNome('');
        setEmail('');
        setSenha('');
        setConfirmaSenha('');
        setCodigoAutenticacao('');
      })
      .catch((error) => {
        console.error("❌ Erro ao salvar dados no Firebase:", error);
        Alert.alert("Erro", "Erro ao salvar no banco.");
      });

    } catch (error) {
      console.error("❌ Erro no cadastro:", error);
      Alert.alert("Erro", error.message);
    }
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
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Confirmar Senha"
        placeholderTextColor="gray"
        value={confirmaSenha}
        onChangeText={setConfirmaSenha}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Código de Autenticação"
        placeholderTextColor="gray"
        value={codigoAutenticacao}
        onChangeText={setCodigoAutenticacao}
      />

      <TouchableOpacity style={styles.botao} onPress={handleCadastro}>
        <Text style={styles.textoBotao}>Cadastrar</Text>
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
    backgroundColor: '#1e90ff',
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