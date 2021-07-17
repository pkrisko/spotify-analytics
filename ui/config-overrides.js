module.exports = function override(config, env) {
    console.log('setting dev server');
    config.devServer = {
        proxy: {
            'api': {
                target: 'localhost:3001',
                pathRewrite: { '^/api': '' },
            },
        }
    }
    return config;
};
