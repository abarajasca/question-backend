import { request, response } from 'express'

export const logRequest = ( req = request,res = response,next ) => {
    console.log("------ logRequest -------");
    console.log(req.method + " " + req.protocol + "://" + req.hostname + req.url + " " + req.httpVersion);
    console.log(req.headers);
    console.log(req.body);

        
    console.log("----- logRequest end -------");

    next();
};

// module.exports = logRequest;