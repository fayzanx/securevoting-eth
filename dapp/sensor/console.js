/*
var obj = JSON.parse("zaidFPtemplate.json").then(async response => {
      try {
       const data = await response.json()
       console.log('response data?', data)
     } catch(error) {
       console.log('Error happened here!')
       console.error(error)
     }
    });*/
var obj;   
fetch("zaidFPtemplate.json").then(response => {
   return response.json();
})
.then(data => obj=data).then(obj => console.log(obj));

(function() {
  'use strict';

  hterm.defaultStorage = new lib.Storage.Local();

  var port;

  let textEncoder = new TextEncoder();

  let t = new hterm.Terminal();
  t.onTerminalReady = () => {
    console.log('Terminal ready.');
    let io = t.io.push();

    io.onVTKeystroke = str => {
      if (port !== undefined) {
        port.send(textEncoder.encode(str)).catch(error => {
          t.io.println('Send error: ' + error);
        });
      }
    };

    io.sendString = str => {
      if (port !== undefined) {
        port.send(textEncoder.encode(str)).catch(error => {
          t.io.println('Send error: ' + error);
        });
      }
    };
  };

  document.addEventListener('DOMContentLoaded', event => {
    let connectButton = document.querySelector('#connect');

    t.decorate(document.querySelector('#terminal'));
    t.setWidth(80);
    t.setHeight(24);
    t.installKeyboard();

    function connect() {
      t.io.println('Connecting to ' + port.device_.productName + '...');
      port.connect().then(() => {
        console.log(port);
        t.io.println('Connected.');
        connectButton.textContent = 'Disconnect';
        port.onReceive = data => {
          let textDecoder = new TextDecoder();
          t.io.print(textDecoder.decode(data));
          console.log(textDecoder.decode(data));
        }
        port.onReceiveError = error => {
          t.io.println('Receive error: ' + error);
        };
      }, error => {
        t.io.println('Connection error: ' + error);
      });
    };
    
    function verify(){
    t.io.println('Sending Template array');
    var i;
    var num = new Uint8Array(1);
    	port.send(textEncoder.encode('i')).catch(error => {t.io.println('Send error: ' + error)});
    	//port.send(textEncoder.encode('test2 \0')).catch(error => {t.io.println('Send error: ' + error)});
	for (i = 0; i < 512; i++) {
	num[0] = parseInt(obj.RightFinger[i]);
    		port.send(num).catch(error => {
          t.io.println('Send error: ' + error);
        });
         //port.send(textEncoder.encode(","));
        //console.log(obj.Template[i]);
        //console.log(',');
      	}
    };
    document.querySelector('#verify').addEventListener('click', verify);
  
  
    connectButton.addEventListener('click', function() {
      if (port) {
        port.disconnect();
        connectButton.textContent = 'Connect';
        port = null;
      } else {
        serial.requestPort().then(selectedPort => {
          port = selectedPort;
          connect();
        }).catch(error => {
          t.io.println('Connection error: ' + error);
        });
      }
    });

    serial.getPorts().then(ports => {
      if (ports.length == 0) {
        t.io.println('No devices found.');
      } else {
        port = ports[0];
        connect();
      }
    });
  });
})();
