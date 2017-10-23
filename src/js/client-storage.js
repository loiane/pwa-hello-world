// @ts-check

export default class ClientStorage {
  constructor() {
    this.usersCache = localforage.createInstance({
      name: 'users'
    });
  }

  addUsers(newUsers, page, limit) {
    const me = this;
    return new Promise(function(resolve, reject) {
      me.usersCache.setItems(me.keyValueSetup(newUsers, page, limit)).then(function() {
        resolve();
      });
    });
  }

  keyValueSetup(newUsers, page, limit) {
    let count = 1;
    return newUsers.map(user => {
      user.userId = count + ((page-1) * limit);
      count++;
      return {
        key: user.userId,
        value: user
      }
    });
  }

  getUsers(page, limit){
    const me = this;
    return new Promise(function(resolve, reject){
      me.usersCache.keys().then(function(keys){
            if(keys.length ==  0){ resolve([]); return; }
            if(keys.length <=  (page - 1) * limit){ resolve([]); return; }
            const keysResult = keys.splice((page - 1) * limit, limit);
            me.usersCache.getItems(keysResult).then(function(results){
                var returnArr = Object.keys(results).map(function(k) { return results[k] });
                resolve(returnArr);
            });
        });
    });
  }

  getUser(userId) {
    const me = this;
    return new Promise(function(resolve, reject){
      me.usersCache.keys().then(function(keys){
        if(keys.length ==  0){ resolve([]); return; }
        const keysResult = keys.splice(userId - 1, 1);
        me.usersCache.getItems(keysResult).then(function(results){
            var returnArr = Object.keys(results).map(function(k) { return results[k] });
            resolve(returnArr[0]);
        });
     });
    });
  }
}
