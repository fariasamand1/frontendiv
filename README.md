#  Study-App
##### Este projeto é voltado para o desenvolvimento de um aplicativo de estudo, com o propósito de gerenciar os cartões de modo global. O App funcionará com um CRUD permitindo a criação, adição, atualização e exclusão de cartões. Além disso, permite o controle de vencimento de prazos de cada cartão.

# Bibliotecas utilizadas e suas ações
##### - @react-native-async-storage/async-storage : Faz um armazenado assíncrono local

##### - @react-native-modal-datetime-picker : Possibilita a seleção de data e hora como modal

##### - @react-navigation/native : Possibilita a base para navegação no React Native

##### - @react-navigation/native-stack : Possibilita a navegação em pilha com integração nativa

##### - firebase : Possibilita a configuração de servidor com acesso ao banco de dados 

##### - @react-navigation/stack : Implementação JavaScript para navegação em pilha (Stack Navigator).

##### - @react-native-dotenv : Bibliote que utilizada para privacidade dos dados no firebase


# Definições

### Da estrutura de pastas
##### - assets/: Armazena recursos estáticos que ficarão visíveis para o usuário
##### - Contexts/: Pasta utilizada para gerenciar dados ou estados globais
##### - src/: Pasta utilizada para armazenar o código fonte 
##### - config/: Pasta utilizada para classe de configuração em que se encontram as inicializações das bibliotecas
##### - screens/: Pasta utilizada para compnente de tela final do usuário

### Das funções
##### As funções servirão para colocar em prática o CRUD, possibilitando a criação, adição, atualização e exclusão de cartões. Todas as alterações integrerão com o banco de dados.



# Estruturação das pastas

### assets/

### src/ 

### src/ 
#### - config/
###### - firebaseConfig.js


## - context/
#### - Auth.Context.js
#### - CartoesEstudoContext.js


## - screens/
#### - EdicaoCartaoScreen.js
#### - ListaCartaoScreen.js
#### - LoginScreen.js
#### - RegistroScreen.js
#### - TarefasVencimentoProximoScreen.js




