describe('template spec', () => {
  beforeEach(()=>{
    cy.visit('http://localhost:3000/')
  })
  it('La ruta raiz de la aplicación es iniciar sesión', () => {
    cy.contains('Iniciar Sesión')
  })
// al cotains se le puede concatenar acciones, como el .click()
  it('Puedo iniciar sesión', () => {
    cy.contains('Correo Electrónico')
    cy.get('input:first').type('ricardo.rojas.carvajal@gmail.com')
    cy.get('input:last').type('aaAA11**')
    cy.get('#log').click()
  })

})