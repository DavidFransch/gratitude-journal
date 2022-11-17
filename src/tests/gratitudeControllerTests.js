const should = require('should');
const sinon = require('sinon');
const gratitudeController = require('../controllers/gratitudeController');

describe('Gratitude Controller Tests:', () => {
  describe('Get', () => {
    it('should not allow an empty id', () => {
      const req = {
        params: {
          gratitudeId: ''
        }
      };

      const res = {
        status: sinon.spy(),
        send: sinon.spy(),
        json: sinon.spy()
      };

      gratitudeController.getOneGratitude(req, res);
      res.status.calledWith(400).should.equal(true, `Bad status ${res.status.args[0][0]}`)
    });
  });
  describe('Post', () => {
    it('should not allow an empty name on post', () => {
        const req = {
          body: {
            description: 'Some description'
          }
        };

        const res = {
          status: sinon.spy(),
          send: sinon.spy(),
          json: sinon.spy()
        };

        gratitudeController.createNewGratitude(req, res);
        res.status.calledWith(400).should.equal(true, `Bad status ${res.status.args[0][0]}`);
    });
  });
  describe('Patch', () => {
    it('should not allow an empty id', () => {
      const req = {
        params: {
          gratitudeId: ''
        }
      };

      const res = {
        status: sinon.spy(),
        send: sinon.spy(),
        json: sinon.spy()
      };

      gratitudeController.updateGratitude(req, res);
      res.status.calledWith(400).should.equal(true, `Bad status ${res.status.args[0][0]}`)
    });
  });
  describe('Delete', () => {
    it('should not allow an empty id', () => {
      const req = {
        params: {
          gratitudeId: ''
        }
      };

      const res = {
        status: sinon.spy(),
        send: sinon.spy(),
        json: sinon.spy()
      };

      gratitudeController.deleteGratitude(req, res);
      res.status.calledWith(400).should.equal(true, `Bad status ${res.status.args[0][0]}`)
    });
  });
});