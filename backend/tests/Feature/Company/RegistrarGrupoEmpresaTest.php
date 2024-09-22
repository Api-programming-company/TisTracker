<?php

namespace Tests\Feature\Company;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Password;
use App\Models\User;
use Tests\TestCase;
use App\Models\AcademicPeriod;
use App\Models\Company;
use App\Models\EmailVerification;
use Illuminate\Support\Facades\Mail;
use App\Mail\VerifyEmail;
use Laravel\Sanctum\Sanctum;


class RegistrarGrupoEmpresaTest extends TestCase
{
    use RefreshDatabase;
     /** @test */
    public function it_creates_a_company_successfully()
    {
        // Crear un usuario y un periodo académico
        $academicPeriod = AcademicPeriod::factory()->create();
        $user = User::factory()->create(['academic_period_id' => $academicPeriod->id]);

        // Autenticar al usuario usando Sanctum
        Sanctum::actingAs($user);

        // Datos de la solicitud
        $data = [
            'long_name' => 'Empresa de Prueba',
            'short_name' => 'EmpPrb',
            'email' => 'empresa@prueba.com',
            'address' => '123 Calle Principal',
            'phone' => '12345678',
            'members' => [$user->id],
        ];

        // Realizar la solicitud para crear la compañía
        $response = $this->postJson('/api/company', $data);

        // Verificar la respuesta
        $response->assertStatus(201);
        $response->assertJson([
            'message' => 'Empresa registrado correctamente.',
            'company' => [
                'long_name' => 'Empresa de Prueba',
                'short_name' => 'EmpPrb',
                'email' => 'empresa@prueba.com',
                'address' => '123 Calle Principal',
                'phone' => '12345678',
                'academic_period_id' => $academicPeriod->id,
            ],
        ]);

        // Verificar que la compañía fue creada en la base de datos
        $this->assertDatabaseHas('companies', [
            'long_name' => 'Empresa de Prueba',
            'short_name' => 'EmpPrb',
            'email' => 'empresa@prueba.com',
            'address' => '123 Calle Principal',
            'phone' => '12345678',
            'academic_period_id' => $academicPeriod->id,
        ]);

        // Verificar que los miembros fueron asociados a la compañía
        $company = Company::where('email', 'empresa@prueba.com')->first();
        $this->assertDatabaseHas('company_user', [
            'company_id' => $company->id,
            'user_id' => $user->id,
            'status' => 'P',
            'permission' => 'R',
        ]);
    }


    /** @test */
    public function NombreLargo_no_exede_32_caracteres()
    {
         // Crear un usuario y un periodo académico
         $academicPeriod = AcademicPeriod::factory()->create();
         $user = User::factory()->create(['academic_period_id' => $academicPeriod->id]);
 
         // Autenticar al usuario usando Sanctum
         Sanctum::actingAs($user);
 
         // Datos de la solicitud
         $data = [
             'long_name' => '12345678901234567890123456789012123', // 41 caracteres
             'short_name' => 'EmpP',
             'email' => 'empresa@prueba.com',
             'address' => '123 Calle Principal',
             'phone' => '12345678',
             'members' => [$user->id],
         ];
 
         // Realizar la solicitud para crear la compañía
         $response = $this->postJson('/api/company', $data);
 
         // Verificar la respuesta
         $response->assertStatus(422);
    }

        /** @test */
        public function NombreCorto_no_exede_8_caracteres()
        {
             // Crear un usuario y un periodo académico
             $academicPeriod = AcademicPeriod::factory()->create();
             $user = User::factory()->create(['academic_period_id' => $academicPeriod->id]);
     
             // Autenticar al usuario usando Sanctum
             Sanctum::actingAs($user);
     
             // Datos de la solicitud
             $data = [
                 'long_name' => 'holaprueba', 
                 'short_name' => 'aaaaaaaaa', // 9 caracteres
                 'email' => 'empresa@prueba.com',
                 'address' => '123 Calle Principal',
                 'phone' => '12345678',
                 'members' => [$user->id],
             ];
     
             // Realizar la solicitud para crear la compañía
             $response = $this->postJson('/api/company', $data);
     
             // Verificar la respuesta
             $response->assertStatus(422);
        }


