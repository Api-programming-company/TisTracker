<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class Authenticate
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
       // Permitir si el usuario está autenticado en cualquier guard
       if (Auth::check()) {
        return $next($request);
        }

        // Si no está autenticado, devolver mensaje de error
        return response()->json(['message' => 'No autenticado.'], 401);
        return redirect()->guest(route('login'));
    }
}
