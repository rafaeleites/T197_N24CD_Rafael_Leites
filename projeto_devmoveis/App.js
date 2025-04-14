import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TelaRecursos from './screens/TelaRecursos';
import TelaEstagiarios from './screens/TelaEstagiarios';
import TelaPerfil from './screens/TelaPerfil';
import TelaRequisicoes from './screens/TelaRequisicoes';
import TelaLogin from './screens/TelaLogin'; 
import TelaPerfilEstagiario from './screens/TelaPerfilEstagiario'; 
import TelaAlteracaoLogin from './screens/TelaAlteracaoLogin'; // Importando a nova tela
import TelaCadastro from './screens/TelaCadastro'; // Importando a nova tela

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TelaLogin"> 
        <Stack.Screen name="TelaRecursos" component={TelaRecursos} />
        <Stack.Screen name="TelaEstagiarios" component={TelaEstagiarios} />
        <Stack.Screen name="TelaPerfil" component={TelaPerfil} />
        <Stack.Screen name="TelaRequisicoes" component={TelaRequisicoes} />
        <Stack.Screen name="TelaLogin" component={TelaLogin} />
        <Stack.Screen name="TelaPerfilEstagiario" component={TelaPerfilEstagiario} />
        <Stack.Screen name="TelaAlteracaoLogin" component={TelaAlteracaoLogin} /> {/* Adicionada */}
        <Stack.Screen name="TelaCadastro" component={TelaCadastro} /> {/* Adicionada */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}