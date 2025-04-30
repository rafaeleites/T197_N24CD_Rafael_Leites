import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TelaRecursos from './screens/TelaRecursos';
import TelaRegistro from './screens/TelaRegistro';
import TelaPerfil from './screens/TelaPerfil';
import TelaRequisicoes from './screens/TelaRequisicoes';
import TelaLogin from './screens/TelaLogin'; 
import TelaPerfilEstagiario from './screens/TelaPerfilEstagiario'; 
import TelaAlteracaoLogin from './screens/TelaAlteracaoLogin';
import TelaCadastro from './screens/TelaCadastro';
import TelaAlerta from './screens/TelaAlerta';
import TelaModerador from './screens/TelaModerador';
import TelaConfiguracoes from './screens/TelaConfiguracoes';
import TelaNotificacoes from './screens/TelaNotificacoes';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TelaLogin"> 
        <Stack.Screen name="TelaRecursos" component={TelaRecursos} />
        <Stack.Screen name="TelaRegistro" component={TelaRegistro} />
        <Stack.Screen name="TelaPerfil" component={TelaPerfil} />
        <Stack.Screen name="TelaRequisicoes" component={TelaRequisicoes} />
        <Stack.Screen name="TelaLogin" component={TelaLogin} />
        <Stack.Screen name="TelaPerfilEstagiario" component={TelaPerfilEstagiario} />
        <Stack.Screen name="TelaCadastro" component={TelaCadastro}/>
        <Stack.Screen name="TelaAlteracaoLogin" component={TelaAlteracaoLogin}/>
        <Stack.Screen name="TelaAlerta" component={TelaAlerta}/>
        <Stack.Screen name="TelaModerador" component={TelaModerador}/>
        <Stack.Screen name="TelaConfiguracoes" component={TelaConfiguracoes}/>
        <Stack.Screen name="TelaNotificacoes" component={TelaNotificacoes}/>
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}