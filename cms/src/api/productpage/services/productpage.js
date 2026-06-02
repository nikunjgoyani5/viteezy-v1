'use strict';

/**
 * productpage service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::productpage.productpage');
