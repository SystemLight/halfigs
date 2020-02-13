module.exports = function (api) {
    api.cache(true);

    const presets = [
        [
            "@babel/env",
            {
                targets: {
                    node: "8"
                },
                modules: false
            },
        ]
    ];
    const plugins = [];

    return {
        presets,
        plugins
    };
};