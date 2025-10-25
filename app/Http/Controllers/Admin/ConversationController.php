<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Conversation;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ConversationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $conversations = Conversation::with(['createur', 'atelier'])
            ->paginate(15);

        return Inertia::render('admin/conversation/index', [
            'conversations' => $conversations,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/conversation/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'createur_id' => 'required|exists:users,id',
            'atelier_id' => 'required|exists:users,id',
            'sujet' => 'required|string|max:255',
            'est_archive' => 'boolean',
        ]);

        $conversation = Conversation::create($validated);

        return redirect()->route('admin.conversations.show', $conversation)
            ->with('success', 'Conversation créée avec succès.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Conversation $conversation)
    {
        $conversation->load(['createur', 'atelier', 'messages']);

        return Inertia::render('admin/conversation/show', [
            'conversation' => $conversation,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Conversation $conversation)
    {
        return Inertia::render('admin/conversation/edit', [
            'conversation' => $conversation,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Conversation $conversation)
    {
        $validated = $request->validate([
            'createur_id' => 'required|exists:users,id',
            'atelier_id' => 'required|exists:users,id',
            'sujet' => 'required|string|max:255',
            'est_archive' => 'boolean',
        ]);

        $conversation->update($validated);

        return redirect()->route('admin.conversations.show', $conversation)
            ->with('success', 'Conversation mise à jour avec succès.');
    }

    /**
     * Archive a conversation.
     */
    public function archive(Conversation $conversation)
    {
        $conversation->update(['est_archive' => true]);

        return redirect()->route('admin.conversations.index')
            ->with('success', 'Conversation archivée avec succès.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Conversation $conversation)
    {
        $conversation->delete();

        return redirect()->route('admin.conversations.index')
            ->with('success', 'Conversation supprimée avec succès.');
    }
}


