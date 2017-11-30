// Client API key from the Developer Console
var API_KEY = 'AIzaSyACj-0gPFRYU4QILFL_naToUD2jGaVC5dQ';

// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"];

/**
     *  On load, called to load the API client library.
    */
function handleClientLoad() {
    gapi.load('client', initClient);
}

/**
     *  Initializes the API client library and sets up sign-in state
    *  listeners.
    */
function initClient() {
    gapi.client.init({
    apiKey: API_KEY,
    discoveryDocs: DISCOVERY_DOCS,
    }).then()
}