<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\User;
use App\Models\EmailVerification;
use Illuminate\Support\Facades\Mail;
use App\Mail\VerifyEmail;


//EStudiante
class AuthControllerTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function it_registers_a_new_user()
    {
        // Simular el envío de correo
        Mail::fake();

        $response = $this->postJson('/api/user/register', [
            'first_name' => 'Simon',
            'last_name' => 'Prueba',
            'email' => 'simon.prueba@example.com',
            'password' => 'Password123!',
            'password_confirmation' => 'Password123!',
            'user_type' => 'E',
        ]);

        $response->assertStatus(201);
        $response->assertJson([
            'message' => 'Registro exitoso. Por favor, revisa tu correo para verificar tu cuenta.'
        ]);

        // Verificar que el usuario fue creado en la base de datos
        $this->assertDatabaseHas('users', [
            'email' => 'simon.prueba@example.com',
        ]);

        // Verificar que el token de verificación fue creado en la base de datos
        $user = User::where('email', 'simon.prueba@example.com')->first();
        $this->assertDatabaseHas('email_verifications', [
            'user_id' => $user->id,
        ]);

        // Verificar que se envió el correo de verificación
        Mail::assertSent(VerifyEmail::class, function ($mail) use ($user) {
            return $mail->hasTo($user->email);
        });
    }

 /** @test */
public function validarPassMenorA8()
{
    // Simular el envío de correo
    Mail::fake();

    $response = $this->postJson('/api/user/register', [
        'first_name' => 'Simon',
        'last_name' => 'Prueba',
        'email' => 'simon.prueba2@example.com',
        'password' => '1234567',    // Menor a 8 caracteres
        'password_confirmation' => '1234567',
        'user_type' => 'E',
    ]);

    // Verificar que la respuesta tenga un estado 422 (Unprocessable Entity)
    $response->assertStatus(422);
    $response->assertJson([
        'message' => 'Error de validación'
    ]);

    // Verificar que el usuario no fue creado en la base de datos
    $this->assertDatabaseMissing('users', [
        'email' => 'simon.prueba2@example.com',
    ]);

    // Verificar que no se creó un token de verificación en la base de datos
    $user = User::where('email', 'simon.prueba2@example.com')->first();
    $this->assertNull($user);

    // Verificar que no se envió el correo de verificación
    Mail::assertNotSent(VerifyEmail::class);
}


  /** @test */
public function validarSiPassSonIguales()
{
    // Simular el envío de correo
    Mail::fake();

    $response = $this->postJson('/api/user/register', [
        'first_name' => 'Simon',
        'last_name' => 'Prueba',
        'email' => 'simon.prueba2@example.com',
        'password' => '12345678',    // Menor a 8 caracteres
        'password_confirmation' => '87654321',
        'user_type' => 'E',
    ]);

    // Verificar que la respuesta tenga un estado 422 (Unprocessable Entity)
    $response->assertStatus(422);
    $response->assertJson([
        'message' => 'Error de validación'
    ]);

    // Verificar que el usuario no fue creado en la base de datos
    $this->assertDatabaseMissing('users', [
        'email' => 'simon.prueba2@example.com',
    ]);

    // Verificar que no se creó un token de verificación en la base de datos
    $user = User::where('email', 'simon.prueba2@example.com')->first();
    $this->assertNull($user);

    // Verificar que no se envió el correo de verificación
    Mail::assertNotSent(VerifyEmail::class);
}

  /** @test */
public function validarSiNombreObligatorio()
{
    // Simular el envío de correo
    Mail::fake();

    $response = $this->postJson('/api/user/register', [
        'first_name' => '',
        'last_name' => 'Prueba',
        'email' => 'simon.prueba2@example.com',
        'password' => '12345678',    // Menor a 8 caracteres
        'password_confirmation' => '87654321',
        'user_type' => 'E',
    ]);

    // Verificar que la respuesta tenga un estado 422 (Unprocessable Entity)
    $response->assertStatus(422);
    $response->assertJson([
        'message' => 'Error de validación'
    ]);

    // Verificar que el usuario no fue creado en la base de datos
    $this->assertDatabaseMissing('users', [
        'email' => 'simon.prueba2@example.com',
    ]);

    // Verificar que no se creó un token de verificación en la base de datos
    $user = User::where('email', 'simon.prueba2@example.com')->first();
    $this->assertNull($user);

    // Verificar que no se envió el correo de verificación
    Mail::assertNotSent(VerifyEmail::class);
}

 /** @test */
 public function validarSiApellidoObligatorio()
 {
     // Simular el envío de correo
     Mail::fake();
 
     $response = $this->postJson('/api/user/register', [
         'first_name' => 'simon',
         'last_name' => '',
         'email' => 'simon.prueba2@example.com',
         'password' => '12345678',    // Menor a 8 caracteres
         'password_confirmation' => '87654321',
         'user_type' => 'E',
     ]);
 
     // Verificar que la respuesta tenga un estado 422 (Unprocessable Entity)
     $response->assertStatus(422);
     $response->assertJson([
         'message' => 'Error de validación'
     ]);
 
     // Verificar que el usuario no fue creado en la base de datos
     $this->assertDatabaseMissing('users', [
         'email' => 'simon.prueba2@example.com',
     ]);
 
     // Verificar que no se creó un token de verificación en la base de datos
     $user = User::where('email', 'simon.prueba2@example.com')->first();
     $this->assertNull($user);
 
     // Verificar que no se envió el correo de verificación
     Mail::assertNotSent(VerifyEmail::class);
 }

  /** @test */
