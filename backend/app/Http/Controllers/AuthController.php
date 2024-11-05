<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Rules\ValidarCorreoEstudiante;
use App\Rules\ValidarCorreoDocente;
use App\Rules\ValidarPassword;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class AuthController extends Controller
{
    /**
     * Handle user registration.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(Request $request)
    {
        // Validar los datos de registro
        $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => ['required', 'email', 'unique:users,email', $this->getEmailValidationRule($request->user_type)],
            'password' => ['required', 'string', 'min:8', 'confirmed', new ValidarPassword],
            'user_type' => 'required|in:E,D',
        ], [], User::getFieldLabels());

        // Crear nuevo usuario
        $user = User::create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'user_type' => $request->user_type,
        ]);

        // Enviar notificación de verificación de correo nativa
        $user->sendEmailVerificationNotification();

        return response()->json([
            'message' => 'Registro exitoso. Por favor, revisa tu correo para verificar tu cuenta.'
        ], Response::HTTP_CREATED);
    }

    /**
     * Handle login and issue a token.
     */
    public function login(Request $request)
    {
        // Validar los datos de inicio de sesión
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        // Intentar autenticar al usuario
        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json([
                'message' => 'Credenciales incorrectas'
            ], 401); // Error de credenciales incorrectas
        }

        // Si se autentica correctamente, regenerar la sesión
        $request->session()->regenerate();

        // Obtener la información del usuario autenticado
        $user = Auth::user();

        // Retornar la información del usuario
        return response()->json([
            'user' => $user
        ], 200);
    }

    /**
     * Handle logout and revoke token.
     */
    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return response()->json(['message' => 'Sesión cerrada']);
    }

    protected function getEmailValidationRule($userType)
    {
        switch ($userType) {
            case 'E':
                return new ValidarCorreoEstudiante;
            case 'D':
                return new ValidarCorreoDocente;
            default:
                return '';
        }
    }

    public function searchStudentByEmail($email)
    {
        // Validar que se ha proporcionado un correo electrónico válido
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            return response()->json([
                'message' => 'El correo electrónico proporcionado no es válido.'
            ], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        // Obtener el usuario autenticado
        $currentUser = auth()->user();

        // Verificar si el usuario está intentando buscarse a sí mismo
        if ($currentUser->email === $email) {
            return response()->json([
                'message' => 'No puedes buscarte a ti mismo.'
            ], Response::HTTP_FORBIDDEN);
        }

        // Buscar si el correo electrónico existe y pertenece a un estudiante
        $student = User::where('email', $email)
            ->where('user_type', 'E') // 'E' para estudiantes
            ->first();

        // Verificar si se encontró el estudiante
        if (!$student) {
            return response()->json([
                'message' => 'No se encontró ningún estudiante con el correo especificado.'
            ], Response::HTTP_NOT_FOUND);
        }

        // Devolver la información del estudiante
        return response()->json([
            'message' => 'Estudiante encontrado.',
            'student' => $student
        ], Response::HTTP_OK);
    }

    public function getGrades(Request $request)
    {
        $academicPeriodId = $request->input('academic_period_id');
        $limit = $request->input('limit', 10);

        // TODO optimizar
        $query = User::query()
            ->where('user_type', 'E') // Filtramos por user_type '
            ->whereHas('companyUsers', function ($q) {
                $q->where('status', 'A'); // solo users que esten en una empresa
            });

        if ($academicPeriodId) {
            $query->where('users.academic_period_id', $academicPeriodId);
        }

        $query->with('companyForGrades');


        // Obtener las calificaciones del estudiante con límite
        $grades = $query->limit($limit)->get();


        // Transformar la respuesta para incluir nombre y apellidos, y el score como pares
        $formattedGrades = $grades->map(function ($grade) {
            $companyData = $grade->company;
            $companyForGradesData = $grade->companyForGrades;

            return [
                'id' => $grade->id,
                'nombre' => $grade->first_name,
                'apellidos' => $grade->last_name,
                'pares' => $companyData ? $companyData->user_evaluations_score : 0,
                'company' => $companyForGradesData ? [
                    'id' => $companyForGradesData->id,
                    'short_name' => $companyForGradesData->short_name,
                    'long_name' => $companyForGradesData->long_name,
                    'auto_evaluation_score' => $companyForGradesData->auto_evaluation_score,
                    'cross_evaluation_score' => $companyForGradesData->cross_evaluation_score,
                    'planning_score' => $companyForGradesData->planning_score
                ] : null
            ];
        });


        // Devolver las calificaciones
        return response()->json([
            'grades' => $formattedGrades
        ], Response::HTTP_OK);
    }
}