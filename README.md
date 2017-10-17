

## Ionic2 Todoapplication with offlinemode using pouchdb and couchdb


I have used couchdb as remotedb and pouchdb is local db.When the app starts it's check for pouchdb it's not there then it will create pouchdb and get the data from couchdb.If pouchdb is already there then it's get data from pouchdb.It's automatically sync to couchdb.


<div>
<img  src="https://user-images.githubusercontent.com/15616596/31644242-dba90f1c-b312-11e7-8be6-b5638a4f0eaa.png" width="250">

<img  src="https://user-images.githubusercontent.com/15616596/31644245-de77050a-b312-11e7-85e2-5f0c5ab2f98f.png" width="250">

<img  src="https://user-images.githubusercontent.com/15616596/31644248-e11e6c62-b312-11e7-9c8b-b2814b5062c8.png" width="250">
</div>

### Installation:

After clone this repository

```bash
cd ionic2-pouchdb-Todoapp
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



