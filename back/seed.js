import fs from 'fs';
import mysql from 'mysql2';

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'nodejs-lol',
};

const connection = mysql.createConnection(dbConfig);

const championsData = JSON.parse(fs.readFileSync('champions.json', 'utf8'));

async function insertChampions() {
  try {
    const insertPromises = championsData.map(champion => {
      const updatedAt = new Date();
      return connection.promise().execute('INSERT INTO champion (name, type, updatedAt) VALUES (?, ?, ?)', [
        champion.name,
        champion.type,
        updatedAt
      ]);
    });

    await Promise.all(insertPromises);
    console.log('Champions insérés avec succès dans la base de données.');
  } catch (error) {
    console.error('Erreur lors de l\'insertion des champions :', error);
  } finally {
    connection.end();
  }
}

insertChampions();