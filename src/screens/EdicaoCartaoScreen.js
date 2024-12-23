// Importações necessárias do React, React Native e bibliotecas auxiliares
import React, { useContext, useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Biblioteca para dropdowns
import CartoesEstudoContext from '../contexts/CartoesEstudoContext'; // Contexto de cartões
import DateTimePickerModal from 'react-native-modal-datetime-picker'; // Biblioteca para seleção de datas
import { MaterialIcons } from 'react-native-vector-icons'; // Biblioteca de ícones

/**
 * Tela para criar ou editar cartões de estudo.
 * - É usada tanto para criar novos cartões quanto para editar existentes, dependendo da rota.
 */
const EdicaoCartaoScreen = ({ route, navigation }) => {
    // Obtém o ID do cartão da rota, caso seja edição
    const { id } = route.params || {};

    // Pega os métodos e dados do contexto
    const { cartoes, adicionarCartao, atualizarCartao } = useContext(CartoesEstudoContext);

    // Encontra o cartão no estado global (caso seja edição)
    const cartao = cartoes.find(c => c.id === id) || {};

    // Estados para os campos do formulário
    const [titulo, setTitulo] = useState(cartao.titulo || '');
    const [notas, setNotas] = useState(cartao.notas || '');
    const [status, setStatus] = useState(cartao.status || 'backlog'); // Status inicial padrão: "backlog"
    const [dataTermino, setDataTermino] = useState(cartao.dataTermino ? new Date(cartao.dataTermino) : new Date());
    const [mostraDataPicker, setMostraDataPicker] = useState(false); // Controle para exibir o modal de seleção de data

    /**
     * Atualiza os estados com os valores do cartão ao entrar na tela de edição.
     */
    useEffect(() => {
        if (id) {
            setTitulo(cartao.titulo);
            setNotas(cartao.notas);
            setStatus(cartao.status);
            setDataTermino(new Date(cartao.dataTermino));
        }
    }, [id, cartao]);

    /**
     * Salva os dados do cartão no Firestore.
     * - Chama `adicionarCartao` ou `atualizarCartao` dependendo se o cartão é novo ou existente.
     */
    const salvar = () => {
        const dadosCartao = {
            titulo,
            notas,
            status,
            dataTermino: dataTermino.toISOString() // Salva a data em formato ISO
        };
        if (id) {
            atualizarCartao(id, dadosCartao);
        } else {
            adicionarCartao(dadosCartao);
        }
        navigation.goBack(); // Retorna para a tela anterior
    };

    /**
     * Funções auxiliares para manipular o DateTimePicker.
     */
    const exibirDataPicker = () => setMostraDataPicker(true);
    const ocultarDataPicker = () => setMostraDataPicker(false);
    const confirmarData = (data) => {
        setDataTermino(data);
        ocultarDataPicker();
    };

    return (
        <View style={styles.container}>
            {/* Campo de Título */}
            <Text style={styles.label}>Título:</Text>
            <TextInput
                style={styles.input}
                value={titulo}
                onChangeText={setTitulo}
                placeholder="Título do Cartão..."
            />

            {/* Campo de Notas */}
            <Text style={styles.label}>Notas:</Text>
            <TextInput
                style={styles.input}
                value={notas}
                onChangeText={setNotas}
                placeholder="Insira uma descrição..."
                multiline
            />

            {/* Campo de Data de Término */}
            <Text style={styles.label}>Data de Término:</Text>
            <TouchableOpacity style={styles.button} onPress={exibirDataPicker}>
                <MaterialIcons name="date-range" size={20} color="#ffffff" />
                <Text style={styles.buttonText}>Escolher Data</Text>
            </TouchableOpacity>
            <DateTimePickerModal
                isVisible={mostraDataPicker}
                mode="datetime"
                onConfirm={confirmarData}
                onCancel={ocultarDataPicker}
            />
            <Text style={styles.selectedDateLabel}>
                Data selecionada: {dataTermino.toLocaleDateString()}
            </Text>

            {/* Campo de Status */}
            <Text style={styles.label}>Status:</Text>
            <Picker
                selectedValue={status}
                style={styles.input}
                onValueChange={(itemValue) => setStatus(itemValue)}
            >
                <Picker.Item label="Backlog" value="backlog" />
                <Picker.Item label="Em Progresso" value="in_progress" />
                <Picker.Item label="Concluído" value="done" />
            </Picker>

            {/* Botão Salvar */}
            <TouchableOpacity style={styles.saveButton} onPress={salvar}>
                <MaterialIcons name="save" size={20} color="#ffffff" />
                <Text style={styles.buttonText}>Salvar</Text>
            </TouchableOpacity>
        </View>
    );
};

// Estilização da tela
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f7f7f7',
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    input: {
        borderColor: '#ddd',
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: 8,
        fontSize: 16,
        marginBottom: 20,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 8,
    },
    saveButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#32cd32',
        padding: 10,
        borderRadius: 8,
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        marginLeft: 8,
    },
    selectedDateLabel: {
        fontSize: 16,
        marginBottom: 15,
        color: '#555',
    },
});

export default EdicaoCartaoScreen;
