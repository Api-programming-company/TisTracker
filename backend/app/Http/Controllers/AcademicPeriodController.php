<?php

namespace App\Http\Controllers;

use App\Models\AcademicPeriod;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class AcademicPeriodController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index()
    {
        $user = Auth::user();

        if ($user->user_type !== 'D') {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $academicPeriods = AcademicPeriod::where('user_id', $user->id)->get();
        return response()->json($academicPeriods);
    }

    public function store(Request $request)
    {
        $user = Auth::user();

        if ($user->user_type !== 'D') {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $request->validate([
            'name' => 'required|string|max:255',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after:start_date',
            'description' => 'nullable|string',
        ]);

        $academicPeriod = AcademicPeriod::create([
            'name' => $request->name,
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
            'description' => $request->description,
            'user_id' => $user->id,
        ]);

        return response()->json($academicPeriod, 201);
    }
    public function getAllGroupedByTeacher()
    {
        $academicPeriods = AcademicPeriod::with('user')->get();

        // Agrupar los periodos por docente (user_id)
        $groupedByTeacher = $academicPeriods->groupBy('user_id')->map(function ($periods, $userId) {
            // Obtener información del docente
            $teacher = User::find($userId);

            return [
                'teacher_name' => $teacher->getFullNameAttribute(),
                'teacher_email' => $teacher->email,
                'academic_periods' => $periods->toArray()
            ];
        })->values(); // Convertir el resultado en una lista

        return response()->json($groupedByTeacher);
    }
}
