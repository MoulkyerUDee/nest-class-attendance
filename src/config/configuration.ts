export default () => ({
    port: parseInt(String(process.env.PORT), 10) || 3000
});