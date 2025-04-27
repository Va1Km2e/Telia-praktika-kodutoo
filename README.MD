
# Veebileht isikute nimekirja haldamiseks 
### Markus Vaikmäe

**Backend** on Spring Booti abil ja **frontend** React.js abil. Rakendus haldab isikute nimekirja ning võimaldab lisada, muuta ja kustutada isikute andmeid. Rakendus ühendub PostgreSQL andmebaasiga ja kasutab Liquibase'i andmebaasi migratsioonide jaoks.

## Eeltingimused

Veendu, et sul on järgmised tööriistad installitud:

- **Java 21**
- **Gradle**
- **PostgreSQL**
- **Node.js ja npm/yarn**
- **Vite**

## Rakenduse struktuur

- **Backend**: Spring Boot rakendus, millel on andmebaasi ühendus PostgreSQL-iga.
- **Frontend**: React.js rakendus, mis suhtleb backend'iga API kaudu.

## Ehitamine ja käivitamine

### 1. **Backend (Spring Boot)**

#### a. **Konfiguratsioon**

1. **Andmebaasi ühendus**: Veendu, et sul on PostgreSQL server käivitatud ja saad sellele ühenduda. **backend/src/main/resources/application.properties** failis on järgmine konfiguratsioon:

   ```properties
   spring.application.name=backend
   spring.datasource.url=jdbc:postgresql://localhost:5432/postgres
   spring.datasource.username= <TEIE_KASUTAJA>
   spring.datasource.password= <TEIE_PAROOL>
   spring.datasource.driver-class-name=org.postgresql.Driver
   spring.jpa.hibernate.ddl-auto=update
   spring.liquibase.change-log=classpath:/db/changelog/changelog-master.xml
   ```

   **Märkus**: Asenda `<TEIE_KASUTAJA>` ja `<TEIE_PAROOL>` oma PostgreSQL andmebaasi kasutajanime ja parooliga.

#### b. **Rakenduse käivitamine**

1. **Backend-i Ehitamine ja käivitamine**:
    Ava terminal kaustas Backend

    - **Ehitamine**:

      ```bash
      cd frontend
      ./gradlew build
      ```

    - **Käivitamine**:

      ```bash
      java -jar build/libs/backend-0.0.1-SNAPSHOT.jar
      ```

#### c. **Testimine**

Kui rakendus on käivitatud, peaksid saama jälgida logisid ja veenduda, et rakendus on edukalt PostgreSQL andmebaasiga ühendatud.

### 2. **Frontend'i käivitamine (React.js)**

1. **Projekti allalaadimine ja sõltuvuste paigaldamine**:

   Mine frontend kausta ja paigalda kõik vajalikud sõltuvused:

   ```bash
   cd frontend
   npm install
   ```

2. **Rakenduse käivitamine**:

   Kui kõik sõltuvused on paigaldatud, saad React.js rakenduse käivitada järgmise käsuga:

   ```bash
   npm run dev
   ```

   React.js rakendus käivitub portil `http://localhost:5173`.

### 3. **PostgreSQL andmebaasi seadistamine**

Kui sul pole veel PostgreSQL serverit käivitatud, siis saad järgmistel sammudel luua uue PostgreSQL andmebaasi:

1. **PostgreSQL installimine**: Installi PostgreSQL oma süsteemi. Täiendavad juhised leiad [PostgreSQL ametlikust dokumentatsioonist](https://www.postgresql.org/download/).

2. **Andmebaasi loomine**: Loo PostgreSQL-is uus andmebaas ja kasutaja.

    - PostgreSQL käsurealt:

      ```bash
      psql -U postgres
      CREATE DATABASE postgres;
      CREATE USER <TEIE_KASUTAJA> WITH PASSWORD '<TEIE_PAROOL>';
      GRANT ALL PRIVILEGES ON DATABASE postgres TO <TEIE_KASUTAJA>;
      ```

3. **Kontrollige, et andmebaas on ühendatud**: Veendu, et Spring Boot'i rakendus saab PostgreSQL-iga ühendust luua.

### 5. **Veaparandamine**

Kui tekib probleeme, siis kontrollige järgmisi asju:

- **Logid**: Spring Booti logides peaks olema kasulik teave, kui midagi on valesti.
- **Andmebaasi ühendus**: Kui rakendus ei saa PostgreSQL-iga ühendust, veendu, et andmebaasi server töötab ja et konfiguratsioon on õige.

## Lehe kasutamine

Kui rakendus on edukalt üles ehitatud ja käivitatud, saad seda hakata kasutama järgmiste sammudega:

1. **Lehe avamine**: Ava oma brauser ja mine aadressile [http://localhost:5173](http://localhost:5173), et pääseda ligi frontend rakendusele.


   Isikute nimekirja vaatamiseks saad valida kas esilehelt rohelise nupu **People List**, või navigeerida ülevalt lehelt **People List** lingile.


2. **Isiku lisamine**: Isiku lisamiseks tuleb vajutada **Add person** nuppu. Lehelt avaneb vorm, kus saad täita järgmised andmed:
    - **Nimi**
    - **E-mail**
    - **Telefoninumber**
    - **Sünnipäev**


3. **Sorteerimine**: **Actions** tulbas leiab **Sorteerimisvalikud** ja **Valikusuuna**. Sorteerida saab järgmiste andmete järgi:
    - **Nimi**
    - **E-mail**
    - **Telefoninumber**

   Sorteerimise aktiveerimiseks tuleb vajutada **Apply filters** nuppu.


4. **Filtreerimine**: Isikute nimekirja saab filtreerida nii nime kui ka e-maili järgi. Kirjuta vastavatesse väljadele ning vajuta **Apply filters**, et filtreerimist teostada.


6. **Isiku kustutamine**: Isiku kustutamiseks vali nimekirjast vastav isik ja vajuta **kustutamisnuppu** tema kohta **Actions** tulbas.


7. **Isiku andmete muutmine**: Kui soovid muuta isiku andmeid, vajuta **Actions** tulbas oleva **Edit** nupu peale. See muudab isiku andmeväljad muudetavateks. Muutuste salvestamiseks vajuta **Save** nuppu.


8. **Isiku andmete kopeerimine**: Kui soovid isiku andmeid JSON formaadis kiiresti kopeerida, vajuta **Actions** tulbas oleva rohelise **Copy** nupu peale. See kopeerib andmed automaatselt sinu lõikepuldile.
