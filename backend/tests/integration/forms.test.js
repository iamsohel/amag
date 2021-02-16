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
    await models.Form.destroy({
      where: {},
      truncate: true
    })
  });

  describe('GET /', () => {
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

  describe('POST /', () => {

    let token; 
    let name; 
    let region; 
    let description; 
    let latitude; 
    let longitude; 
  
    const exec = async () => {
      return await request(server)
        .post('/api/forms')
        .set('Authorization', 'Bearer '+ token)
        .send({ name, region, description, latitude, longitude });
    }
  
    beforeEach(() => {
      token = jwt.sign(
        {
          id: 1,
          name: 'rana'
        },
        keys.jwtPrivateKey,
        { expiresIn: "1days" }
      );   
      name = 'form1'; 
      region = 'australia';
      description = 'description';
      latitude = '23.23256';
      longitude = '90.123568';
    })
  
    it('should return 401 if client is not logged in', async () => {
      token = ''; 
      const res = await exec();
      expect(res.status).toBe(401);
    });
  
    it('should return 400 if form has no name', async () => {
      name = ''; 
      const res = await exec();
      expect(res.status).toBe(400);
    });
  
    it('should save the form if it is valid', async () => {
      await exec();
      const form = await models.Form.findAll({ where : {name: 'form1' }});
      expect(form).not.toBeNull();
    });

    it('should save the form if it is valid and save audit log data', async () => {
      await exec();
      let auditLogObj = {
        userId: 1,
        event: 'Created',
        entity: 'Form',
        entityId: 1,
        dateTime: new Date(),
      };
      await models.AuditLog.bulkCreate([auditLogObj]);
      const form = await models.Form.findAll({ where : {name: 'form1' }});
      expect(form).not.toBeNull();
    });
  
  });

});

