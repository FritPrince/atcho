<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RedirectByRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();
        
        if ($user) {
            // Rediriger selon le rôle
            switch ($user->role) {
                case 'ADMIN':
                    return redirect('/admin');
                case 'CREATEUR':
                    return redirect('/createur/dashboard');
                case 'ATELIER':
                    return redirect('/atelier/dashboard');
                case 'PRESTATAIRE':
                    return redirect('/prestataire/dashboard');
                default:
                    return redirect('/dashboard');
            }
        }
        
        return $next($request);
    }
}
