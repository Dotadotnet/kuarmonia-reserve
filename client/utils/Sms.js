
class Sms {
    api_path = '/api/send/shared/ad52a4e8241545e6aeacc4f774308f90';
    phone = null;
    constructor(phone) {
        this.phone = phone;
    }
    send(args, phone, bodyId) {
        const https = require('https');
        let args_result = [];
        args.forEach(arg => {
            args_result.push(arg.toString())
        });
        const data = JSON.stringify({
            'bodyId': parseInt(bodyId),
            'to': phone.toString(),
            'args': args_result
        });
        const options = {
            hostname: 'console.melipayamak.com',
            port: 443,
            path: this.api_path,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': data.length
            }
        };
        const req = https.request(options, res => {
            console.log('statusCode: ' + res.statusCode);
            res.on('data', d => {
                process.stdout.write(d)
            });
        });
        req.on('error', error => {
            console.error(error);
        });
        req.write(data);
        req.end();
    }

    verifyCode(args) {
        this.send(args, this.phone, 295493)
    }


}

export default Sms;
