import supertest from "supertest";
import app from "../src/app";

const request = supertest(app);
let token: any;

// beforeAll(()=> {
//   request.post("/auth/login")
//     .send({
//       email: 'test@user.com',
//       password: 'password'
//     })
//     .end(function(err, res) {
//       if (err) throw err;
//       token = { access_token: res.body.token }
//     });
// })

// describe("GET /users", () => {
//   it('gets the users', function(done) {
//     request.get('/users')
//       .query(token)
//       .expect(400)
//       .end(function(err, res) {
//         done()
//       });
//   });
// })