import React, { useState } from 'react';
import { Image, View, TextInput, Text, Button, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';

function TelaLogin() {
  const [text_email, setText_email] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  return (
    <View style={styles.container_login}>

      <View style={styles.container_image_login}>
        <Image style = {styles.imagem_login}
        source={require('./assets/logo1.png')}
        />
      </View>

      <View style={styles.view_texto_contato}>
      <Text style={styles.texto_contato}> Bem Vindo </Text>
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

      <Button title="Entrar" onPress={() => navigation.navigate('Home')} />

    </View>
  );
}






const styles = StyleSheet.create({
  container_principal: {
    flex: 1,
    backgroundColor: '#3333',
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

  view_texto_contato:{
    alignItems: 'center',
  },

  texto_contato:{
    color:'purple',
    fontWeight: 'bold',
    padding: 10,
    fontSize: 25,
  },

  
  input_contato:{
    height: 40,
    borderColor: 'purple',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    },

 

});

export default TelaLogin;
