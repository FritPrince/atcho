<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ValidationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $pendingUsers = User::where('email_verified_at', null)
            ->orWhere('role', 'PENDING')
            ->paginate(15);

        return Inertia::render('admin/validation/index', [
            'pendingUsers' => $pendingUsers,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        return Inertia::render('admin/validation/show', [
            'user' => $user,
        ]);
    }

    /**
     * Approve a user account.
     */
    public function approve(User $user)
    {
        $user->update([
            'email_verified_at' => now(),
            'role' => $user->role === 'PENDING' ? 'CREATEUR' : $user->role,
        ]);

        return redirect()->route('admin.validation.index')
            ->with('success', 'Compte approuvé avec succès.');
    }

    /**
     * Reject a user account.
     */
    public function reject(User $user)
    {
        $user->delete();

        return redirect()->route('admin.validation.index')
            ->with('success', 'Compte rejeté et supprimé.');
    }
}
