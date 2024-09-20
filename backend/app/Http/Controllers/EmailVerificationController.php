<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\EmailVerification;
use App\Models\User;
use Illuminate\Validation\ValidationException;
use Exception;
use Illuminate\Support\Facades\Log;
class EmailVerificationController extends Controller
{
    /**
     * Mark the authenticated user's email address as verified.
     *
     * @param  \Illuminate\Foundation\Auth\EmailVerificationRequest  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function __invoke(EmailVerificationRequest $request)
    {
        if ($request->user()->hasVerifiedEmail()) {
            return redirect()->intended('/home');
        }

        if ($request->user()->markEmailAsVerified()) {
            // Aquí autenticamos automáticamente al usuario
            Auth::login($request->user());
        }

        return redirect()->intended('/home')->with('verified', true);
    }
}