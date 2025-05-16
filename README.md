# Projeto Registro de Ponto (lado administrador) 

## Sumário:
- Sobre o Projeto
- Funcionalidades
- Tecnologias Utilizadas
- Como Rodar o Projeto
- Estrutura do Projeto
- Telas do Sistema (ou protótipos)
- API / Integração com Banco de Dados
- Contribuição
- Licença

## 📌Sobre o projeto
Este projeto tem como objetivo fornecer uma interface para administradores de escritórios visualizarem e 
gerenciarem o registro de ponto dos estagiários. 
Ele permite o acompanhamento da carga horária, horas extras, faltas, histórico de alterações, entre outras funcionalidades.

## ⚙️Funcionalidades
- Visualização da lista de estagiários
- Consulta de carga horária diária, semanal e mensal
- Visualização de horas extras e horas faltantes
- Histórico de alterações feitas nos pontos
- Relatórios de entrada e saída
- Alerta de carga horária excedida
- Aprovação/rejeição de solicitações de alteração de ponto
- 
### 💻Tecnologias utilizadas:
- Front-end: React Native / Expo 
- Back-end: Node.js 
- Banco de Dados: Firebase

### 🚀 Como Rodar o Projeto

#### 🧰 Pré-requisitos

Antes de começar, você vai precisar ter instalado:

- [Node.js](https://nodejs.org/en/download)
- Conta no [Firebase](https://firebase.google.com/?hl=pt) com projeto configurado
- [Visual Studio Code](https://code.visualstudio.com/download)
- [Git](https://git-scm.com/downloads) para clonar
- [Android Studio](https://developer.android.com/studio?hl=pt-br) para emular no próprio computador (Encontramos muita instabilidade mas é uma opção)
- Expo go para emular no celular 
- Expo CLI:  
  ```bash
  npm install -g expo-cli

Veja todas as dependências atualizadas no [package.json](https://github.com/rafaeleites/T197_N24CD_Rafael_Leites/blob/main/projeto_devmoveis/package-lock.json) em "dependencies".

- Para rodar o projeto:
- 
  ```bash
    git clone https://github.com/rafaeleites/T197_N24CD_Rafael_Leites.git
    npx expo start
![image](https://github.com/user-attachments/assets/7ccb43a1-625f-412d-b7ba-c589b2189759)

Pressione "a" para emular no android studio se for o caso, ou scanear o QRcode pela câmera normal mesmo (Lembre-se de baixar o expo go).

## 📂 Estrutura do Projeto
![image](https://github.com/user-attachments/assets/a8b49f26-ad4a-41bb-9cf4-e1af1b19cef3)

Essa é a estrutura principal do projeto

## Tela principais e principais funcionalidades

![WhatsApp Image 2025-05-16 at 7 02 06 PM (2)](https://github.com/user-attachments/assets/054ab6d4-2599-491c-bbc8-0f2eaedfcfab)

Tela de moderador para alterar todos os dados dos estagiários
![WhatsApp Image 2025-05-16 at 7 02 06 PM (1)](https://github.com/user-attachments/assets/f555dd31-5111-4743-b21c-e9c7eaead961)

Tela de Registros dos estagiarios (histórico de pontos)
![WhatsApp Image 2025-05-16 at 7 02 06 PM](https://github.com/user-attachments/assets/c850c66c-7c71-44ba-958c-b03fd8a82402)






