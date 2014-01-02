#code-connect-server
This project is the server-end for [brackets-code-connect](https://github.com/tjwudi/brackets-code-connect) (an extension for [adobe/brackets](https://github.com/adobe/brackets)).  
Built with love and javascript. :)  

#Installation
You can install by running:
```
$ npm install -g code-connect-server
```
If any error occurs, you may have to use `sudo` to run the command.

#Usage
You can start the server by running:
```
$ code-connect-server
```
Server will start and create a websocket listening on local port 6006.  
Run `$code-connect-server --help` for more commandline options.


#Testing
Before running tests, you should start the server first.  
You can run test by running:
```
$ npm test
```

#Troubleshooting
If any errors encountered, please check first whether you are using the latest version of brackets-code-connect and the code-connect-server.  
You may have interest to hack into the source code, find the problem and fix it. Don't forget to send us your great pull request.  
You are welcomed to write an issue for the problem you encountered. We will check it as soon as possible and give you response, help you fix it.  

#Contributing
Every pull request will be highly appreciated.  
For fixing bugs, refactoring, adding test cases, you can send an pull request directly or just open an issue. For new feature request, it would be nice if you can open an issue first and have it discussed.  