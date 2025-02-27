import { request, response } from 'express'
import { generateContent } from '../llm/geminiProvider.js'
import { buildTemplate, formatResult } from '../llm/buildTemplate.js'
import Test from '../models/Test.js'
import { buildSkillsMatchTemplate } from '../llm/skillsMatchTemplate.js';
import { skills_match } from '../http/skills_match.js';


const validateLLM = (req, res= response ) => {

    return res.status(200).json( {
        ok: true,
        msg: "Service Ready"
    });

};


const openPrompt = async (req, res= response ) => {

    const { prompt } = req.query;

    if (prompt === "")
        prompt = "Hello , how are you today?"    

    try {
        const startTime = new Date().getTime();
    
        const result = await generateContent(prompt);
    
        const endTime = new Date().getTime();
    
        const runningTime =new Date(endTime-startTime).getMilliseconds();
    
        return res.status(200).json( {
            ok: true,
            runningTime,
            result
        });    
    } catch (error) {
        return res.status(500).json( {
            ok: false,
            message: error.message 
        });
    }

};

const generateTest = async (req = request, res= response ) => {
    let section = 1;

    try {
        let { llm,topic, questionNumber,level,language } = req.query;    
        if (llm == null || topic == null || llm === '' || topic === ''){
            throw new Error("llm or topic parameters is missing.");
        }
        if (questionNumber == null || Number(questionNumber) <= 0)
            questionNumber = 20;
        if (level == null) 
            level == "easy";
        if (language == null)
            language = "english";

        if (questionNumber > 100)
            questionNumber = 100;


        // Call gemini service for now
        section = 2;
        const startTime = new Date().getTime();
        const prompt = buildTemplate(topic,questionNumber,level,language);        
        const result = await generateContent(prompt);

        if (!result.ok) {
            console.log({result})
            throw new Error( result.message )
        }

        section = 3;
        const dataResult = formatResult(result.text);

        const endTime = new Date().getTime();
        const runningTime =new Date(endTime-startTime).getMilliseconds();
        section = 4;
        const parameters = {
            llm,topic,questionNumber,level,language
        }
        const test = new Test( {...parameters, date: new Date().getTime(), runningTime } );
        await test.save();

        return res.status(200).json( {
            ok: true,
            parameters,
            runningTime,
            test: dataResult
        });

    } catch (error) {
        console.log(error);
        switch ( section ) {
            case 1: 
                return res.status(400).json({
                    ok: false,
                    msg: "Parameter is missing"
                });
            case 2:    
                return res.status(400).json({
                    ok: false,
                    msg: "LLM Service not available."
                });
            case 3:
                return res.status(400).json({
                    ok: false,
                    msg: error.message
                });
            default: 
                return res.status(500).json({
                    ok: false,
                    msg: "Internal Server error"
                });     
        }
        
    }

};


const skillsMatch = async (req = request, res = response) => {
    const { resume, skills } = req.body

    // Validate
    if (!(resume && skills) || ( resume === "" || skills.length == 0)){
        return res.status(400).json( {
            ok: false,
            msg: "Missing parameters"
        });
    }

    const startTime = new Date().getTime();
    let result = {}

    // // Purpose testing.
    // return res.status(200).json( skills_match )

    try {
        // Prepare template and call service        
        const prompt = buildSkillsMatchTemplate(resume,skills);

        result = await generateContent( prompt );        
        
        if (!result.ok) {
            console.log({result})
            throw new Error( result.message )
        }
    
    } catch (error) {
        return res.status(400).json({
            ok: false,
            msg: 'Llm service not available.'
        });

    }
    
    try {
        // Verify results
        const dataResult = formatResult(result.text);
        const endTime = new Date().getTime();
        const runningTime =new Date(endTime-startTime).getMilliseconds();    

        // output results
        return res.status(200).json({
            ok: true,
            runningTime,
            skills: dataResult.skills
        })
        
    } catch (error) {
        return res.status(400).json({
            ok: false,
            msg: error.message
        });
    }
}

export { validateLLM,generateTest , openPrompt, skillsMatch };