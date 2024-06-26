const configDataBase = require("../config/dbConfig");
const mysql = require("mysql");
require("dotenv").config();

const username = "Clic974";
const password = "clic";
const databaseName = process.env.DB_NAME;

const db = mysql.createConnection(configDataBase.dbConfig);

const connectToDatabase = () => {
  return new Promise((resolve, reject) => {
    db.connect((err) => {
      if (err) {
        console.error("Erreur lors de la connexion à la base de données:", err);
        return reject(err);
      }
      console.log("Connexion à la base de donnée réussie 👍");
      resolve();
    });
  });
};

const createUser = (username, password) => {
  return new Promise((resolve, reject) => {
    const sql = `CREATE USER '${username}'@'localhost' IDENTIFIED BY '${password}'`;
    db.query(sql, (err, result) => {
      if (err) {
        console.error("Erreur lors de la création de l'utilisateur:", err);
        return reject(err);
      }
      console.log(`Utilisateur ${username} créé avec succès 👍`);
      resolve(result);
    });
  });
};

const grantPrivileges = (username, databaseName) => {
  return new Promise((resolve, reject) => {
    const sql = `GRANT ALL PRIVILEGES ON ${mysql.escapeId(
      databaseName
    )}.* TO '${username}'@'localhost'`;
    db.query(sql, (err, result) => {
      if (err) {
        console.error("Erreur lors de l'octroi des privilèges:", err);
        return reject(err);
      }
      console.log(
        `Tous les privilèges accordés à ${username} sur la base de données ${databaseName} 👍`
      );
      resolve(result);
    });
  });
};

const flushPrivileges = () => {
  return new Promise((resolve, reject) => {
    const sql = `FLUSH PRIVILEGES`;
    db.query(sql, (err, result) => {
      if (err) {
        console.error("Erreur lors de la mise à jour des privilèges:", err);
        return reject(err);
      }
      console.log(`Privilèges mis à jour avec succès 👍`);
      resolve(result);
    });
  });
};

const run = async (username, password, databaseName) => {
  try {
    await connectToDatabase();
    await createUser(username, password);
    await grantPrivileges(username, databaseName);
    await flushPrivileges();
  } catch (err) {
    console.error("Une erreur s'est produite:", err);
    process.exit(1); // Quitte le processus avec un code d'erreur
  } finally {
    db.end((err) => {
      if (err) {
        console.error("Erreur lors de la fermeture de la connexion:", err);
      } else {
        console.log("Connexion à la base de données fermée.");
      }
    });
  }
};

run(username, password, databaseName);
