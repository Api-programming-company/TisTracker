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
            'password' => 'Pad123!',
            'password_confirmation' => 'Pad123!',
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
            'password' => 'Pad123!',    // Menor a 8 caracteres
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
            'password' => 'Pad123!',    // Menor a 8 caracteres
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
            'password' => 'Password12@',    // Menor a 8 caracteres
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
                'password' => 'Password12@',    // Menor a 8 caracteres
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

}



// Verificar que se pueda subir diferentes hitos
// Verificar que el representante pueda asignar una fecha de inicio a cada hito
// Verificar que el representante puede asignar una fecha de fin a cada hito
// Verificar que no se pueda asignar una fecha de inicio a un hito que este a la mitad de un intervalo de tiempo de otro hito
// Verificar que la fecha fin del ultimo hito no pueda sobrepasar la fecha limite de entrega del producto final
// Verificar que la fecha fin de cada hito sea mayor por al menos 7 días de la fecha inicio
// Verificar que se pueda subir entregables a cada hito
// Verificar que no se pueda subir un hito sin ningún entregable
// Verificar que no se pueda subir el mismo entregable más de una vez

