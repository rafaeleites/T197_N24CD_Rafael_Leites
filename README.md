# Projeto Registro de Ponto (lado administrador) 

## Sumário:
- Sobre o Projeto
- Funcionalidades
- Tecnologias Utilizadas
- Como Rodar o Projeto
- Estrutura do Projeto
- Telas do Sistema 
- Integração com Banco de Dados

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
- Editar os dados dos estagiários
  
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

## Visão geral das telas



![Design sem nome (6)](https://github.com/user-attachments/assets/330b41de-bb97-4f52-9ddb-4c187d0d7193)




## 🗄️ Integração com Banco de Dados

O aplicativo está integrado ao Firebase, onde são armazenadas e gerenciadas diversas informações importantes para o funcionamento do sistema. Abaixo estão os principais dados manipulados:

- 📆 **Horários de ponto:** Registro de entrada e saída dos estagiários.
- 📝 **Justificativas:** Solicitações de alteração de ponto feitas pelos estagiários, com motivo e data.
- 👤 **Dados do administrador:** Informações de login e permissões dos administradores do sistema.
- 👨‍💼 **Informações dos estagiários:** Nome, carga horária prevista, horas extras, faltas e histórico de alterações.







