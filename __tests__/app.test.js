const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('model-lab routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('adds a user to the database', async () => {
    const newUser = {
      username: 'hungrylikethewolf',
      email: 'hungry@like.wolf',
      isContributor: false
    };

    const response = await request(app)
      .post('/api/v1/users')
      .send(newUser);

      expect(response.body).toEqual({
      id: '1',
      ...newUser
    });
  });
});
