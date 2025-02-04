const { queryDb } = require('../../db/db'); //  connection module

describe('Payment Database Integrity', () => {
  it('updates loan balance after payment', async () => {
    // 1. Create a loan
    await queryDb(
      `INSERT INTO loans (client_id, balance) VALUES (1, 5000) RETURNING id`
    );
    
    // 2. Record payment
    await request(app)
      .post('/api/payments')
      .send({ loan_id: 1, amount: 1000 });
    
    // 3. Verify balance
    const result = await queryDb(
      'SELECT balance FROM loans WHERE id = 1'
    );
    expect(result.rows[0].balance).toBe(4000);
  });
});