const buildSkillsMatchTemplate = ( resume, skills = []) => {
    const template = [
        "Hello dear LLM , with the followed resume :  \n",
        resume,
        "Can you provide a list of skills that match with following list bellow ",
        "and provide a percentage of proficiency and the reason for the percentage: ",
        `${ skills.join(",") }`,
        "please provide the output in format json.",
        "use following json format",
        "{ ",
        " skills: [ ",
        "   { ",
        "    \"name\": \"Example skill 1\"",
        "    \"proficiency\": 40, ",
        "    \"reason\": \"example reason 1\" ",
        "   }, ",
        "   { ",
        "    \"name\": \"Example skill 2\"",
        "    \"proficiency\": 20, ",
        "    \"reason\": \"example reason 2\" ",
        "   } ",
        " ] ",
        "} "
        ];       

    return template;
}

export { buildSkillsMatchTemplate } 