<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Notification;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NotificationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $notifications = Notification::with(['destinataire'])
            ->paginate(15);

        return Inertia::render('admin/notification/index', [
            'notifications' => $notifications,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/notification/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'titre' => 'required|string|max:255',
            'message' => 'required|string',
            'type' => 'required|in:info,success,warning,error',
            'date_envoi' => 'nullable|date',
        ]);

        $data = $validated;
        $data['destinataire_id'] = $data['user_id'];
        unset($data['user_id']);
        
        if (isset($data['date_envoi'])) {
            $data['date_creation'] = $data['date_envoi'];
            unset($data['date_envoi']);
        } else {
            $data['date_creation'] = now();
        }

        $notification = Notification::create($data);

        return redirect()->route('admin.notifications.show', $notification)
            ->with('success', 'Notification créée avec succès.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Notification $notification)
    {
        $notification->load(['destinataire']);

        return Inertia::render('admin/notification/show', [
            'notification' => $notification,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Notification $notification)
    {
        return Inertia::render('admin/notification/edit', [
            'notification' => $notification,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Notification $notification)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'titre' => 'required|string|max:255',
            'message' => 'required|string',
            'type' => 'required|in:info,success,warning,error',
            'date_envoi' => 'nullable|date',
            'est_lue' => 'boolean',
        ]);

        $data = $validated;
        $data['destinataire_id'] = $data['user_id'];
        unset($data['user_id']);
        
        if (isset($data['date_envoi'])) {
            $data['date_creation'] = $data['date_envoi'];
            unset($data['date_envoi']);
        }

        $notification->update($data);

        return redirect()->route('admin.notifications.show', $notification)
            ->with('success', 'Notification mise à jour avec succès.');
    }

    /**
     * Mark notification as read.
     */
    public function markAsRead(Notification $notification)
    {
        $notification->update(['est_lue' => true]);

        return redirect()->route('admin.notifications.index')
            ->with('success', 'Notification marquée comme lue.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Notification $notification)
    {
        $notification->delete();

        return redirect()->route('admin.notifications.index')
            ->with('success', 'Notification supprimée avec succès.');
    }
}
