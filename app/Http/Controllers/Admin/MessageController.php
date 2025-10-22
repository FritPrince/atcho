<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Message;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MessageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $messages = Message::with(['expediteur', 'destinataire', 'conversation'])
            ->paginate(15);

        return Inertia::render('admin/message/index', [
            'messages' => $messages,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/message/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'conversation_id' => 'required|exists:conversations,id',
            'expediteur_id' => 'required|exists:users,id',
            'destinataire_id' => 'required|exists:users,id',
            'contenu' => 'required|string',
        ]);

        $message = Message::create($validated);

        return redirect()->route('admin.messages.show', $message)
            ->with('success', 'Message créé avec succès.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Message $message)
    {
        $message->load(['expediteur', 'destinataire', 'conversation']);

        return Inertia::render('admin/message/show', [
            'message' => $message,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Message $message)
    {
        return Inertia::render('admin/message/edit', [
            'message' => $message,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Message $message)
    {
        $validated = $request->validate([
            'conversation_id' => 'required|exists:conversations,id',
            'expediteur_id' => 'required|exists:users,id',
            'destinataire_id' => 'required|exists:users,id',
            'contenu' => 'required|string',
        ]);

        $message->update($validated);

        return redirect()->route('admin.messages.show', $message)
            ->with('success', 'Message mis à jour avec succès.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Message $message)
    {
        $message->delete();

        return redirect()->route('admin.messages.index')
            ->with('success', 'Message supprimé avec succès.');
    }
}
