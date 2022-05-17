# Covid Stats EU Server

The backend of Covid Stats EU web app. For more information about the app see [here](https://github.com/covid-stats-eu/covid-stats-eu-client)

## Architecture

![Covid stats ERD](https://user-images.githubusercontent.com/44473195/111869762-8207b480-8989-11eb-8048-ef2803c7e9de.png)

*Covid Stats EU entity relationship diagram - made with [lucid](https://lucid.app)*

![Covid stats ERD](https://user-images.githubusercontent.com/44473195/111869779-98ae0b80-8989-11eb-9212-a4777201750e.png)


*Covid Stats EU database schema - made with [lucid](https://lucid.app)*


## Installation for development

Make sure you have nodejs v15 and up and mariadb installed on your machine.

Clone the repository.

```bash
git clone https://github.com/dimpram/covid-stats-eu.git
```

Cd into the cloned repository and select the build folder.

```bash
cd covid-status-eu/build
```

Login to your mariadb and source the files in that directory

```sql
source database.sql
source country.sql
source activity.sql
```

Create `config/credentials.js` and add your mariadb credentials like this:

```js
const credentials = {
    db: {
      host: 'your host',
      user: 'your username',
      password: 'your password',
      database: 'your database',
    },
  };
  
  module.exports = credentials;
```

Start node

```bash
npm run dev
```

## Authors

- [Alexandros Rigas](https://github.com/RigasAlex)
- [Dimitris Pramateftakis](https://github.com/dimpram)
