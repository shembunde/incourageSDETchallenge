const request = require('supertest');
const app = require('../../server/app'); // Import your Express app

describe('Loan API', () => {
  let loanId;

  // Test loan creation
  it('creates a new loan', async () => {
    const res = await request(app)
      .post('/api/loans')
      .send({
        client_id: 1,
        amount: 5000,
        type: 'Personal Loan'
      });
    
    expect(res.statusCode).toEqual(201);
    expect(res.body.status).toBe('Pending');
    loanId = res.body.id;
  });

  // Test loan approval
  it('approves a loan', async () => {
    const res = await request(app)
      .put(`/api/loans/${loanId}/approve`)
      .send({ adminId: 1 });
    
    expect(res.statusCode).toEqual(200);
    expect(res.body.status).toBe('Approved');
  });
});