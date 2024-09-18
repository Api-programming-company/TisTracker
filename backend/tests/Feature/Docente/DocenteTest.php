<?php

namespace Tests\Feature\Docente;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Password;
use Tests\TestCase;
use App\Models\User;
use App\Models\EmailVerification;
use Illuminate\Support\Facades\Mail;
use App\Mail\VerifyEmail;


//Docente
class AuthControllerDocenteTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function registra_nuevo_docente()
    {
        // Simular el envío de correo
        Mail::fake();

        $response = $this->postJson('/api/user/register', [
            'first_name' => 'Simon',
            'last_name' => 'Prueba',
            'email' => '123456789@fcyt.umss.edu.bo',
            'password' => 'Password12@',
            'password_confirmation' => 'Password12@',
            'user_type' => 'D',
        ]);

        // dd($response->getContent());     //para mas info

        $response->assertStatus(201);
        $response->assertJson([
            'message' => 'Registro exitoso. Por favor, revisa tu correo para verificar tu cuenta.'
        ]);

        // Verificar que el usuario fue creado en la base de datos
        $this->assertDatabaseHas('users', [
            'email' => '123456789@fcyt.umss.edu.bo',
        ]);

        // Verificar que el token de verificación fue creado en la base de datos
        $user = User::where('email', '123456789@fcyt.umss.edu.bo')->first();
        $this->assertDatabaseHas('email_verifications', [
            'user_id' => $user->id,
        ]);

        // Verificar que se envió el correo de verificación
        Mail::assertSent(VerifyEmail::class, function ($mail) use ($user) {
            return $mail->hasTo($user->email);
        });
    }

    /** @test */
    public function validar_Nombre_Menos_de_8_Caracteres()
    {
        // Simular el envío de correo
        Mail::fake();

        $response = $this->postJson('/api/user/register', [
            'first_name' => 'Simon',
            'last_name' => 'Prueba',
            'email' => '123456789@fcyt.umss.edu.bo',
            'password' => 'Pad123!',  
            'password_confirmation' => 'Pad123!',
            'user_type' => 'E',
        ]);

        // Verificar que la respuesta tenga un estado 422 (Unprocessable Entity)
        $response->assertStatus(422);
        $response->assertJson([
            'message' => 'Error de validación'
        ]);

        // Verificar que el usuario no fue creado en la base de datos
        $this->assertDatabaseMissing('users', [
            'email' => '123456789@fcyt.umss.edu.bo',
        ]);

        // Verificar que no se creó un token de verificación en la base de datos
        $user = User::where('email', '123456789@fcyt.umss.edu.bo')->first();
        $this->assertNull($user);

        // Verificar que no se envió el correo de verificación
        Mail::assertNotSent(VerifyEmail::class);
    }

    /** @test */
    public function validarPassMenorA8()
    {
        // Simular el envío de correo
        Mail::fake();

        $response = $this->postJson('/api/user/register', [
            'first_name' => 'Simon',
            'last_name' => 'Prueba',
            'email' => '123456789@fcyt.umss.edu.bo',
            'password' => 'Pad123!',  
            'password_confirmation' => 'Pad123!',
            'user_type' => 'D',
        ]);

        // Verificar que la respuesta tenga un estado 422 (Unprocessable Entity)
        $response->assertStatus(422);
        $response->assertJson([
            'message' => 'Error de validación'
        ]);

        // Verificar que el usuario no fue creado en la base de datos
        $this->assertDatabaseMissing('users', [
            'email' => '123456789@fcyt.umss.edu.bo',
        ]);

        // Verificar que no se creó un token de verificación en la base de datos
        $user = User::where('email', '123456789@fcyt.umss.edu.bo')->first();
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
            'email' => '123456789@fcyt.umss.edu.bo',
            'password' => 'Password12@',  
            'password_confirmation' => 'Pasword12@',
            'user_type' => 'D',
        ]);

        // Verificar que la respuesta tenga un estado 422 (Unprocessable Entity)
        $response->assertStatus(422);
        $response->assertJson([
            'message' => 'Error de validación'
        ]);

        // Verificar que el usuario no fue creado en la base de datos
        $this->assertDatabaseMissing('users', [
            'email' => '123456789@fcyt.umss.edu.bo',
        ]);

        // Verificar que no se creó un token de verificación en la base de datos
        $user = User::where('email', '123456789@fcyt.umss.edu.bo')->first();
        $this->assertNull($user);

        // Verificar que no se envió el correo de verificación
        Mail::assertNotSent(VerifyEmail::class);
    }

    /** @test */
    public function Nombre_es_obligatorio()
    {
        // Simular el envío de correo
        Mail::fake();

        $response = $this->postJson('/api/user/register', [
            'first_name' => '',
            'last_name' => 'Prueba',
            'email' => '123456789@fcyt.umss.edu.bo',
            'password' => 'Password12@',  
            'password_confirmation' => 'Password12@',
            'user_type' => 'D',
        ]);

        // Verificar que la respuesta tenga un estado 422 (Unprocessable Entity)
        $response->assertStatus(422);
        $response->assertJson([
            'message' => 'Error de validación'
        ]);

        // Verificar que el usuario no fue creado en la base de datos
        $this->assertDatabaseMissing('users', [
            'email' => '123456789@fcyt.umss.edu.bo',
        ]);

        // Verificar que no se creó un token de verificación en la base de datos
        $user = User::where('email', '123456789@fcyt.umss.edu.bo')->first();
        $this->assertNull($user);

        // Verificar que no se envió el correo de verificación
        Mail::assertNotSent(VerifyEmail::class);
    }

    /** @test */
    public function Apellido_es_obligatorio()
    {
        // Simular el envío de correo
        Mail::fake();

        $response = $this->postJson('/api/user/register', [
            'first_name' => 'simon',
            'last_name' => '',
            'email' => '123456789@fcyt.umss.edu.bo',
            'password' => 'Password12@',  
            'password_confirmation' => 'Password12@',
            'user_type' => 'D',
        ]);

        // Verificar que la respuesta tenga un estado 422 (Unprocessable Entity)
        $response->assertStatus(422);
        $response->assertJson([
            'message' => 'Error de validación'
        ]);

        // Verificar que el usuario no fue creado en la base de datos
        $this->assertDatabaseMissing('users', [
            'email' => '123456789@fcyt.umss.edu.bo',
        ]);

        // Verificar que no se creó un token de verificación en la base de datos
        $user = User::where('email', '123456789@fcyt.umss.edu.bo')->first();
        $this->assertNull($user);

        // Verificar que no se envió el correo de verificación
        Mail::assertNotSent(VerifyEmail::class);
    }

    /** @test */
    public function email_es_obligatorio()
    {
        // Simular el envío de correo
        Mail::fake();

        $response = $this->postJson('/api/user/register', [
            'first_name' => 'simon',
            'last_name' => 'pepe',
            'email' => '',
            'password' => 'Password12@',  
            'password_confirmation' => 'Password12@',
            'user_type' => 'D',
        ]);

        // Verificar que la respuesta tenga un estado 422 (Unprocessable Entity)
        $response->assertStatus(422);
        $response->assertJson([
            'message' => 'Error de validación'
        ]);

        // Verificar que el usuario no fue creado en la base de datos
        $this->assertDatabaseMissing('users', [
            'email' => '123456789@fcyt.umss.edu.bo',
        ]);

        // Verificar que no se creó un token de verificación en la base de datos
        $user = User::where('email', '123456789@fcyt.umss.edu.bo')->first();
        $this->assertNull($user);

        // Verificar que no se envió el correo de verificación
        Mail::assertNotSent(VerifyEmail::class);
    }

    /** @test */
    public function Password1_es_obligatorio()
    {
        // Simular el envío de correo
        Mail::fake();

        $response = $this->postJson('/api/user/register', [
            'first_name' => 'simon',
            'last_name' => 'pepe',
            'email' => '123456789@fcyt.umss.edu.bo',
            'password' => '',  
            'password_confirmation' => 'Password12@',
            'user_type' => 'D',
        ]);

        // Verificar que la respuesta tenga un estado 422 (Unprocessable Entity)
        $response->assertStatus(422);
        $response->assertJson([
            'message' => 'Error de validación'
        ]);

        // Verificar que el usuario no fue creado en la base de datos
        $this->assertDatabaseMissing('users', [
            'email' => '123456789@fcyt.umss.edu.bo',
        ]);

        // Verificar que no se creó un token de verificación en la base de datos
        $user = User::where('email', '123456789@fcyt.umss.edu.bo')->first();
        $this->assertNull($user);

        // Verificar que no se envió el correo de verificación
        Mail::assertNotSent(VerifyEmail::class);
    }

    /** @test */
    public function Password2_es_obligatorio()
    {
        // Simular el envío de correo
        Mail::fake();

        $response = $this->postJson('/api/user/register', [
            'first_name' => 'simon',
            'last_name' => 'pepe',
            'email' => '123456789@fcyt.umss.edu.bo',
            'password' => 'Password12@',  
            'password_confirmation' => '',
            'user_type' => 'D',
        ]);

        // Verificar que la respuesta tenga un estado 422 (Unprocessable Entity)
        $response->assertStatus(422);
        $response->assertJson([
            'message' => 'Error de validación'
        ]);

        // Verificar que el usuario no fue creado en la base de datos
        $this->assertDatabaseMissing('users', [
            'email' => '123456789@fcyt.umss.edu.bo',
        ]);

        // Verificar que no se creó un token de verificación en la base de datos
        $user = User::where('email', '123456789@fcyt.umss.edu.bo')->first();
        $this->assertNull($user);

        // Verificar que no se envió el correo de verificación
        Mail::assertNotSent(VerifyEmail::class);
    }


    //Validar contraseña


    /** @test */
    public function Password_tiene_mayuscula()
    {
        // Simular el envío de correo
        Mail::fake();

        $response = $this->postJson('/api/user/register', [
            'first_name' => 'simon',
            'last_name' => 'pepe',
            'email' => '123456789@fcyt.umss.edu.bo',
            'password' => 'password12@',  
            'password_confirmation' => 'password12@',
            'user_type' => 'D',
        ]);

        // Verificar que la respuesta tenga un estado 422 (Unprocessable Entity)
        $response->assertStatus(422);
        $response->assertJson([
            'message' => 'Error de validación'
        ]);

        // Verificar que el usuario no fue creado en la base de datos
        $this->assertDatabaseMissing('users', [
            'email' => '123456789@fcyt.umss.edu.bo',
        ]);

        // Verificar que no se creó un token de verificación en la base de datos
        $user = User::where('email', '123456789@fcyt.umss.edu.bo')->first();
        $this->assertNull($user);

        // Verificar que no se envió el correo de verificación
        Mail::assertNotSent(VerifyEmail::class);
    }

    /** @test */
    public function Password_tiene_minuscula()
    {
        // Simular el envío de correo
        Mail::fake();

        $response = $this->postJson('/api/user/register', [
            'first_name' => 'simon',
            'last_name' => 'pepe',
            'email' => '123456789@fcyt.umss.edu.bo',
            'password' => 'PASSWORD12@',  
            'password_confirmation' => 'PASSWORD12@',
            'user_type' => 'D',
        ]);

        // Verificar que la respuesta tenga un estado 422 (Unprocessable Entity)
        $response->assertStatus(422);
        $response->assertJson([
            'message' => 'Error de validación'
        ]);

        // Verificar que el usuario no fue creado en la base de datos
        $this->assertDatabaseMissing('users', [
            'email' => '123456789@fcyt.umss.edu.bo',
        ]);

        // Verificar que no se creó un token de verificación en la base de datos
        $user = User::where('email', '123456789@fcyt.umss.edu.bo')->first();
        $this->assertNull($user);

        // Verificar que no se envió el correo de verificación
        Mail::assertNotSent(VerifyEmail::class);
    }

    /** @test */
    public function Password_tiene_numero()
    {
        // Simular el envío de correo
        Mail::fake();

        $response = $this->postJson('/api/user/register', [
            'first_name' => 'simon',
            'last_name' => 'pepe',
            'email' => '123456789@fcyt.umss.edu.bo',
            'password' => 'Password@',  
            'password_confirmation' => 'Password@',
            'user_type' => 'D',
        ]);

        // Verificar que la respuesta tenga un estado 422 (Unprocessable Entity)
        $response->assertStatus(422);
        $response->assertJson([
            'message' => 'Error de validación'
        ]);

        // Verificar que el usuario no fue creado en la base de datos
        $this->assertDatabaseMissing('users', [
            'email' => '123456789@fcyt.umss.edu.bo',
        ]);

        // Verificar que no se creó un token de verificación en la base de datos
        $user = User::where('email', '123456789@fcyt.umss.edu.bo')->first();
        $this->assertNull($user);

        // Verificar que no se envió el correo de verificación
        Mail::assertNotSent(VerifyEmail::class);
    }

    /** @test */
    public function Password_tiene_caracter_especial()
    {
        // Simular el envío de correo
        Mail::fake();

        $response = $this->postJson('/api/user/register', [
            'first_name' => 'simon',
            'last_name' => 'pepe',
            'email' => '123456789@fcyt.umss.edu.bo',
            'password' => 'Password123',  
            'password_confirmation' => 'Password123',
            'user_type' => 'D',
        ]);

        // Verificar que la respuesta tenga un estado 422 (Unprocessable Entity)
        $response->assertStatus(422);
        $response->assertJson([
            'message' => 'Error de validación'
        ]);

        // Verificar que el usuario no fue creado en la base de datos
        $this->assertDatabaseMissing('users', [
            'email' => '123456789@fcyt.umss.edu.bo',
        ]);

        // Verificar que no se creó un token de verificación en la base de datos
        $user = User::where('email', '123456789@fcyt.umss.edu.bo')->first();
        $this->assertNull($user);

        // Verificar que no se envió el correo de verificación
        Mail::assertNotSent(VerifyEmail::class);
    }

    /** @test */
    public function Password_no_tiene_espacios()
    {
        // Simular el envío de correo
        Mail::fake();

        $response = $this->postJson('/api/user/register', [
            'first_name' => 'simon',
            'last_name' => 'pepe',
            'email' => '123456789@fcyt.umss.edu.bo',
            'password' => 'Pas sword123@',  
            'password_confirmation' => 'Pas sword123@',
            'user_type' => 'D',
        ]);

        // Verificar que la respuesta tenga un estado 422 (Unprocessable Entity)
        $response->assertStatus(422);
        $response->assertJson([
            'message' => 'Error de validación'
        ]);

        // Verificar que el usuario no fue creado en la base de datos
        $this->assertDatabaseMissing('users', [
            'email' => '123456789@fcyt.umss.edu.bo',
        ]);

        // Verificar que no se creó un token de verificación en la base de datos
        $user = User::where('email', '123456789@fcyt.umss.edu.bo')->first();
        $this->assertNull($user);

        // Verificar que no se envió el correo de verificación
        Mail::assertNotSent(VerifyEmail::class);
    }


    /** @test */
    public function correo_cumple_con_el_dominio()
    {
        // Simular el envío de correo
        Mail::fake();

        $response = $this->postJson('/api/user/register', [
            'first_name' => 'simon',
            'last_name' => 'pepe',
            'email' => '123456789@gmail.com',
            'password' => 'Password123@',  
            'password_confirmation' => 'Password123@',
            'user_type' => 'D',
        ]);

        // Verificar que la respuesta tenga un estado 422 (Unprocessable Entity)
        $response->assertStatus(422);
        $response->assertJson([
            'message' => 'Error de validación'
        ]);

        // Verificar que el usuario no fue creado en la base de datos
        $this->assertDatabaseMissing('users', [
            'email' => '123456789@gmail.com',
        ]);

        // Verificar que no se creó un token de verificación en la base de datos
        $user = User::where('email', '123456789@gmail.com')->first();
        $this->assertNull($user);

        // Verificar que no se envió el correo de verificación
        Mail::assertNotSent(VerifyEmail::class);
    }



}


