<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Password;
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
    public function Registrar_nuevo_estudiante()
    {
        // Simular el envío de correo
        Mail::fake();

        $response = $this->postJson('/api/user/register', [
            'first_name' => 'Simon',
            'last_name' => 'Prueba',
            'email' => '123456789@est.umss.edu',
            'password' => 'Password123!',
            'password_confirmation' => 'Password123!',
            'user_type' => 'E',
        ]);

        // dd($response->getContent());     //para mas info

        $response->assertStatus(201);
        $response->assertJson([
            'message' => 'Registro exitoso. Por favor, revisa tu correo para verificar tu cuenta.'
        ]);

        // Verificar que el usuario fue creado en la base de datos
        $this->assertDatabaseHas('users', [
            'email' => '123456789@est.umss.edu',
        ]);

        // Verificar que el token de verificación fue creado en la base de datos
        $user = User::where('email', '123456789@est.umss.edu')->first();
        $this->assertDatabaseHas('email_verifications', [
            'user_id' => $user->id,
        ]);

        // Verificar que se envió el correo de verificación
        Mail::assertSent(VerifyEmail::class, function ($mail) use ($user) {
            return $mail->hasTo($user->email);
        });
    }

    /** @test */
    public function Validar_contraseña_8_caracteres()
    {
        // Simular el envío de correo
        Mail::fake();

        $response = $this->postJson('/api/user/register', [
            'first_name' => 'Simon',
            'last_name' => 'Prueba',
            'email' => '123456789@est.umss.edu',
            'password' => 'Pas1@',    // Menor a 8 caracteres
            'password_confirmation' => 'Pas1@',
            'user_type' => 'E',
        ]);

        // Verificar que la respuesta tenga un estado 422 (Unprocessable Entity)
        $response->assertStatus(422);
        $response->assertJson([
            'message' => 'Error de validación'
        ]);

        // Verificar que el usuario no fue creado en la base de datos
        $this->assertDatabaseMissing('users', [
            'email' => '123456789@est.umss.edu',
        ]);

        // Verificar que no se creó un token de verificación en la base de datos
        $user = User::where('email', '123456789@est.umss.edu')->first();
        $this->assertNull($user);

        // Verificar que no se envió el correo de verificación
        Mail::assertNotSent(VerifyEmail::class);
    }


    /** @test */
    public function Validar_si_password_son_iguales()
    {
        // Simular el envío de correo
        Mail::fake();

        $response = $this->postJson('/api/user/register', [
            'first_name' => 'Simon',
            'last_name' => 'Prueba',
            'email' => '123456789@est.umss.edu',
            'password' => 'Password123!',
            'password_confirmation' => 'hola123',
            'user_type' => 'E',
        ]);

        // Verificar que la respuesta tenga un estado 422 (Unprocessable Entity)
        $response->assertStatus(422);
        $response->assertJson([
            'message' => 'Error de validación'
        ]);

        // Verificar que el usuario no fue creado en la base de datos
        $this->assertDatabaseMissing('users', [
            'email' => '123456789@est.umss.edu',
        ]);

        // Verificar que no se creó un token de verificación en la base de datos
        $user = User::where('email', '123456789@est.umss.edu')->first();
        $this->assertNull($user);

        // Verificar que no se envió el correo de verificación
        Mail::assertNotSent(VerifyEmail::class);
    }

    /** @test */
    public function Validar_nombre_obligatorio()
    {
        // Simular el envío de correo
        Mail::fake();

        $response = $this->postJson('/api/user/register', [
            'first_name' => '',
            'last_name' => 'Prueba',
            'email' => '123456789@est.umss.edu',
            'password' => 'Password123!',
            'password_confirmation' => 'Password123!',
            'user_type' => 'E',
        ]);

        // Verificar que la respuesta tenga un estado 422 (Unprocessable Entity)
        $response->assertStatus(422);
        $response->assertJson([
            'message' => 'Error de validación'
        ]);

        // Verificar que el usuario no fue creado en la base de datos
        $this->assertDatabaseMissing('users', [
            'email' => '123456789@est.umss.edu',
        ]);

        // Verificar que no se creó un token de verificación en la base de datos
        $user = User::where('email', '123456789@est.umss.edu')->first();
        $this->assertNull($user);

        // Verificar que no se envió el correo de verificación
        Mail::assertNotSent(VerifyEmail::class);
    }

    /** @test */
    public function Validar_apellido_obligatorioo()
    {
        // Simular el envío de correo
        Mail::fake();

        $response = $this->postJson('/api/user/register', [
            'first_name' => 'simon',
            'last_name' => '',
            'email' => '123456789@est.umss.edu',
            'password' => 'Password123!',
            'password_confirmation' => 'Password123!',
            'user_type' => 'E',
        ]);

        // Verificar que la respuesta tenga un estado 422 (Unprocessable Entity)
        $response->assertStatus(422);
        $response->assertJson([
            'message' => 'Error de validación'
        ]);

        // Verificar que el usuario no fue creado en la base de datos
        $this->assertDatabaseMissing('users', [
            'email' => '123456789@est.umss.edu',
        ]);

        // Verificar que no se creó un token de verificación en la base de datos
        $user = User::where('email', '123456789@est.umss.edu')->first();
        $this->assertNull($user);

        // Verificar que no se envió el correo de verificación
        Mail::assertNotSent(VerifyEmail::class);
    }

    /** @test */
    public function Validar_email_obligatorio()
    {
        // Simular el envío de correo
        Mail::fake();

        $response = $this->postJson('/api/user/register', [
            'first_name' => 'simon',
            'last_name' => 'juan',
            'email' => '',
            'password' => 'Password123!',
            'password_confirmation' => 'Password123!',
            'user_type' => 'E',
        ]);

        // Verificar que la respuesta tenga un estado 422 (Unprocessable Entity)
        $response->assertStatus(422);
        $response->assertJson([
            'message' => 'Error de validación'
        ]);

        // Verificar que el usuario no fue creado en la base de datos
        $this->assertDatabaseMissing('users', [
            'email' => '123456789@est.umss.edu',
        ]);

        // Verificar que no se creó un token de verificación en la base de datos
        $user = User::where('email', '123456789@est.umss.edu')->first();
        $this->assertNull($user);

        // Verificar que no se envió el correo de verificación
        Mail::assertNotSent(VerifyEmail::class);
    }

    /** @test */
    public function Validar_password_obligatorio()
    {
        // Simular el envío de correo
        Mail::fake();

        $response = $this->postJson('/api/user/register', [
            'first_name' => 'simon',
            'last_name' => 'Prueba',
            'email' => '123456789@est.umss.edu',
            'password' => '',
            'password_confirmation' => 'Password123!',
            'user_type' => 'E',
        ]);

        // Verificar que la respuesta tenga un estado 422 (Unprocessable Entity)
        $response->assertStatus(422);
        $response->assertJson([
            'message' => 'Error de validación'
        ]);

        // Verificar que el usuario no fue creado en la base de datos
        $this->assertDatabaseMissing('users', [
            'email' => '123456789@est.umss.edu',
        ]);

        // Verificar que no se creó un token de verificación en la base de datos
        $user = User::where('email', '123456789@est.umss.edu')->first();
        $this->assertNull($user);

        // Verificar que no se envió el correo de verificación
        Mail::assertNotSent(VerifyEmail::class);
    }
    /** @test */
    public function Validar_password2_obligatorio()
    {
        // Simular el envío de correo
        Mail::fake();

        $response = $this->postJson('/api/user/register', [
            'first_name' => 'simon',
            'last_name' => 'Prueba',
            'email' => '123456789@est.umss.edu',
            'password' => 'Password123!',
            'password_confirmation' => '',
            'user_type' => 'E',
        ]);
        //Password158¡
        // Verificar que la respuesta tenga un estado 422 (Unprocessable Entity)
        $response->assertStatus(422);
        $response->assertJson([
            'message' => 'Error de validación'
        ]);

        // Verificar que el usuario no fue creado en la base de datos
        $this->assertDatabaseMissing('users', [
            'email' => '123456789@est.umss.edu',
        ]);

        // Verificar que no se creó un token de verificación en la base de datos
        $user = User::where('email', '123456789@est.umss.edu')->first();
        $this->assertNull($user);

        // Verificar que no se envió el correo de verificación
        Mail::assertNotSent(VerifyEmail::class);
    }

    /** @test */
    public function Validar_contraseña_Mayuscula()
    {
        // Simular el envío de correo
        Mail::fake();

        $response = $this->postJson('/api/user/register', [
            'first_name' => 'simon',
            'last_name' => 'Prueba',
            'email' => '123456789@est.umss.edu',
            'password' => 'password123!',
            'password_confirmation' => 'password123!',
            'user_type' => 'E',
        ]);
        //Password158¡
        // Verificar que la respuesta tenga un estado 422 (Unprocessable Entity)
        $response->assertStatus(422);
        $response->assertJson([
            'message' => 'Error de validación'
        ]);

        // Verificar que el usuario no fue creado en la base de datos
        $this->assertDatabaseMissing('users', [
            'email' => '123456789@est.umss.edu',
        ]);

        // Verificar que no se creó un token de verificación en la base de datos
        $user = User::where('email', '123456789@est.umss.edu')->first();
        $this->assertNull($user);

        // Verificar que no se envió el correo de verificación
        Mail::assertNotSent(VerifyEmail::class);
    }

    /** @test */
    public function Validar_contraseña_minuscula()
    {
        // Simular el envío de correo
        Mail::fake();

        $response = $this->postJson('/api/user/register', [
            'first_name' => 'simon',
            'last_name' => 'Prueba',
            'email' => '123456789@est.umss.edu',
            'password' => 'PASSWORD123!',
            'password_confirmation' => 'PASSWORD123!',
            'user_type' => 'E',
        ]);
        //Password158¡
        // Verificar que la respuesta tenga un estado 422 (Unprocessable Entity)
        $response->assertStatus(422);
        $response->assertJson([
            'message' => 'Error de validación'
        ]);

        // Verificar que el usuario no fue creado en la base de datos
        $this->assertDatabaseMissing('users', [
            'email' => '123456789@est.umss.edu',
        ]);

        // Verificar que no se creó un token de verificación en la base de datos
        $user = User::where('email', '123456789@est.umss.edu')->first();
        $this->assertNull($user);

        // Verificar que no se envió el correo de verificación
        Mail::assertNotSent(VerifyEmail::class);
    }

    /** @test */
    public function Validar_contraseña_numero()
    {
        // Simular el envío de correo
        Mail::fake();

        $response = $this->postJson('/api/user/register', [
            'first_name' => 'simon',
            'last_name' => 'Prueba',
            'email' => '123456789@est.umss.edu',
            'password' => 'PASSWORD!',
            'password_confirmation' => 'PASSWORD!',
            'user_type' => 'E',
        ]);
        //Password158¡
        // Verificar que la respuesta tenga un estado 422 (Unprocessable Entity)
        $response->assertStatus(422);
        $response->assertJson([
            'message' => 'Error de validación'
        ]);

        // Verificar que el usuario no fue creado en la base de datos
        $this->assertDatabaseMissing('users', [
            'email' => '123456789@est.umss.edu',
        ]);

        // Verificar que no se creó un token de verificación en la base de datos
        $user = User::where('email', '123456789@est.umss.edu')->first();
        $this->assertNull($user);

        // Verificar que no se envió el correo de verificación
        Mail::assertNotSent(VerifyEmail::class);
    }

    /** @test */
    public function Validar_contraseña_CaracterEspecial()
    {
        // Simular el envío de correo
        Mail::fake();

        $response = $this->postJson('/api/user/register', [
            'first_name' => 'simon',
            'last_name' => 'Prueba',
            'email' => '123456789@est.umss.edu',
            'password' => 'Password1d23',
            'password_confirmation' => 'Password1d23',
            'user_type' => 'E',
        ]);
        //Password158¡
        // Verificar que la respuesta tenga un estado 422 (Unprocessable Entity)
        $response->assertStatus(422);
        $response->assertJson([
            'message' => 'Error de validación'
        ]);

        // Verificar que el usuario no fue creado en la base de datos
        $this->assertDatabaseMissing('users', [
            'email' => '123456789@est.umss.edu',
        ]);

        // Verificar que no se creó un token de verificación en la base de datos
        $user = User::where('email', '123456789@est.umss.edu')->first();
        $this->assertNull($user);

        // Verificar que no se envió el correo de verificación
        Mail::assertNotSent(VerifyEmail::class);
    }

    /** @test */
    public function Validar_contraseña_sinEspacios()
    {
        // Simular el envío de correo
        Mail::fake();

        $response = $this->postJson('/api/user/register', [
            'first_name' => 'simon',
            'last_name' => 'Prueba',
            'email' => '123456789@est.umss.edu',
            'password' => 'Passw ord1d23 @',
            'password_confirmation' => 'Passw ord1d23 @',
            'user_type' => 'E',
        ]);
        //Password158¡
        // Verificar que la respuesta tenga un estado 422 (Unprocessable Entity)
        $response->assertStatus(422);
        $response->assertJson([
            'message' => 'Error de validación'
        ]);

        // Verificar que el usuario no fue creado en la base de datos
        $this->assertDatabaseMissing('users', [
            'email' => '123456789@est.umss.edu',
        ]);

        // Verificar que no se creó un token de verificación en la base de datos
        $user = User::where('email', '123456789@est.umss.edu')->first();
        $this->assertNull($user);

        // Verificar que no se envió el correo de verificación
        Mail::assertNotSent(VerifyEmail::class);
    }


    /** @test */
    public function Validar_email_cumpleDominio()
    {
        // Simular el envío de correo
        Mail::fake();

        $response = $this->postJson('/api/user/register', [
            'first_name' => 'simon',
            'last_name' => 'Prueba',
            'email' => '123456789@gamil.com',
            'password' => 'Password1d23@',
            'password_confirmation' => 'Password1d23@',
            'user_type' => 'E',
        ]);
        //Password158¡
        // Verificar que la respuesta tenga un estado 422 (Unprocessable Entity)
        $response->assertStatus(422);
        $response->assertJson([
            'message' => 'Error de validación'
        ]);

        // Verificar que el usuario no fue creado en la base de datos
        $this->assertDatabaseMissing('users', [
            'email' => '123456789@gamil.com',
        ]);

        // Verificar que no se creó un token de verificación en la base de datos
        $user = User::where('email', '123456789@gamil.com')->first();
        $this->assertNull($user);

        // Verificar que no se envió el correo de verificación
        Mail::assertNotSent(VerifyEmail::class);
    }

    /** @test */
    public function validar_Correo_NueveCaracters()
    {
        // Simular el envío de correo
        Mail::fake();

        $response = $this->postJson('/api/user/register', [
            'first_name' => 'simon',
            'last_name' => 'Prueba',
            'email' => '1234567@est.umss.edu',
            'password' => 'Passw ord1d23 @',
            'password_confirmation' => 'Passw ord1d23 @',
            'user_type' => 'E',
        ]);
        //Password158¡
        // Verificar que la respuesta tenga un estado 422 (Unprocessable Entity)
        $response->assertStatus(422);
        $response->assertJson([
            'message' => 'Error de validación'
        ]);

        // Verificar que el usuario no fue creado en la base de datos
        $this->assertDatabaseMissing('users', [
            'email' => '123456@est.umss.edu',
        ]);

        // Verificar que no se creó un token de verificación en la base de datos
        $user = User::where('email', '123456@est.umss.edu')->first();
        $this->assertNull($user);

        // Verificar que no se envió el correo de verificación
        Mail::assertNotSent(VerifyEmail::class);
    }
}