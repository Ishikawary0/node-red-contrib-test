var request = require('request-promise');

module.exports = function(RED) {
    function AkitaShinkansenNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;
  
        node.on('input', function (msg) {
            request('https://transit.yahoo.co.jp/diainfo/6/0')
                .then(function (response) {
                    var bullet  = response;
                    var time    = response;
                    var trouble = response;

                    bullet  = bullet.split('<span class="icnNormalLarge">')[1];
                    bullet  = bullet.split('<dd class="normal">')[0];
                    bullet  = bullet.split('</span>')[1];
                    bullet  = bullet.split('</dt>')[0];
                    bullet  = bullet.split('\n').join('');

                    time    = time.split('<span class="subText">')[1];
                    time    = time.split('</span>')[0];
                    time    = time.split('<')[0];
                    time    = time.split('\n').join('');

                    trouble = trouble.split('<dd class="normal">')[1];
                    trouble = trouble.split('</p>')[0];
                    trouble = trouble.split('<p>')[1];

                    msg.payload = {
                        status: bullet,       
                        information: trouble, 
                        update: time                      
                    };
                    node.send(msg);

                })
                .catch(function (error) {
                        msg.payload = null;
                        node.send(msg);
                    });
        });
    }
    RED.nodes.registerType("akita-shinkansen",AkitaShinkansenNode);
}