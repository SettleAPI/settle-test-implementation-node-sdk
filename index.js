// const settle = require('settle-sdk-node');
const { handler, merchant } = require('settle-sdk-node')
const express = require( 'express' );
const app = express();
const ngrok = require('ngrok');
// const merchant = settle.merchant;
const dateTime = Date.now();


app.use(handler('production'))

app.post( '/', ( req, res, next ) => {
    console.log( 'Settle says:\n%s', req.body );
    res.sendStatus( 200 );
});

app.listen( 9000, () => console.log( 'Node.js server started on port 9000.' ) );

(async function() {
    let callbackUri = await ngrok.connect({
        authtoken: '1zNWdhsd7xniOLcCPsEZkUmkrSQ_3rnonLUwn8v6QwECHkqYT',
        addr: 9000,
    });

    callbackUri = callbackUri + '/';
    console.log(callbackUri);

    merchant.payment.request.create({
        "action": "SALE",
        "allow_credit": true,
        "amount": 100000,
        "currency": "NOK",
        "customer": "4798052301",
        "pos_id": "443435",
        "pos_tid": `tid_${dateTime}`,
        "text": "Bananas",
        "success_return_uri": "https://settle.dev/api/reference/rest/v1/merchant.payment.request/create/",
        "failure_return_uri": "https://settle.eu/",
        // "callback_uri": "https://webhook.site/1966e09d-ecc5-43c8-9106-ce1410bd0821"
        "callback_uri": callbackUri
    })
        .then(success => {
                console.log(success);
                let content = JSON.parse(success.content);
                // console.log(content.id)
                tid = content.id
            }, failure => {
                console.log(failure);
            }
        );

    const api = ngrok.getApi();
    const tunnels = await api.listTunnels();
    // const tunnel = await api.tunnelDetail('50967d36-89cb-4bf3-bdb6-600e195e6bdc');
    console.log(tunnels)
    const requests = await api.listRequests();
    console.log(requests)
    // ngrok.kill();

})();


// Available parameters: https://settle.dev/api/reference/rest/v1/merchant.apiKeys/list/
// merchant.api_keys.list().then(success, failure)
// merchant.api_keys.list()
//   .then((success) => {
//     console.log(success);
//   }, (failure) => {
//     console.log(failure);
//   });

// // Available parameters: https://settle.dev/api/reference/rest/v1/merchant.apiKeys/get/
// merchant.api_keys.get('<api_key_id>')
//     .then(success => {
//             console.log(success);
//         }, failure => {
//             console.log(failure);
//         }
//     );

// // Available parameters: https://settle.dev/api/reference/rest/v1/merchant.apiKeys/update/
// merchant.api_keys.update('<api_key_id>', {"key": "value"})
//     .then(success => {
//             console.log(success);
//         }, failure => {
//             console.log(failure);
//         }
//     );


// // Available parameters: https://settle.dev/api/reference/rest/v1/merchant.apiKeys/create/
// merchant.api_keys.create({
//     "id": "test_2507210935",
//     "label": "My Awesome RSA Key #101",
//     "key_type": "rsa_generated"
// }).then(success => {
//     console.log(success)
// }, failure => {
//     console.log(failure)
// });

// requestPayment = () => {
//     // Available parameters: https://settle.dev/api/reference/rest/v1/merchant.payment.request/create/
//     merchant.payment.request.create({
//         "action": "SALE",
//         "allow_credit": true,
//         "amount": 100000,
//         "currency": "NOK",
//         "customer": "4798052301",
//         "pos_id": "443435",
//         "pos_tid": `tid_${dateTime}`,
//         "text": "Bananas",
//         "success_return_uri": "https://settle.dev/api/reference/rest/v1/merchant.payment.request/create/",
//         "failure_return_uri": "https://settle.eu/",
//         "callback_uri": "https://webhook.site/1966e09d-ecc5-43c8-9106-ce1410bd0821"
//     })
//         .then(success => {
//                 console.log(success);
//                 let content = JSON.parse(success.content);
//                 // console.log(content.id)
//                 tid = content.id
//             }, failure => {
//                 console.log(failure);
//             }
//         );
// }
//
// (async function() {
//     const webhookUrl = await ngrok.connect({
//         authtoken: '1zNWdhsd7xniOLcCPsEZkUmkrSQ_3rnonLUwn8v6QwECHkqYT',
//         addr: 4040,
//         onStatusChange: status => {},
//         onLogEvent: data => {},
//     });
//     console.log(webhookUrl)
//     merchant.payment.request.create({
//         "action": "SALE",
//         "allow_credit": true,
//         "amount": 100000,
//         "currency": "NOK",
//         "customer": "4798052301",
//         "pos_id": "443435",
//         "pos_tid": `tid_${dateTime}`,
//         "text": "Bananas",
//         "success_return_uri": "https://settle.dev/api/reference/rest/v1/merchant.payment.request/create/",
//         "failure_return_uri": "https://settle.eu/",
//         // "callback_uri": "https://webhook.site/1966e09d-ecc5-43c8-9106-ce1410bd0821"
//         "callback_uri": webhookUrl
//     })
//         .then(success => {
//                 console.log(success);
//                 let content = JSON.parse(success.content);
//                 // console.log(content.id)
//                 tid = content.id
//             }, failure => {
//                 console.log(failure);
//             }
//         );
//
//     const api = ngrok.getApi();
//     const tunnels = await api.listTunnels();
//     // const tunnel = await api.tunnelDetail('50967d36-89cb-4bf3-bdb6-600e195e6bdc');
//     console.log(tunnels)
//     const requests = await api.listRequests();
//     console.log(requests)
//     // ngrok.kill();
//
// })();

// // Available parameters: https://settle.dev/api/reference/rest/v1/merchant.payment.request/list/
// merchant.payment.request.list()
//     .then(success => {
//             console.log(success);
//         }, failure => {
//             console.log(failure);
//         }
//     );

// merchant.payment.request.get('pf7wy4s8t2cg')
//     .then(success => {
//             console.log(success);
//         }, failure => {
//             console.log(failure);
//         }
//     );

// merchant.payment.refund.create('pf7wy4s8t2cg', {
//     "action": "refund",
//     "currency": "NOK",
//     "amount": 5000,
//     "additional_amount": 0,
//     "refund_id": "ref-002",
//     "text": "Sample refund text..."
//
// })
//     .then(success => {
//             console.log(success);
//         }, failure => {
//             console.log(failure);
//         }
//     );

// let tid = 'pg4rg6and38f';
//
// refundPayment = () => {
//     merchant.payment.refund(tid, 'NOK', 8000, 0)
//         .then(success => {
//                 console.log('refunded: ', success);
//             }, failure => {
//                 console.log(failure);
//             }
//         );
// }
//
// capturePayment = () => {
//     merchant.payment.capture(tid, 'NOK', 10000, 0)
//         .then(success => {
//                 console.log('captured: ', success);
//                 refundPayment();
//             }, failure => {
//                 console.log(failure);
//             }
//         );
// }


// requestPayment();
// capturePayment();
// refundPayment();
