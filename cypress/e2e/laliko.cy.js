describe('User Registration and Login', () => {
  it('Should register and log in successfully', () => {
    const name = 'Laliko Goletiani';
    const email = 'laliko11@gmail.com';
    const password = 'a12345678A';
    
    // Register user
    cy.registerUser(name, email, password);
    
    // Log out after registration
    cy.get('.shop-menu > .nav > :nth-child(5) > a').click(); // Click 'Logout'
    
    // Log in with registered credentials
    cy.login(email, password);
  });
});

// Test case: Verify subscription functionality
describe('Verify Subscription on Home Page', () => {
  it('Should verify subscription functionality', () => {
    cy.visit('http://automationexercise.com');
    cy.scrollTo('bottom');
    cy.get('#susbscribe_email').type('laliko11@gmail.com');
    cy.get('#subscribe').click();
    cy.contains('You have been successfully subscribed!').should('be.visible');
  });
});

// Test case: Add products to cart
describe('Add Products to Cart', () => {
  it('Should add products to the cart and verify', () => {
    cy.visit('http://automationexercise.com');

    
    // Add first product to cart
    cy.get('.features_items > :nth-child(3) > .product-image-wrapper > .single-products > .productinfo > .btn').click();
    cy.get('.modal-footer > .btn').click(); // Click 'Continue Shopping'

    // Add second product to cart
    cy.get(':nth-child(4) > .product-image-wrapper > .single-products > .productinfo > .btn').click();
    cy.get('u').click(); // View cart

    // Verify both products are added to the cart
    cy.get('.cart_description').should('have.length', 2);
  });
});

// Test case: Place Order - Login before Checkout
describe('Place Order - Login before Checkout', () => {
  it.only('Should place an order successfully after logging in', () => {
    const email = 'anushka111@gmail.com';
    const password = '112233';

    // Launch browser and navigate to the URL
    cy.visit('http://automationexercise.com');

    // Verify that the home page is visible successfully
    cy.contains('Full-Fledged practice website for Automation Engineers').should('be.visible');

    // Log in with registered credentials
    cy.login(email, password);

    cy.get('.shop-menu > .nav > :nth-child(2) > a').click();

    // 5. Hover over first product and click 'Add to cart'
    cy.get(':nth-child(3) > .product-image-wrapper > .single-products > .productinfo > img').click();
    cy.get(':nth-child(3) > .product-image-wrapper > .single-products > .productinfo > .btn').click();
    
    // 6. Click 'Continue Shopping' button
    cy.get('.modal-footer > .btn').click();
    
    // 7. Hover over second product and click 'Add to cart'
    cy.get(':nth-child(4) > .product-image-wrapper > .single-products > .productinfo > img').click();
    cy.get(':nth-child(4) > .product-image-wrapper > .single-products > .productinfo > .btn').click();
    
    // 8. Click 'View Cart' button
    cy.get('u').contains('View Cart').click();

    // Verify the cart page is displayed
    cy.contains('Shopping Cart').should('be.visible');

    // Proceed to checkout
    cy.get('.col-sm-6 > .btn')
      .should('be.visible')
      .contains('Proceed To Checkout')
      .click();

    // Verify Address Details and Review Your Order sections
    cy.contains('Address Details').should('be.visible');
    cy.contains('Review Your Order').should('be.visible');
    // Enter comment and place order
    cy.get('[name="message"]').type('lala');
    cy.get(':nth-child(7) > .btn').click(); 

    // Enter payment details
    cy.get('[name="name_on_card"]').type('Laliko One');
    cy.get('[name="card_number"]').type('4111111111111111');
    cy.get('[name="cvc"]').type('123');
    cy.get('[name="expiry_month"]').type('12');
    cy.get('[name="expiry_year"]').type('2025');

    // Pay and confirm order
    cy.get('[data-qa="pay-button"]').click();

    // Verify success message
    cy.contains('Congratulations! Your order has been confirmed!').should('be.visible');

    // Delete account
   // cy.get('.shop-menu > .nav > :nth-child(5)').click(); 
   //cy.contains('ACCOUNT DELETED!').should('be.visible');
   //cy.get('[data-qa="continue-button"]').click();             es davakomenatre rom anastvis ar wameshala account 

  });
});