// @ts-check
import { appendCards } from './template.js';
import { getDetailsTemplate } from './details-template.js';
import ClientStorage from './client-storage';

export default class UserService {
  constructor() {
    this.page = 0;
    this.resultsQtd = 6;
    // this.cache = [];
    this.clientStorage = new ClientStorage();
  }

  getUrlRequest() {
    return `https://randomuser.me/api/?page=${this.page}&results=${this
      .resultsQtd}&seed=abc`;
  }

  loadMoreRequest() {
    const me = this;
    me.fechData().then(function(status) {
      document.getElementById('connection-status').innerHTML = status;
      me.loadMore();
    });
  }

  fechData() {
    const me = this;
    me.page++;
    return new Promise(function(resolve, reject) {
      fetch(me.getUrlRequest())
        .then(function(response) {
          return response.json();
        })
        .then(function(data) {
          // console.log(data);
          //  me.cache = data.results;
          me.clientStorage
            .addUsers(data.results, me.page, me.resultsQtd).then(function() {
              // appendCards(data.results);
              // me.loadMore();
              data.results.forEach(me.preCacheUserDetails);
              resolve('The connection is OK, showing results from server');
            });
        })
        .catch(function(e) {
          resolve('No connection, showing offline results');
        });
      setTimeout(function() {
        resolve('Bad connection, showing offline results');
      }, 3000);
    });
  }

  loadMore() {
    this.clientStorage
      .getUsers(this.page, this.resultsQtd)
      .then(users => appendCards(users));
  }

  // getUserFromMemoryCache(userId) {
  // if (this.cache) {
  //   return this.cache.filter(user => user.id.value === userId);
  // }
  // return this.clientStorage.getUser(userId);
  // }

  loadUserPage(userId) {
    // console.log(this.cache);
    /*const results = this.getUserFromMemoryCache(userId);
    if (results && results.length > 0) {
      document.body.insertAdjacentHTML(
        'beforeend',
        getDetailsTemplate(results[0])
      );
    }*/
    this.clientStorage.getUser(userId).then(function(data) {
      if (data)
        document.body.insertAdjacentHTML('beforeend', getDetailsTemplate(data));
    });
  }

  preCacheUserDetails(user) {
    /*if ('serviceWorker' in navigator) {
        var userImg = user.picture.large;
        window.caches.open('userImgCacheV1').then(function(cache) {
            cache.match(userImg).then(function(response){
                const corsRequest = new Request(userImg, {mode: 'cors'});
                fetch(corsRequest).then(response => { console.log(response); if(!response) cache.add(userImg) });
                // if(!response) cache.add(userImg);
            })
        });
    }*/
  }
}
