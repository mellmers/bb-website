import * as CONSTANTS from "../constants";
import $ from "jquery";
import includes from "lodash/includes";

export default class API {

    /**
     * @returns API instance
     */
    static getInstance() {
        if (!this["singleton"]) {
            this["singleton"] = new API();
        }
        return this["singleton"];
    }

    // Add Basic Auth to Cookie
    login(data) {
    }

    // Remove Basic Auth from Cookie
    logout() {
    }

    _fetch(url, method = "GET", body = null, query = null, header = {}, contentType = "application/json") {
        let dfr = $.Deferred();

        header = $.extend({}, {
            "Accept": "application/json",
            "Authorization": "Basic " + btoa(CONSTANTS.WEBCLIENT_NAME + ":" + CONSTANTS.WEBCLIENT_SECRET),
            "Content-Type": contentType
        }, header);
        let headers = new Headers();
        for (let key in header) {
            if (!header.hasOwnProperty(key)) continue;
            headers.append(key, header[key]);
        }

        if (url.indexOf("http") === -1) {
            url = CONSTANTS.API_ROUTE_DEV + url;
        }

        if (query) {
            url += "?";
            let keys = Object.keys(query);
            keys.forEach((key, index) => {
                if (!query.hasOwnProperty(key)) return;
                url += key + "=" + query[key];
                if (keys.length-1 > index) {
                    url += "&";
                }
            });
        }

        fetch(url, {
            headers: headers,
            body: body ? JSON.stringify(body) : null,
            method: method
        })
            .then(this._parseJson)
            .then(json => {
                if (json.error) {
                    console.error("Status: " + json.status + ", Error: " + json.error + ", Message: " + json.message);
                    dfr.reject(json);
                }
                dfr.resolve(json);
            })
            .catch(error => {
                console.error("Unexpected Error in API", error);
                dfr.reject(error);
            });
        return dfr;
    }

    _parseJson(response) {
        return includes([204, 309], response.status) ? { status: response.status } : response.json()
    }
}