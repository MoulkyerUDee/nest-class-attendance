export default () => ({
    port: parseInt(String(process.env.PORT), 10) || 3000,
    database:  {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 3306,
        username: process.env.DB_USER || '',
        pass: process.env.DB_PASS || ''
    }
});