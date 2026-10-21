
const sql = require("mssql/msnodesqlv8");

const config = {
    server: "localhost\\SQLEXPRESS",
    database: "LojaDB",
    driver: "msnodesqlv8",
    options: {
        trustedConnection: true,
        trustServerCertificate: true
    },
    connectionString:
        "Driver={ODBC Driver 18 for SQL Server};" +
        "Server=localhost\\SQLEXPRESS;" +
        "Database=LojaDB;" +
        "Trusted_Connection=Yes;" +
        "TrustServerCertificate=Yes;"
};

const poolPromise = new sql.ConnectionPool(config).connect();

module.exports = { sql, poolPromise };
