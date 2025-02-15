import * as chai from 'chai'
import { default as chaiHttp } from "chai-http";
import { describe } from 'mocha';
import { expect } from 'chai'
import { request } from 'chai-http';

import app from '../../index.js'

chai.use(chaiHttp)

export const describeLmm = () => {

    describe('GET /api/llm', () => {

        before(async () => {


        })

        // after(async () => {
        //     // Wait to get results if some test fails.    
        //     setTimeout(async () => {
        //         process.kill(process.pid, 'SIGTERM')
        //     }, 2000)
        // })

        describe('/validate', () => {

            it("should get response from validate", (done) => {

                request.execute(app)
                    .get('/api/llm/validate')
                    .type("application/json")
                    .end((err, res) => {
                        expect(res).to.have.status(200);
                        expect(res.body).to.be.an('object');
                        expect(res.body).to.have.property("ok").equal(true)
                        expect(res.body).to.have.property("msg").equal("Service Ready")
                        done();
                    });
            });
        });


        describe('/generateTest', () => {

            it("should get a new test from llm service", (done) => {
                request.execute(app)
                    .get('/api/llm/generateTest?llm=gemini&topic=Terraform')
                    .type("application/json")
                    .end((err, res) => {
                        expect(res).to.have.status(200);
                        expect(res.body).to.be.an('object');
                        expect(res.body).to.have.property("ok").equal(true)
                        expect(res.body).to.have.property("parameters").to.have.property("llm").equal("gemini")
                        expect(res.body).to.have.property("test").to.have.property("questions_and_answers")
                        done();
                    });
            });
        });

        describe('/openPrompt', () => {

            it("should get a free prompt from llm service", (done) => {

                request.execute(app)
                    .get('/api/llm/openPrompt?prompt=What is CST timezone?')
                    .type("application/json")
                    .end((err, res) => {                        
                        expect(res).to.have.status(200);
                        expect(res.body).to.be.an('object');
                        expect(res.body).to.have.property("ok").equal(true)
                        expect(res.body).to.have.property("result").to.have.property("ok").equal(true)
                        expect(res.body).to.have.property("runningTime")
                        done();
                    });
            });
        });

        describe('/skillsMatch', () => {

            it("should get a skills match result from llm service", (done) => {

                request.execute(app)
                    .post('/api/llm/skillsMatch')
                    .type("application/json")
                    .send(
                        {
                            "resume": "Senior developer with lot of experience in Javascript and React.",
                            "skills": [
                                "Javascript","React","Angular"
                            ]
                        }
                    )
                    .end((err, res) => {                        
                        console.log(res.body);
                        expect(res).to.have.status(200);
                        expect(res.body).to.be.an('object');
                        expect(res.body).to.have.property("ok").equal(true)
                        expect(res.body).to.have.property("skills").with.length.greaterThan(1)
                        expect(res.body).to.have.property("runningTime")
                        done();
                    });
            });
        });

    });

}