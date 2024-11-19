import * as chai from 'chai'
import {default as chaiHttp } from "chai-http";


import { describe, test } from 'mocha';
import { expect } from 'chai'


chai.use(chaiHttp)


// describe('Auth API', () => {
//   describe('POST /api/register', () => {
//     it('should handle user registration', (done) => {
//       chai.request(app)
//         .post('/api/register')
//         .send({ username: 'testUser', password: 'testpassword' })
//         .end((err, res) => {
//           if (err) {
//             expect(res).to.have.status(500);
//             expect(res.body).to.have.property('message').that.is.equal('An error occurred!!');
//           } else {
//             expect(res).to.have.status(201);
//             expect(res.body).to.have.property('message').equal('User registered successfully');
//           }

//           done();
//         });
//     });
//   });
// });


import {request} from 'chai-http';

describe('GET /user', () => {
  it('should return the user', done => {    

    request.execute('http://www.google.com')
      .get('/')
      .end((err, res) => {
        console.log(res.body)
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        done();
      
      }
    );     

  
   });
});