         /** @test */
         public function telefono_solo_permite_numeros()
         {
              // Crear un usuario y un periodo académico
              $academicPeriod = AcademicPeriod::factory()->create();
              $user = User::factory()->create(['academic_period_id' => $academicPeriod->id]);
      
              // Autenticar al usuario usando Sanctum
              Sanctum::actingAs($user);
      
              // Datos de la solicitud
              $data = [
                  'long_name' => 'holaprueba', 
                  'short_name' => 'aaaaaaaa', 
                  'email' => 'empresa@prueba.com',
                  'address' => '123 Calle Principal',
                  'phone' => 'holaxd',
                  'members' => [$user->id],
              ];
      
              // Realizar la solicitud para crear la compañía
              $response = $this->postJson('/api/company', $data);
      
              // Verificar la respuesta
              $response->assertStatus(422);
         }

            /** @test */
            public function telefono_solo_permite_8_numeros()
            {
                 // Crear un usuario y un periodo académico
                 $academicPeriod = AcademicPeriod::factory()->create();
                 $user = User::factory()->create(['academic_period_id' => $academicPeriod->id]);
         
                 // Autenticar al usuario usando Sanctum
                 Sanctum::actingAs($user);
         
                 // Datos de la solicitud
                 $data = [
                     'long_name' => 'holaprueba', 
                     'short_name' => 'aaaaaaa', 
                     'email' => 'empresa@prueba.com',
                     'address' => '123 Calle Principal',
                     'phone' => '123456789',
                     'members' => [$user->id],
                 ];
         
                 // Realizar la solicitud para crear la compañía
                 $response = $this->postJson('/api/company', $data);
         
                 // Verificar la respuesta
                 $response->assertStatus(422);
            }

            /** @test */
    public function long_name_es_obligatorio()
    {
        // Crear un usuario y un periodo académico
        $academicPeriod = AcademicPeriod::factory()->create();
        $user = User::factory()->create(['academic_period_id' => $academicPeriod->id]);

        // Autenticar al usuario usando Sanctum
        Sanctum::actingAs($user);

        // Datos de la solicitud sin 'long_name'
        $data = [
            'short_name' => 'EmpPrb',
            'email' => 'empresa@prueba.com',
            'address' => '123 Calle Principal',
            'phone' => '12345678',
            'members' => [$user->id],
        ];

        // Realizar la solicitud para crear la compañía
        $response = $this->postJson('/api/company', $data);

        // Verificar la respuesta
        $response->assertStatus(422);
    }

     /** @test */
     public function short_name_es_obligatorio()
     {
         // Crear un usuario y un periodo académico
         $academicPeriod = AcademicPeriod::factory()->create();
         $user = User::factory()->create(['academic_period_id' => $academicPeriod->id]);
 
         // Autenticar al usuario usando Sanctum
         Sanctum::actingAs($user);
 
         // Datos de la solicitud sin 'short_name'
         $data = [
             'long_name' => 'Empresa de Prueba',
             'email' => 'empresa@prueba.com',
             'address' => '123 Calle Principal',
             'phone' => '12345678',
             'members' => [$user->id],
         ];
 
         // Realizar la solicitud para crear la compañía
         $response = $this->postJson('/api/company', $data);
 
         // Verificar la respuesta
         $response->assertStatus(422);
     }

     /** @test */
    public function email_es_obligatorio()
    {
        // Crear un usuario y un periodo académico
        $academicPeriod = AcademicPeriod::factory()->create();
        $user = User::factory()->create(['academic_period_id' => $academicPeriod->id]);

        // Autenticar al usuario usando Sanctum
        Sanctum::actingAs($user);

        // Datos de la solicitud sin 'email'
        $data = [
            'long_name' => 'Empresa de Prueba',
            'short_name' => 'EmpPrb',
            'address' => '123 Calle Principal',
            'phone' => '12345678',
            'members' => [$user->id],
        ];

        // Realizar la solicitud para crear la compañía
        $response = $this->postJson('/api/company', $data);

        // Verificar la respuesta
        $response->assertStatus(422);
    }

    /** @test */
    public function address_es_obligatorio()
    {
        // Crear un usuario y un periodo académico
        $academicPeriod = AcademicPeriod::factory()->create();
        $user = User::factory()->create(['academic_period_id' => $academicPeriod->id]);

        // Autenticar al usuario usando Sanctum
        Sanctum::actingAs($user);

        // Datos de la solicitud sin 'address'
        $data = [
            'long_name' => 'Empresa de Prueba',
            'short_name' => 'EmpPrb',
            'email' => 'empresa@prueba.com',
            'phone' => '12345678',
            'members' => [$user->id],
        ];

        // Realizar la solicitud para crear la compañía
        $response = $this->postJson('/api/company', $data);

        // Verificar la respuesta
        $response->assertStatus(422);
    }

