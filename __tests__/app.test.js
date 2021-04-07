const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

const testUser1 = {
  username: 'not_cher',
  email: 'not@cher.com',
  isContributor: true
};

const testUser2 = {
  username: 'meddler',
  email: 'in@your.business',
  isContributor: false
};

describe('model-lab routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  beforeEach(async () => {
    await request(app)
      .post('/api/v1/users')
      .send(testUser1);
    
    await request(app)
      .post('/api/v1/users')
      .send(testUser2);
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
      id: '3',
      ...newUser
    });
  });

  it('gets all users from the database', async () => {
    const response = await request(app)
      .get('/api/v1/users');

    expect(response.body).toEqual([{
      id: '1',
      ...testUser1
    },
    {
      id: '2',
      ...testUser2
    }]);
  });

  it('gets a user from the database by ID', async () => {
    const response = await request(app)
      .get('/api/v1/users/2');

    expect(response.body).toEqual({
      id: '2',
      ...testUser2
    });
  });
});
