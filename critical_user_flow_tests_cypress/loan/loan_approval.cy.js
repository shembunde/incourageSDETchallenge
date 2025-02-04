describe('Loan Approval Flow', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000');
    });
  
    it('Submits and approves a loan', () => {
      // Submit loan
      cy.get('#loan-amount').type('5000');
      cy.get('#submit-loan').click();
      
      // Navigate to admin panel (simulate login)
      cy.get('[data-testid="admin-login"]').click();
      cy.get('#pending-loans').click();
      
      // Approve loan
      cy.get('.loan-row:first-child .approve-btn').click();
      
      // Verify UI and DB update
      cy.get('.loan-status').should('contain', 'Approved');
      cy.task('queryDb', 'SELECT status FROM loans WHERE id = 1').should('equal', 'Approved');
      cy.wait('@emailSent').then((interception) => {
        // Verify EmailJS parameters
        expect(interception.request.body).to.include({
          service_id: 'your_emailjs_service_id',
          template_id: 'loan_approval_template',
          user_id: 'your_user_id',
        });
  
        // Verify dynamic content sent to EmailJS
        expect(interception.request.body.template_params).to.deep.equal({
          client_email: 'elonmusk@gmail.com',
          client_name: 'Elon Musk',
          loan_amount: '5000',
          approval_date: '2023-10-01'
        });
      });
    });
  });