const jsonParseTry = require("../helpers/jsonParseTry");

const buildTemplate = ( topic, questionNumber,level,language ) => {
    const template = [
        `can you build a list of ${questionNumber} questions and answers about ${topic}, `,
        ` with a ${ level } difficulty level, `,
        "for each question i want 2 aditional fake responses, ",
        "so I expect 3 responses for each question, ",
        `1 correct and 2 incorrect, responses must be in ${language} language, please provide the result in json format.`,
        " ",
        " for Json format use the following structure:",
        " ",
        "   \"questions_and_answers\": [",
        "      {",
        "        \"question\": \"question 1\",",
        "        \"correct_answer\": \"Correct answer\",",
        "        \"incorrect_answers\": [",
        "          \"Incorrect answer 1\",",
        "          \"Incorrect answer 2.\"",
        "        ]",
        "      },      ",
        "      {",
        "        \"question\": \"question 1\",",
        "        \"correct_answer\": \"Correct answer\",",
        "        \"incorrect_answers\": [",
        "          \"Incorrect answer 1\",",
        "          \"Incorrect answer 2.\"",
        "        ]",
        "      }",
        "   ]", 
        ];        

    return template;
}

const formatResult = ( result ) => {
    let dataResult = {};    
    const jsonString = result.replaceAll("```json", "").replaceAll("```", "");
    dataResult = jsonParseTry(jsonString);
    if (!dataResult) {
      dataResult = jsonParseTry("{" + jsonString + "}");
      if (!dataResult)
        throw new Error("Result by provider. not compatible.");
    }
    return dataResult;
}

module.exports = { buildTemplate, formatResult } ;