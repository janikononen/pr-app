#PR-frontend
Projektin tarkoituksena ja tavoitteena oli luoda käyttöliittymä back-endille jonka avulla voidaan muokata tietokannan tilaa crud-toiminnoilla, sekä näyttää käyttäjälle dataa taulukoiden, kalenterin ja graafin muodossa.

## Käytetyt kirjastot ja niiden käyttötarkoitukset
Tässä projektissa käytettiin useita kirjastoja React-sovelluksen rakentamiseen, kalenteritoiminnallisuuteen, käyttöliittymän suunnitteluun ja datan käsittelyyn:

### 📊 MUI (Material UI)
- **Kirjastot:** `@mui/material`, `@mui/icons-material`, `@mui/x-data-grid`, `@mui/x-date-pickers`, `@mui/x-charts`
- **Tarkoitus:** Käyttöliittymäkomponentit ja -tyylit, kuten taulukot, kuvakkeet, päivämäärävalitsimet ja kaaviot. Tarjoaa modernin ja yhtenäisen ulkoasun. Käytin tätä kaikissa paitsi kalenterissa.

### 📅 FullCalendar
- **Tarkoitus:** Kalenterin näyttäminen ja tapahtumien hallinta. FullCalendar mahdollistaa kuukausi- ja viikkonäkymät sekä tapahtumien raahaamisen ja valitsemisen.

### 🧩 Lodash
- **Tarkoitus:** Apuohjelmat taulukoiden, objektien ja muiden tietorakenteiden käsittelyyn, kuten ryhmittelyyn tai lajitteluun.

### 🕒 Day.js
- **Tarkoitus:** Kevyt ja nopea päivämäärien käsittelykirjasto, käytetty esimerkiksi tapahtumien aikojen muotoiluun ja vertailuun.

### 📄 React CSV
- **Tarkoitus:** Mahdollistaa datan lataamisen CSV-muodossa suoraan käyttöliittymästä.

### ⚙️ Vite + TypeScript

