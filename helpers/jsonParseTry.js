const jsonParseTry = ( jsonString ) => {
    let parseValid = true;
    let result = null;
    
    try {
        result = JSON.parse(jsonString);
    } catch (error) {
        parseValid = false;
    }
    return parseValid
            ? result 
            : null ;
};

export default jsonParseTry;