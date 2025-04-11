import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const dadosEstagiario = [
    {
        id: '1',
        nome: 'João Silva',
        cargaHoraria: '20h semanais',
        extras: {
            dia: '1h',
            semana: '3h',
            mes: '10h',
        },
        faltas: {
            dia: '0h',
            semana: '1h',
            mes: '4h',
        },
        entradasSaidas: [
            { dia: '01/04', entrada: '08:00', saida: '12:00' },
            { dia: '02/04', entrada: '08:15', saida: '12:00' },
        ],
        historicoAlteracoes: [
            'Solicitou correção em 03/04: entrada alterada de 08:45 para 08:00',
        ],
        prevista: '80h',
        realizada: '86h',
        ultrapassouLimite: true,
    },
    // Adicione mais estagiários se quiser
];

export default function TelaDetalhesEstagiario() {
    const navigation = useNavigation();

    const renderEstagiario = ({ item }) => (
        <View style={styles.card}>
            <Text style={styles.nome}>{item.nome}</Text>
            <Text>Carga horária: {item.cargaHoraria}</Text>
            <Text>Horas extras (dia/semana/mês): {item.extras.dia} / {item.extras.semana} / {item.extras.mes}</Text>
            <Text>Horas faltantes (dia/semana/mês): {item.faltas.dia} / {item.faltas.semana} / {item.faltas.mes}</Text>
            <Text style={styles.subtitulo}>Relatório de entrada/saída:</Text>
            {item.entradasSaidas.map((log, index) => (
                <Text key={index}>{log.dia}: {log.entrada} às {log.saida}</Text>
            ))}
            <Text style={styles.subtitulo}>Histórico de alterações:</Text>
            {item.historicoAlteracoes.map((alteracao, index) => (
                <Text key={index}>- {alteracao}</Text>
            ))}
            <Text>Prevista/Realizada: {item.prevista} / {item.realizada}</Text>
            {item.ultrapassouLimite && <Text style={styles.aviso}>Ultrapassou limite permitido!</Text>}
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Detalhes dos Estagiários</Text>
            <FlatList
                data={dadosEstagiario}
                keyExtractor={(item) => item.id}
                renderItem={renderEstagiario}
            />
            <TouchableOpacity style={styles.botaoVoltar} onPress={() => navigation.goBack()}>
                <Text style={styles.botaoTexto}>Voltar</Text>
            </TouchableOpacity>
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