public function validarSiEmailObligatorio()
{
    // Simular el envío de correo
    Mail::fake();

    $response = $this->postJson('/api/user/register', [
        'first_name' => 'simon',
        'last_name' => 'juan',
        'email' => '',
        'password' => '12345678',    // Menor a 8 caracteres
        'password_confirmation' => '87654321',
        'user_type' => 'E',
    ]);

    // Verificar que la respuesta tenga un estado 422 (Unprocessable Entity)
    $response->assertStatus(422);
    $response->assertJson([
        'message' => 'Error de validación'
    ]);

    // Verificar que el usuario no fue creado en la base de datos
    $this->assertDatabaseMissing('users', [
        'email' => 'simon.prueba2@example.com',
    ]);

    // Verificar que no se creó un token de verificación en la base de datos
    $user = User::where('email', 'simon.prueba2@example.com')->first();
    $this->assertNull($user);

    // Verificar que no se envió el correo de verificación
    Mail::assertNotSent(VerifyEmail::class);
}

 /** @test */
 public function validarSiPasswordObligatorio()
 {
     // Simular el envío de correo
     Mail::fake();
 
     $response = $this->postJson('/api/user/register', [
         'first_name' => 'simon',
         'last_name' => 'Prueba',
         'email' => 'simon.prueba2@example.com',
         'password' => '',    // Menor a 8 caracteres
         'password_confirmation' => '87654321',
         'user_type' => 'E',
     ]);
 
     // Verificar que la respuesta tenga un estado 422 (Unprocessable Entity)
     $response->assertStatus(422);
     $response->assertJson([
         'message' => 'Error de validación'
     ]);
 
     // Verificar que el usuario no fue creado en la base de datos
     $this->assertDatabaseMissing('users', [
         'email' => 'simon.prueba2@example.com',
     ]);
 
     // Verificar que no se creó un token de verificación en la base de datos
     $user = User::where('email', 'simon.prueba2@example.com')->first();
     $this->assertNull($user);
 
     // Verificar que no se envió el correo de verificación
     Mail::assertNotSent(VerifyEmail::class);
 }
  /** @test */
public function validarSiPass2Obligatorio()
{
    // Simular el envío de correo
    Mail::fake();

    $response = $this->postJson('/api/user/register', [
        'first_name' => 'simon',
        'last_name' => 'Prueba',
        'email' => 'simon.prueba2@example.com',
        'password' => '12345678',    // Menor a 8 caracteres
        'password_confirmation' => '',
        'user_type' => 'E',
    ]);

    // Verificar que la respuesta tenga un estado 422 (Unprocessable Entity)
    $response->assertStatus(422);
    $response->assertJson([
        'message' => 'Error de validación'
    ]);

    // Verificar que el usuario no fue creado en la base de datos
    $this->assertDatabaseMissing('users', [
        'email' => 'simon.prueba2@example.com',
    ]);

    // Verificar que no se creó un token de verificación en la base de datos
    $user = User::where('email', 'simon.prueba2@example.com')->first();
    $this->assertNull($user);

    // Verificar que no se envió el correo de verificación
    Mail::assertNotSent(VerifyEmail::class);
}




//Docente
    /** @test */
    public function ValidarRegistraDocente()
    {
        // Simular el envío de correo
        Mail::fake();

        $response = $this->postJson('/api/user/register', [
            'first_name' => 'doe',
            'last_name' => 'jon',
            'email' => 'jusntotomm3@gmail.com',
            'password' => 'Password123!',
            'password_confirmation' => 'Password123!',
            'user_type' => 'D',
        ]);

        $response->assertStatus(201);
        $response->assertJson([
            'message' => 'Registro exitoso. Por favor, revisa tu correo para verificar tu cuenta.'
        ]);

        // Verificar que el usuario fue creado en la base de datos
        $this->assertDatabaseHas('users', [
            'email' => 'jusntotomm3@gmail.com',
        ]);

        // Verificar que el token de verificación fue creado en la base de datos
        $user = User::where('email', 'jusntotomm3@gmail.com')->first();
        $this->assertDatabaseHas('email_verifications', [
            'user_id' => $user->id,
        ]);

        // Verificar que se envió el correo de verificación
        Mail::assertSent(VerifyEmail::class, function ($mail) use ($user) {
            return $mail->hasTo($user->email);
        });
    }


}