<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\User;
use Illuminate\Support\Facades\Mail;
use App\Mail\VerifyEmail;

class StudentTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function it_registers_a_new_student()
    {
        // Simulate sending email
        Mail::fake();

        $response = $this->postJson('/api/user/register', [
            'first_name' => 'student',
            'last_name' => 'last name',
            'email' => '202107786@est.umss.edu',
            'password' => 'Password123!',
            'password_confirmation' => 'Password123!',
            'user_type' => 'E',
        ]);

        $response->assertStatus(201);
        $response->assertJson([
            'message' => 'Registro exitoso. Por favor, revisa tu correo para verificar tu cuenta.'
        ]);

        // Verify that the user was created in the database
        $this->assertDatabaseHas('users', [
            'email' => '202107786@est.umss.edu',
        ]);
    }

    /** @test */
    public function it_validates_password_is_at_least_8_characters()
    {
        Mail::fake();

        $response = $this->postJson('/api/user/register', [
            'first_name' => 'student',
            'last_name' => 'last name',
            'email' => '123456789@est.umss.edu',
            'password' => 'Pas1@', // Less than 8 characters
            'password_confirmation' => 'Pas1@',
            'user_type' => 'E',
        ]);

        $response->assertStatus(422);
        $response->assertJson([
            'message' => 'Error de validación'
        ]);

        $this->assertDatabaseMissing('users', [
            'email' => '123456789@est.umss.edu',
        ]);

        $user = User::where('email', '123456789@est.umss.edu')->first();
        $this->assertNull($user);

        Mail::assertNotSent(VerifyEmail::class);
    }

    /** @test */
    public function it_validates_passwords_match()
    {
        Mail::fake();

        $response = $this->postJson('/api/user/register', [
            'first_name' => 'student',
            'last_name' => 'last name',
            'email' => '123456789@est.umss.edu',
            'password' => 'Password123!',
            'password_confirmation' => 'hello123',
            'user_type' => 'E',
        ]);

        $response->assertStatus(422);
        $response->assertJson([
            'message' => 'Error de validación'
        ]);

        $this->assertDatabaseMissing('users', [
            'email' => '123456789@est.umss.edu',
        ]);

        $user = User::where('email', '123456789@est.umss.edu')->first();
        $this->assertNull($user);

        Mail::assertNotSent(VerifyEmail::class);
    }

    /** @test */
    public function it_validates_first_name_is_required()
    {
        Mail::fake();

        $response = $this->postJson('/api/user/register', [
            'first_name' => '',
            'last_name' => 'last name',
            'email' => '123456789@est.umss.edu',
            'password' => 'Password123!',
            'password_confirmation' => 'Password123!',
            'user_type' => 'E',
        ]);

        $response->assertStatus(422);
        $response->assertJson([
            'message' => 'Error de validación'
        ]);

        $this->assertDatabaseMissing('users', [
            'email' => '123456789@est.umss.edu',
        ]);

        $user = User::where('email', '123456789@est.umss.edu')->first();
        $this->assertNull($user);

        Mail::assertNotSent(VerifyEmail::class);
    }

    /** @test */
    public function it_validates_last_name_is_required()
    {
        Mail::fake();

        $response = $this->postJson('/api/user/register', [
            'first_name' => 'student',
            'last_name' => '',
            'email' => '123456789@est.umss.edu',
            'password' => 'Password123!',
            'password_confirmation' => 'Password123!',
            'user_type' => 'E',
        ]);

        $response->assertStatus(422);
        $response->assertJson([
            'message' => 'Error de validación'
        ]);

        $this->assertDatabaseMissing('users', [
            'email' => '123456789@est.umss.edu',
        ]);

        $user = User::where('email', '123456789@est.umss.edu')->first();
        $this->assertNull($user);

        Mail::assertNotSent(VerifyEmail::class);
    }

    /** @test */
    public function it_validates_email_is_required()
    {
        Mail::fake();

        $response = $this->postJson('/api/user/register', [
            'first_name' => 'student',
            'last_name' => 'last name',
            'email' => '',
            'password' => 'Password123!',
            'password_confirmation' => 'Password123!',
            'user_type' => 'E',
        ]);

        $response->assertStatus(422);
        $response->assertJson([
            'message' => 'Error de validación'
        ]);

        $this->assertDatabaseMissing('users', [
            'email' => '123456789@est.umss.edu',
        ]);

        $user = User::where('email', '123456789@est.umss.edu')->first();
        $this->assertNull($user);

        Mail::assertNotSent(VerifyEmail::class);
    }

    /** @test */
    public function it_validates_password_is_required()
    {
        Mail::fake();

        $response = $this->postJson('/api/user/register', [
            'first_name' => 'student',
            'last_name' => 'last name',
            'email' => '123456789@est.umss.edu',
            'password' => '',
            'password_confirmation' => 'Password123!',
            'user_type' => 'E',
        ]);

        $response->assertStatus(422);
        $response->assertJson([
            'message' => 'Error de validación'
        ]);

        $this->assertDatabaseMissing('users', [
            'email' => '123456789@est.umss.edu',
        ]);

        $user = User::where('email', '123456789@est.umss.edu')->first();
        $this->assertNull($user);

        Mail::assertNotSent(VerifyEmail::class);
    }

    /** @test */
    public function it_validates_password_confirmation_is_required()
    {
        Mail::fake();

        $response = $this->postJson('/api/user/register', [
            'first_name' => 'student',
            'last_name' => 'last name',
            'email' => '123456789@est.umss.edu',
            'password' => 'Password123!',
            'password_confirmation' => '',
            'user_type' => 'E',
        ]);

        $response->assertStatus(422);
        $response->assertJson([
            'message' => 'Error de validación'
        ]);

        $this->assertDatabaseMissing('users', [
            'email' => '123456789@est.umss.edu',
        ]);

        $user = User::where('email', '123456789@est.umss.edu')->first();
        $this->assertNull($user);

        Mail::assertNotSent(VerifyEmail::class);
    }

    /** @test */
    public function it_validates_password_contains_uppercase_letter()
    {
        Mail::fake();

        $response = $this->postJson('/api/user/register', [
            'first_name' => 'student',
            'last_name' => 'last name',
            'email' => '123456789@est.umss.edu',
            'password' => 'password123!',
            'password_confirmation' => 'password123!',
            'user_type' => 'E',
        ]);

        $response->assertStatus(422);
        $response->assertJson([
            'message' => 'Error de validación'
        ]);

        $this->assertDatabaseMissing('users', [
            'email' => '123456789@est.umss.edu',
        ]);

        $user = User::where('email', '123456789@est.umss.edu')->first();
        $this->assertNull($user);

        Mail::assertNotSent(VerifyEmail::class);
    }

    /** @test */
    public function it_validates_password_contains_lowercase_letter()
    {
        Mail::fake();

        $response = $this->postJson('/api/user/register', [
            'first_name' => 'student',
            'last_name' => 'last name',
            'email' => '123456789@est.umss.edu',
            'password' => 'PASSWORD123!',
            'password_confirmation' => 'PASSWORD123!',
            'user_type' => 'E',
        ]);

        $response->assertStatus(422);
        $response->assertJson([
            'message' => 'Error de validación'
        ]);

        $this->assertDatabaseMissing('users', [
            'email' => '123456789@est.umss.edu',
        ]);

        $user = User::where('email', '123456789@est.umss.edu')->first();
        $this->assertNull($user);

        Mail::assertNotSent(VerifyEmail::class);
    }

    /** @test */
    public function it_validates_password_contains_a_number()
    {
        Mail::fake();

        $response = $this->postJson('/api/user/register', [
            'first_name' => 'student',
            'last_name' => 'last name',
            'email' => '123456789@est.umss.edu',
            'password' => 'Password!',
            'password_confirmation' => 'Password!',
            'user_type' => 'E',
        ]);

        $response->assertStatus(422);
        $response->assertJson([
            'message' => 'Error de validación'
        ]);

        $this->assertDatabaseMissing('users', [
            'email' => '123456789@est.umss.edu',
        ]);

        $user = User::where('email', '123456789@est.umss.edu')->first();
        $this->assertNull($user);

        Mail::assertNotSent(VerifyEmail::class);
    }

    /** @test */
    public function it_validates_password_contains_special_character()
    {
        Mail::fake();

        $response = $this->postJson('/api/user/register', [
            'first_name' => 'student',
            'last_name' => 'last name',
            'email' => '123456789@est.umss.edu',
            'password' => 'Password123',
            'password_confirmation' => 'Password123',
            'user_type' => 'E',
        ]);

        $response->assertStatus(422);
        $response->assertJson([
            'message' => 'Error de validación'
        ]);

        $this->assertDatabaseMissing('users', [
            'email' => '123456789@est.umss.edu',
        ]);

        $user = User::where('email', '123456789@est.umss.edu')->first();
        $this->assertNull($user);

        Mail::assertNotSent(VerifyEmail::class);
    }

    /** @test */
    public function it_validates_password_does_not_contain_spaces()
    {
        Mail::fake();

        $response = $this->postJson('/api/user/register', [
            'first_name' => 'student',
            'last_name' => 'last name',
            'email' => '123456789@est.umss.edu',
            'password' => 'Password 123!',
            'password_confirmation' => 'Password 123!',
            'user_type' => 'E',
        ]);

        $response->assertStatus(422);
        $response->assertJson([
            'message' => 'Error de validación'
        ]);

        $this->assertDatabaseMissing('users', [
            'email' => '123456789@est.umss.edu',
        ]);

        $user = User::where('email', '123456789@est.umss.edu')->first();
        $this->assertNull($user);

        Mail::assertNotSent(VerifyEmail::class);
    }

    /** @test */
    public function it_validates_email_matches_domain()
    {
        Mail::fake();

        $response = $this->postJson('/api/user/register', [
            'first_name' => 'student',
            'last_name' => 'last name',
            'email' => '123456789@gmail.com',
            'password' => 'Password123!',
            'password_confirmation' => 'Password123!',
            'user_type' => 'E',
        ]);

        $response->assertStatus(422);
        $response->assertJson([
            'message' => 'Error de validación'
        ]);

        $this->assertDatabaseMissing('users', [
            'email' => '123456789@gmail.com',
        ]);

        $user = User::where('email', '123456789@gmail.com')->first();
        $this->assertNull($user);

        Mail::assertNotSent(VerifyEmail::class);
    }

    /** @test */
    public function it_validates_email_has_nine_characters_before_at_symbol()
    {
        Mail::fake();

        $response = $this->postJson('/api/user/register', [
            'first_name' => 'student',
            'last_name' => 'last name',
            'email' => 'test@est.umss.edu',
            'password' => 'Password123!',
            'password_confirmation' => 'Password123!',
            'user_type' => 'E',
        ]);

        $response->assertStatus(422);
        $response->assertJson([
            'message' => 'Error de validación'
        ]);

        $this->assertDatabaseMissing('users', [
            'email' => 'test@est.umss.edu',
        ]);

        $user = User::where('email', 'test@est.umss.edu')->first();
        $this->assertNull($user);

        Mail::assertNotSent(VerifyEmail::class);
    }
}
