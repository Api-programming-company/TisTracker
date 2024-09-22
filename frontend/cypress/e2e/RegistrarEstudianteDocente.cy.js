
describe('Registrar estudiante/docente', () => {
  beforeEach(()=>{
    cy.visit('http://localhost:3000')

  })
  it ('Es accesible por medio de una opción en el home', ()=>{

  })

  it ('Al seleccionar "No tienes una cuenta" se desplace hacia el formulario de creación', ()=>{
    cy.contains('No tienes una cuenta').click()
    cy.contains('Regístrate como')

  })

  it ('Caso de error, contraseña cuenta con 8 caracteres (mayus, minus, digito y caracter especial)',()=>{
    cy.contains('No tienes una cuenta').click()
    cy.get('[name=first_name]').type('asdf')
    cy.get('[name=last_name]').type('asdf')
    cy.get('[name=email]').type('asdf@est.umss.edu')
    cy.get('[name=password]').type('asdf')
    cy.get('[name=password_confirmation]').type('asdf')
    cy.contains('Registrar').click()
    cy.contains('Debe tener al menos 8 caracteres, incluyendo una letra mayúscula, una minúscula, un número y un carácter especial.')

  })

  it ('Caso de exito, contraseña cuenta con 8 caracteres (mayus, minus, digito y caracter especial)',()=>{
    cy.contains('No tienes una cuenta').click()
    cy.get('[name=first_name]').type('asdfa')
    cy.get('[name=last_name]').type('asdf')
    cy.get('[name=email]').type('21212121@est.umss.edu')
    cy.get('[name=password]').type('aaAA11**')
    cy.get('[name=password_confirmation]').type('aaAA11**')
    cy.contains('Registrar').click()
    cy.contains('Iniciar Sesión')
  })

  it ('Caso Error, input colocado en contraseña tiene que ser el mismo en "confirmar contraseña"', ()=>{
    cy.contains('No tienes una cuenta').click()
    cy.get('[name=first_name]').type('asdfa')
    cy.get('[name=last_name]').type('asdf')
    cy.get('[name=email]').type('21212121@est.umss.edu')
    cy.get('[name=password]').type('aaAA11**')
    cy.get('[name=password_confirmation]').type('aaAA01**')
    cy.contains('Registrar').click()
  })

  it ('Caso Exito, input colocado en contraseña tiene que ser el mismo en "confirmar contraseña"',
    {defaultCommandTimeout: 10000}, ()=>{
    cy.contains('No tienes una cuenta').click()
    cy.get('[name=first_name]').type('assdfa')
    cy.get('[name=last_name]').type('asdsf')
    cy.get('[name=email]').type('2121001@est.umss.edu')
    cy.get('[name=password]').type('aaAA11**')
    cy.get('[name=password_confirmation]').type('aaAA11**')
    cy.contains('Registrar').click()
  })

  it ('Al seleccionar Botón "Registrarse" se valide el email (formato @est.umss.edu)', ()=>{
    cy.contains('No tienes una cuenta').click()
    cy.get('[name=first_name]').type('assdfa')
    cy.get('[name=last_name]').type('asdsf')
    cy.get('[name=email]').type('2121001@est.com')
    cy.get('[name=password]').type('aaAA11**')
    cy.get('[name=password_confirmation]').type('aaAA11**')
    cy.contains('Registrar').click()
  })

  it ('Caso exito, al seleccionar Botón "Registrarse" se valide el email docente (formato @fcyt.est.umss.edu)', ()=>{
    cy.contains('No tienes una cuenta').click()
    cy.get('#toggle').click()
    cy.get('[name=first_name]').type('assdfa')
    cy.get('[name=last_name]').type('assdsf')
    cy.get('[name=email]').type('2112321121021@fcyt.umss.edu.bo')
    cy.get('[name=password]').type('aaAA11**')
    cy.get('[name=password_confirmation]').type('aaAA11**')
    cy.contains('Registrar').click()
  })
  it.only ('Caso error, al seleccionar Botón "Registrarse" se valide el email docente (formato @fcyt.est.umss.edu)',
    {defaultCommandTimeout: 10000}, ()=>{
    cy.contains('No tienes una cuenta').click()
    cy.get('#toggle').click()
    cy.get('[name=first_name]').type('assdfa')
    cy.get('[name=last_name]').type('assdsf')
    cy.get('[name=email]').type('21122321121021@fcyt.umss.eu.bo')
    cy.get('[name=password]').type('aaAA11**')
    cy.get('[name=password_confirmation]').type('aaAA11**')
    cy.contains('Registrar').click()
    cy.contains('El correo de un docente tiene que tener el dominio @fcyt.umss.edu.bo')
  })

  it ('existe un botón que redirija a incio de sesión si ya tienes una cuenta creada.',()=>{
    cy.contains('No tienes una cuenta').click()
    cy.contains('¿Ya tienes una cuenta? Inicia sesión').click()
    cy.contains('Iniciar Sesión').click()
  })
})