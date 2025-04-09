import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TelaRecursos from './screens/TelaRecursos';
import TelaEstagiarios from './screens/TelaEstagiarios';
import TelaPerfil from './screens/TelaPerfil'
import TelaRequisicoes from './screens/TelaRequisicoes'



const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="TelaRecursos" component={TelaRecursos} />
        <Stack.Screen name="TelaEstagiarios" component={TelaEstagiarios} />
        <Stack.Screen name="TelaPerfil" component={TelaPerfil} />
        <Stack.Screen name="TelaRequisicoes" component={TelaRequisicoes} />
       
      </Stack.Navigator>
    </NavigationContainer>
  );
}