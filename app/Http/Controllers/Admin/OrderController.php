<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Commande;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $orders = Commande::with(['createur', 'atelier'])
            ->paginate(15);

        return Inertia::render('admin/order/index', [
            'orders' => $orders,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/order/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'createur_id' => 'required|exists:users,id',
            'atelier_id' => 'required|exists:users,id',
            'montant_final' => 'required|numeric|min:0',
            'statut' => 'required|in:PENDING,CONFIRMED,IN_PROGRESS,COMPLETED,CANCELLED',
        ]);

        $order = Commande::create($validated);

        return redirect()->route('admin.orders.show', $order)
            ->with('success', 'Commande créée avec succès.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Commande $order)
    {
        $order->load(['createur', 'atelier']);

        return Inertia::render('admin/order/show', [
            'order' => $order,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Commande $order)
    {
        return Inertia::render('admin/order/edit', [
            'order' => $order,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Commande $order)
    {
        $validated = $request->validate([
            'createur_id' => 'required|exists:users,id',
            'atelier_id' => 'required|exists:users,id',
            'montant_final' => 'required|numeric|min:0',
            'statut' => 'required|in:PENDING,CONFIRMED,IN_PROGRESS,COMPLETED,CANCELLED',
        ]);

        $order->update($validated);

        return redirect()->route('admin.orders.show', $order)
            ->with('success', 'Commande mise à jour avec succès.');
    }

    /**
     * Update order status.
     */
    public function updateStatus(Request $request, Commande $order)
    {
        $validated = $request->validate([
            'statut' => 'required|in:PENDING,CONFIRMED,IN_PROGRESS,COMPLETED,CANCELLED',
        ]);

        $order->update($validated);

        return redirect()->route('admin.orders.show', $order)
            ->with('success', 'Statut de la commande mis à jour.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Commande $order)
    {
        $order->delete();

        return redirect()->route('admin.orders.index')
            ->with('success', 'Commande supprimée avec succès.');
    }
}
