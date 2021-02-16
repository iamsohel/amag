const request = require('supertest');
const models = require("../../models");
const keys = require("../../config/keys");
const jwt = require("jsonwebtoken");
let server;

describe('/api/forms', () => {
  beforeEach(() => { server = require('../../index'); })
  afterEach(async () => { 
    await server.close(); 
    await models.Form.destroy({
      where: {},
      truncate: true
    })
  });
  let token;
  beforeEach(() => {
    token = jwt.sign(
      {
        id: 1,
        name: 'rana'
      },
      keys.jwtPrivateKey,
      { expiresIn: "1days" }
    );
  });

  describe('GET /', () => {
    it('should return all forms', async () => {
      let formObj = {
        name: 'form1',
        region: 'region',
        description: 'description',
        latitude: 'latitude',
        longitude: 'longitude',
        createdBy:1
      };
      await models.Form.bulkCreate([formObj]);
      const res = await request(server)
      .get('/api/forms')
      .set('Authorization', 'Bearer '+ token);
      expect(res.status).toBe(200);
      expect(res.body.forms.length).toBe(1);
      expect(res.body.forms.some(g => g.name === 'form1')).toBeTruthy();
    });
  });
});