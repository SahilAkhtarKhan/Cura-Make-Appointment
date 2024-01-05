// Describe block for Cura Make Appointment feature
describe('Cura Make Appointment', () => {

  // Test case to visit the URL and check for "Make Appointment" link
  it("Visit the URL", () => {
    cy.visit("https://katalon-demo-cura.herokuapp.com/")
    cy.contains("Make Appointment")
  });

  // Test case to click on "Make Appointment" button and fill the appointment form
  it("Click on Make Appointment", () => {
    // Visiting the login page
    cy.visit("https://katalon-demo-cura.herokuapp.com/profile.php#login")

    // Verifying the Make Appointment button
    cy.get("#btn-make-appointment").should("exist").click()
    cy.url().should("include","/profile.php#login")
    
    // Logging in
    cy.get("input#txt-username").type("John Doe")
    cy.get("input#txt-password").type("ThisIsNotAPassword")
    cy.get("#btn-login").click()

    // Verifying successful login and navigating to the appointment page
    cy.url().should("include", "/#appointment")

    // Checking form elements after login 
    cy.get('#appointment').should("exist")

    // Filling out the appointment form
    cy.get("select").select("Hongkong CURA Healthcare Center")
    cy.get("#chk_hospotal_readmission").check().should("be.checked")
    cy.get("#radio_program_medicaid").click().should("be.checked")
    cy.get("#radio_program_medicare").should("not.be.checked")
    cy.get("#radio_program_none").should("not.be.checked")
    cy.get("#txt_visit_date").type("25/01/2024")
    cy.get("#txt_comment").click({force:true})
    cy.get("#txt_comment").type("Sahil's appointment is scheduled for upcoming Monday.")
    cy.get("#btn-book-appointment").click()

    // Verifying the appointment confirmation
    cy.get('h2').contains("Appointment Confirmation")
    cy.get("#comment").contains("Sahil's appointment is scheduled for upcoming Monday.")
  })
})

