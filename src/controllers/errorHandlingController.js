exports.handleServerErrors = (err, req, res, next) => {
    res.status(500).send({ msg: "Internal Server Error" });
};

exports.handleCustomErrors = (err, req, res, next) => {
    if (err.code === "ENOENT") {  
        // errors if filepath to offers.json / endpoints.json is unresolved
        res.status(404).send({ msg: `Unable to retrieve file at path '${err.path}'. Error number:${err.errno} - Error code:${err.code} `});
    } else if (err === "Invalid string") {
        res.status(400).send({msg: "Invalid string"})
    } else {
        next(err);
    }
};