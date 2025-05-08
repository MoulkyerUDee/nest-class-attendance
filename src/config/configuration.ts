export default () => ({
    jwt: {
        secret: process.env.JWT_SECRET
    },
    port: parseInt(String(process.env.PORT), 10) || 3000
});