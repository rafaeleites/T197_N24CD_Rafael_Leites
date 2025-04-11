import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';


export default function TelaDetalhesEstagiario({ route }) {
    const { estagiario } = route.params;
  
    return (
      <View style={{ padding: 20 }}>
        <Text>Nome: {estagiario.nome}</Text>
        <Text>Carga Horária Prevista: {estagiario.cargaHorariaPrevista}</Text>
        <Text>Carga Realizada: {estagiario.cargaHorariaRealizada}</Text>
        <Text>Horas Extras (Semana): {estagiario.extras?.semana || 0}</Text>
        {/* Adicione o restante aqui */}
      </View>
    );
  }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: 'black',
    },
    titulo: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
        color: '#004AAD',
    },
    card: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 12,
        marginBottom: 20,
        elevation: 3,
    },
    nome: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 6,
    },
    subtitulo: {
        marginTop: 10,
        fontWeight: '600',
        color: '#333',
    },
    aviso: {
        marginTop: 10,
        color: 'red',
        fontWeight: 'bold',
    },
    botaoVoltar: {
        marginTop: 10,
        padding: 10,
        backgroundColor: '#004AAD',
        borderRadius: 8,
        alignItems: 'center',
    },
    botaoTexto: {
        color: '#fff',
        fontWeight: 'bold',
    }
});
