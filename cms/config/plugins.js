module.exports = {
    "rest-cache": {
        config: {
            provider: {
                name: "memory",
            },
            strategy: {
                enableEtagSupport: true,
                logs: true,
                clearRelatedCache: true,
                maxAge: 3600000,
                contentTypes: [
                    // list of Content-Types UID to cache
                    "api::cta-start-quiz.cta-start-quiz",
                    "api::productpage.productpage",
                    "api::review.review",
                ],
            },
        },
    },
};
