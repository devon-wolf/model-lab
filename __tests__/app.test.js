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
  isContributor: true
};

describe('user routes', () => {
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

  it('updates a user', async () => {
    const updatedUser = {
      username: 'actually_cher',
      email: 'cher@cher.com',
      isContributor: true
    }

    const response = await request(app)
      .put('/api/v1/users/1')
      .send(updatedUser);

    expect(response.body).toEqual({
      id: '1',
      ...updatedUser
    });
  });

  it('deletes a user', async () => {
    const response = await request(app)
      .delete('/api/v1/users/2');

    expect(response.body).toEqual({
      id: '2',
      ...testUser2
    });

    const followUpFetch = await request(app)
      .get('/api/v1/users');

    expect(followUpFetch.body).toEqual([{
      id: '1',
      ...testUser1
    }]);
  });
});

const testContrib = {
  userID: '1',
  pseudonym: 'do_you_believe'
}

describe('contributor routes', () => {
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

  // beforeEach(async () => {
  //   await request(app)
  //     .post('/api/v1/contributors')
  //     .send(testContrib);
  // });

  it('creates a new contributor', async () => {
    const newContrib = {
      userID: '2',
      pseudonym: 'meddlesome_meddler'
    };

    const response = await request(app)
      .post('/api/v1/contributors')
      .send(newContrib);

    expect(response.body).toEqual({
      id: '1',
      ...newContrib
    })
  })
});
