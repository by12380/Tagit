import { ErrorHandler } from "@angular/core";

export class GapiErrorHandler implements ErrorHandler{
    handleError(error) {
        if(error instanceof Response) {
            if (error.status === 401) {
                console.log('Token expired. Proceed to sign in.');
                gapi.auth2.getAuthInstance().signIn();
            }
        }
    }
}
