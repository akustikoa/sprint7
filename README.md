# Star Wars

# Descripció

Aquest projecte és una aplicació web feta amb Angualr 18 que permet explorar un llistat de naus especials de l'unives Star Wars gràcies a l'API (swapi.dev).
L'aplicació permet gestionar usuaris, on només els que s'han registrtat previament poden veure el llistat de naus i el detall de cada una gràcies a un
sistema d'autenticació Json Web Tokens (JWT).

# Característiques

Exploració de Naus: Permet explorar informació detallada de diverses naus de Star Wars.
Autenticació d'usuaris: Login i Register d'usuaris.
Protecció de rutes: Navegació segura protegint rutes amb guards que necessiten autenticació.
Consum de dades API: Interacció amb l'API de Star Wars ([swapi.dev](https://swapi.dev/)) i ([starwars-visualguide.com](https://starwars-visualguide.com/)) per a les imatges.

# Tecnologies Utilitzades

- TypeScript
- HTML5
- SCSS
- [Angular](https://angular.dev/installation) CLI version 18.1.2

# Requisits

- Node.js i npm instal.lats al teu sistema. Pots trovar-los a [nodejs.org](https://nodejs.org/en).
- Angular CLI instal.lat globalment. Pots instal.lar-lo amb el següent codi:

npm install -g @angular/cli

# Instal.lació

1. Clona el repositori:

   git clone https://github.com/akustikoa/sprint7.git

2. Entre al directori del projecte:

   cd starwars

3. Instal.la las dependències:

   npm install

4. Executa el servidor de backend (JSON-SERVER):

   npx json-server-auth db.json

5. Executa l'apliació Angular

   ng serve -o
