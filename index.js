require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();

app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


const PRIVATE_APP_ACCESS = process.env.HUBSPOT_TOKEN;
const CUSTOM_OBJECT_WITH_PROPERTIES = '2-145881838?properties=name&properties=strength&properties=intelligence';
const CUSTOM_OBJECT_API = `https://api.hubapi.com/crm/v3/objects/${CUSTOM_OBJECT_WITH_PROPERTIES}`;



app.get('/', async (req, res) => {
    try {
        const response = await axios.get(CUSTOM_OBJECT_API, {
            headers: { Authorization: `Bearer ${PRIVATE_APP_ACCESS}` }
        });
        console.log(response.data.results);
        res.render('homepage', {
            title: 'Homepage | Integrating With HubSpot I Practicum',
            records: response.data.results
        });
    } catch (error) {
        res.status(500).send('Error fetching custom objects');
    }
});


// TODO: ROUTE 2 - Create a new app.get route for the form to create or update new custom object data. Send this data along in the next route.

// * Code for Route 2 goes here

// TODO: ROUTE 3 - Create a new app.post route for the custom objects form to create or update your custom object data. Once executed, redirect the user to the homepage.

// * Code for Route 3 goes here

/** 
* * This is sample code to give you a reference for how you should structure your calls. 

* * App.get sample
app.get('/contacts', async (req, res) => {
    const contacts = 'https://api.hubspot.com/crm/v3/objects/contacts';
    const headers = {
        Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
        'Content-Type': 'application/json'
    }
    try {
        const resp = await axios.get(contacts, { headers });
        const data = resp.data.results;
        res.render('contacts', { title: 'Contacts | HubSpot APIs', data });      
    } catch (error) {
        console.error(error);
    }
});

* * App.post sample
app.post('/update', async (req, res) => {
    const update = {
        properties: {
            "favorite_book": req.body.newVal
        }
    }

    const email = req.query.email;
    const updateContact = `https://api.hubapi.com/crm/v3/objects/contacts/${email}?idProperty=email`;
    const headers = {
        Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
        'Content-Type': 'application/json'
    };

    try { 
        await axios.patch(updateContact, update, { headers } );
        res.redirect('back');
    } catch(err) {
        console.error(err);
    }

});
*/


// * Localhost
app.listen(3000, () => {
    console.log('Listening on http://localhost:3000')
});