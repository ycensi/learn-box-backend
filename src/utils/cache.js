// const redis = require('redis');
// const bluebird = require('bluebird');
// const config = require('../config');
// bluebird.promisifyAll(redis);

// export default class {

//   constructor() {

//     this.client = redis.createClient(config.redis);
//     //Incase any error pops up, log it



//     this.client.on("error", function (err) {
//       console.log("Error " + err);
//     });

//   }

//   async invalidateCache(model, id, field) {
//     if (!id) {
//       return null;
//     }
//     let key = this.genCacheKeyWithModel(model, id); // generate id with tableName and id
//     let result = null;

//     if (field) {
//       result = await this.client.(key, field);
//     } else {
//       result = await this.client.hgetallAsync(key);
//     }

//   };

//   async proxyGetDBRecord(model, id, field) {
//     if (!id) {
//       return null;
//     }
//     let key = this.genCacheKeyWithModel(model, id); // generate id with tableName and id
//     let result = null;

//     if (field) {
//       result = await this.client.hgetAsync(key, field);
//     } else {
//       result = await this.client.hgetallAsync(key);
//     }

//     if (result === null) {
//       let fields = model.getCacheFields();

//       if (field && fields.indexOf(field) === -1) {
//         fields.push(field);
//       }
//       let data = await model.findOne({
//         where: {
//           id: id
//         },
//         attributes: fields,
//         raw: true
//       });
//       if (data) {
//         await this.client.hmsetAsync(key, data);
//         await this.expireAsync(key, config.redis.expireTime);
//         result = field ? data[field] : data;
//       }
//     }
//     return result;
//   }

//   genCacheKeyWithModel(model, id) {
//     return `${model.name}:${id}`;
//   }

// }