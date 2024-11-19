import * as chai from 'chai'
import { default as chaiHttp } from "chai-http";
import { after, describe } from 'mocha';
import { expect } from 'chai'
import { request } from 'chai-http';

import app from '../../index.js'

//Fixures.
import { fix_username, dropDb } from './fixures/auth.fix.js';

chai.use(chaiHttp)

export const describeAuth = () => {

  describe('POST /api/auth', () => {

    let userToken = ""

    before(async () => {

      request.execute(app)
        .post('/api/auth/new')
        .accept("application/jsson")
        .send(
          {
            "name": "defaultuser",
            "email": "defaultuser@hotmail.com",
            "password": "123456"
          }
        )
        .end((err, res) => {
          userToken = res.body.token
        });
    })

    after(async () => {
      // Wait to get results if some test fails.         
      await dropDb()
      // setTimeout(async () => {
      //   // process.kill(process.pid, 'SIGTERM')
      // }, 2000)
    })

    describe('/new', () => {

      it("should create a new user ", (done) => {

        request.execute(app)
          .post('/api/auth/new')
          .accept("application/json")
          .send(
            {
              "name": fix_username,
              "email": `${fix_username}@hotmail.com`,
              "password": "123456"
            }
          )
          .end((err, res) => {
            expect(res).to.have.status(201);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property("uid")
            expect(res.body).to.have.property("token")
            done();
          });
      });

      it("should fail if user already exist", (done) => {

        request.execute(app)
          .post('/api/auth/new')
          .accept("application/json")
          .send(
            {
              "name": "defaultuser",
              "email": "defaultuser@hotmail.com",
              "password": "123456"
            }
          )
          .end((err, res) => {
            expect(res).to.have.status(400);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property("ok").equal(false);
            expect(res.body).to.have.property("msg")
            done();
          });
      });

    })

    describe('/', () => {

      it('should get valid token after login', done => {

        request.execute(app)
          .post('/api/auth')
          .accept("application/jsson")
          .send(
            {
              "email": "defaultuser@hotmail.com",
              "password": "123456"
            }
          )
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('object');
            expect(res.body.name).to.be.equal('defaultuser');
            expect(res.body.token.length).to.be.greaterThan(50)
            done();
          });

      });

      it('should fail with a bad credentials', done => {

        request.execute(app)
          .post('/api/auth')
          .accept("application/jsson")
          .send(
            {
              "email": "badnewuser@hotmail.com",
              "password": "bad123456"
            }
          )
          .end((err, res) => {
            expect(res).to.have.status(400);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property("msg").equal('Credential are not valid.');
            done();
          }
          );
      });

    })


    describe('/renew', () => {

      it("should renew token ", (done) => {

        request.execute(app)
          .get('/api/auth/renew')
          .set('x-token', userToken)
          .accept("application/json")
          .send(
            {
              "email": "defaultuser@hotmail.com",
              "password": "123456"
            }
          )
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property("token").length.greaterThan(50)
            expect(res.body).to.have.property("ok").equal(true)
            done();
          });
      });
    })

  });

}