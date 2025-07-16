/// <reference types="cypress" />

describe('Example.com Test Suite', () => {
  beforeEach(() => {
    cy.log('BeforeEach: Setting up before each test')
    // This runs before each test in this describe block
    cy.task('log', 'BeforeEach hook executed')
  })

  before(() => {
    cy.log('Before: Setting up before each describe block')
    // This runs once before all tests in this describe block
    cy.visit('/')
    // Intentionally navigate to a non-existent URL to test the plugin
    cy.url().should('include', 'nonexistent.com')
  })

  afterEach(() => {
    cy.log('AfterEach: Cleaning up after each test')
    // This runs after each test in this describe block
    cy.task('log', 'AfterEach hook executed')
  })

  after(() => {
    cy.log('After: Cleaning up after describe block')
    // This runs once after all tests in this describe block
  })

  it('should load the example.com homepage successfully', () => {
    cy.log('Test 1: Verifying homepage loads')

    // Verify the page loads
    cy.url().should('include', 'example.com')

    // Check for basic page elements
    cy.get('h1').should('be.visible')
    cy.title().should('not.be.empty')

    // Verify page contains expected content
    cy.contains('Example Domain').should('be.visible')


    cy.log('Test 1: Homepage verification completed')
  })

  it('should verify page structure', () => {
    cy.log('Test 2: Verifying page structure')

    // Check page structure
    cy.get('body').should('be.visible')
    cy.get('div').should('exist')

    // Intentionally fail this test sometimes to test the plugin
    // Uncomment the next line to force a failure for testing the plugin
    // cy.get('#non-existent-element').should('be.visible')

    cy.log('Test 2: Structure verification completed')
  })
})
