

## Ionic2 Todoapplication with offlinemode using pouchdb and couchdb


I have used couchdb as remotedb and pouchdb is local db.When the app starts it's check for pouchdb it's not there then it will create pouchdb and get the data from couchdb.If pouchdb is already there then it's get data from pouchdb.It's automatically sync to couchdb.


### Installation:

After clone this repository

```bash
$ sudo npm install -g ionic cordova
```

Then, to run it

```bash

In the  Browser
$ionic lab


For Android Platform 
$ cordova platform add android
$cordova run android

For Ios platform 
$  cordova platform add ios
$  cordova run ios
```



