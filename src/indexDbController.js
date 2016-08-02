


function openDatabase() {
  
  if (!navigator.serviceWorker) {
    return Promise.resolve();
  }

  return idb.open('assetStore',3, function(upgradeDb) {
    
    var store = upgradeDb.createObjectStore('assets', {
      keyPath: 'name'
    });  
  });
}

var _dbPromise = openDatabase();


var addData= function(data) { 

  this._dbPromise.then(function(db) {
    if (!db) return;
    var tx = db.transaction('assets', 'readwrite');
    var store = tx.objectStore('assets');
    data.forEach(function(asset) {
      store.put(asset);
    });
  });
  
}

var getIDBData = function(){
  return this._dbPromise.then(function(db) {   
    if (!db) return;

    var assetList = db.transaction('assets')
      .objectStore('assets');
    return assetList.getAll()
  });
}
