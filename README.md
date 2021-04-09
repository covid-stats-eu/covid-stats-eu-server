# Covid Stats EU

A web app that displays EU covid data in a pretty and practical way

[INSERT SCREENSHOT OF THE APP]

## What is it?

Covid Stats EU is a simple data analytics system for covid activity monitoring and it's part of a collaborative university assignment in Web technologies course. 

![Covid stats ERD](https://user-images.githubusercontent.com/44473195/111869762-8207b480-8989-11eb-8048-ef2803c7e9de.png)

*Covid Stats EU entity relationship diagram - made with [lucid](https://lucid.app)*

![Covid stats ERD](https://user-images.githubusercontent.com/44473195/111869779-98ae0b80-8989-11eb-9212-a4777201750e.png)


*Covid Stats EU database schema - made with [lucid](https://lucid.app)*


## Installation for development

*In the future there will be a docker version*

Make sure you have nodejs v15 and up and mariadb installed on your machine

Clone the repository 

```bash
git clone https://github.com/dimpram/covid-stats-eu.git
```

Cd into the cloned repository

```bash
cd covid-status-eu
```

Create `config/credentials.js' and add your mariadb credentials like this:

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
