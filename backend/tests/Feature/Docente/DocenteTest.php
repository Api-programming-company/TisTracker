<?php

namespace Tests\Feature\Docente;

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
    public function registra_nuevo_docente()
    {
        // Simular el envío de correo
        Mail::fake();

        $response = $this->postJson('/api/user/register', [
            'first_name' => 'Simon',
            'last_name' => 'Prueba',
            'email' => '123456789@fcyt.umss.edu.bo',
            'password' => 'Password123!',
            'password_confirmation' => 'Password123!',
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
            'password' => 'Password123!',    // Menor a 8 caracteres
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
            'email' => '123456789@fcyt.umss.edu.bo',
        ]);

        // Verificar que no se creó un token de verificación en la base de datos
        $user = User::where('email', '123456789@fcyt.umss.edu.bo')->first();
        $this->assertNull($user);

        // Verificar que no se envió el correo de verificación
        Mail::assertNotSent(VerifyEmail::class);
    }
}