    /** @test */
    public function phone_es_obligatorio()
    {
        // Crear un usuario y un periodo académico
        $academicPeriod = AcademicPeriod::factory()->create();
        $user = User::factory()->create(['academic_period_id' => $academicPeriod->id]);

        // Autenticar al usuario usando Sanctum
        Sanctum::actingAs($user);

        // Datos de la solicitud sin 'phone'
        $data = [
            'long_name' => 'Empresa de Prueba',
            'short_name' => 'EmpPrb',
            'email' => 'empresa@prueba.com',
            'address' => '123 Calle Principal',
            'members' => [$user->id],
        ];

        // Realizar la solicitud para crear la compañía
        $response = $this->postJson('/api/company', $data);

        // Verificar la respuesta
        $response->assertStatus(422);
    }

    /** @test */
    public function members_es_obligatorio()
    {
        // Crear un usuario y un periodo académico
        $academicPeriod = AcademicPeriod::factory()->create();
        $user = User::factory()->create(['academic_period_id' => $academicPeriod->id]);

        // Autenticar al usuario usando Sanctum
        Sanctum::actingAs($user);

        // Datos de la solicitud sin 'members'
        $data = [
            'long_name' => 'Empresa de Prueba',
            'short_name' => 'EmpPrb',
            'email' => 'empresa@prueba.com',
            'address' => '123 Calle Principal',
            'phone' => '12345678',
        ];

        // Realizar la solicitud para crear la compañía
        $response = $this->postJson('/api/company', $data);

        // Verificar la respuesta
        $response->assertStatus(422);
    }

   /** @test */
public function muestra_mensaje_si_nombre_largo_ya_existe()
{
    // Crear un usuario y un periodo académico
    $academicPeriod = AcademicPeriod::factory()->create();
    $user = User::factory()->create(['academic_period_id' => $academicPeriod->id]);

    // Crear una empresa con el mismo nombre largo
    Company::factory()->create(['long_name' => 'Empresa de Prueba']);

    // Autenticar al usuario usando Sanctum
    Sanctum::actingAs($user);

    // Datos de la solicitud
    $data = [
        'long_name' => 'Empresa de Prueba',
        'short_name' => 'EmpPrb',
        'email' => 'empresa@prueba.com',
        'address' => '123 Calle Principal',
        'phone' => '12345678',
        'members' => [$user->id],
    ];

    // Realizar la solicitud para crear la compañía
    $response = $this->postJson('/api/company', $data);

    // Verificar la respuesta
    $response->assertStatus(422);
    $response->assertJsonValidationErrors('long_name');
}

/** @test */
public function muestra_mensaje_si_nombre_corto_ya_existe()
{
    // Crear un usuario y un periodo académico
    $academicPeriod = AcademicPeriod::factory()->create();
    $user = User::factory()->create(['academic_period_id' => $academicPeriod->id]);

    // Crear una empresa con el mismo nombre corto
    Company::factory()->create(['short_name' => 'EmpPrb']);

    // Autenticar al usuario usando Sanctum
    Sanctum::actingAs($user);

    // Datos de la solicitud
    $data = [
        'long_name' => 'Empresa de Prueba',
        'short_name' => 'EmpPrb',
        'email' => 'empresa@prueba.com',
        'address' => '123 Calle Principal',
        'phone' => '12345678',
        'members' => [$user->id],
    ];

    // Realizar la solicitud para crear la compañía
    $response = $this->postJson('/api/company', $data);

    // Verificar la respuesta
    $response->assertStatus(422);
    $response->assertJsonValidationErrors('short_name');
}

/** @test */
public function muestra_mensaje_si_numero_de_telefono_ya_existe()
{
    // Crear un usuario y un periodo académico
    $academicPeriod = AcademicPeriod::factory()->create();
    $user = User::factory()->create(['academic_period_id' => $academicPeriod->id]);

    // Crear una empresa con el mismo número de teléfono
    Company::factory()->create(['phone' => '12345678']);

    // Autenticar al usuario usando Sanctum
    Sanctum::actingAs($user);

    // Datos de la solicitud
    $data = [
        'long_name' => 'Empresa de Prueba',
        'short_name' => 'EmpPrb',
        'email' => 'empresa@prueba.com',
        'address' => '123 Calle Principal',
        'phone' => '12345678',
        'members' => [$user->id],
    ];

    // Realizar la solicitud para crear la compañía
    $response = $this->postJson('/api/company', $data);

    // Verificar la respuesta
    $response->assertStatus(422);
    $response->assertJsonValidationErrors('phone');
}
    
}