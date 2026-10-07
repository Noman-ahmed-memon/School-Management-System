<?php

namespace App\Http\Controllers\Inventory;

use App\Http\Controllers\Controller;
use App\Models\InventoryItem;
use App\Models\InventoryTransaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class InventoryItemController extends Controller
{
    public function index(Request $request)
    {
        $this->authorizePermission('inventory.view');

        $items = InventoryItem::where('campus_id', $this->getCampusId())
            ->when($request->search, fn($q, $s) =>
                $q->where('name', 'like', "%{$s}%")
                  ->orWhere('code', 'like', "%{$s}%"))
            ->when($request->category, fn($q, $c) => $q->where('category', $c))
            ->latest()
            ->paginate($request->per_page ?? 15)
            ->withQueryString();

        return Inertia::render('Inventory/Items/Index', [
            'items' => $items,
            'filters' => $request->only(['search', 'category', 'per_page']),
        ]);
    }

    public function create()
    {
        $this->authorizePermission('inventory.manage');
        return Inertia::render('Inventory/Items/Create');
    }

    public function store(Request $request)
    {
        $this->authorizePermission('inventory.manage');

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:150'],
            'code' => ['required', 'string', 'max:50', 'unique:inventory_items,code'],
            'category' => ['required', 'in:stationery,uniforms,lab_equipment,sports_equipment,furniture'],
            'quantity' => ['required', 'integer', 'min:0'],
            'unit' => ['required', 'string', 'max:20'],
            'purchase_price' => ['nullable', 'numeric', 'min:0'],
            'selling_price' => ['nullable', 'numeric', 'min:0'],
            'supplier' => ['nullable', 'string', 'max:150'],
            'description' => ['nullable', 'string', 'max:500'],
        ]);

        $validated['campus_id'] = $this->getCampusId();

        InventoryItem::create($validated);

        return $this->successRedirect('inventory-items.index', 'Item added.');
    }

    public function edit(InventoryItem $inventoryItem)
    {
        $this->authorizePermission('inventory.manage');
        return Inertia::render('Inventory/Items/Edit', ['item' => $inventoryItem]);
    }

    public function update(Request $request, InventoryItem $inventoryItem)
    {
        $this->authorizePermission('inventory.manage');

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:150'],
            'code' => ['required', 'string', 'max:50', 'unique:inventory_items,code,' . $inventoryItem->id],
            'category' => ['required', 'in:stationery,uniforms,lab_equipment,sports_equipment,furniture'],
            'unit' => ['required', 'string', 'max:20'],
            'purchase_price' => ['nullable', 'numeric'],
            'selling_price' => ['nullable', 'numeric'],
            'supplier' => ['nullable', 'string'],
            'description' => ['nullable', 'string'],
        ]);

        $inventoryItem->update($validated);

        return $this->successRedirect('inventory-items.index', 'Item updated.');
    }

    public function storeTransaction(Request $request, InventoryItem $inventoryItem)
    {
        $this->authorizePermission('inventory.stock');

        $validated = $request->validate([
            'transaction_type' => ['required', 'in:purchase,stock_in,stock_out,transfer,adjustment'],
            'quantity' => ['required', 'integer', 'min:1'],
            'transaction_date' => ['required', 'date'],
            'reference_number' => ['nullable', 'string', 'max:100'],
            'note' => ['nullable', 'string', 'max:500'],
        ]);

        DB::transaction(function () use ($validated, $inventoryItem) {
            InventoryTransaction::create(array_merge($validated, [
                'inventory_item_id' => $inventoryItem->id,
            ]));

            $inventoryItem->updateStock($validated['quantity'], $validated['transaction_type']);
        });

        return back()->with('success', 'Stock transaction recorded.');
    }

    public function destroy(InventoryItem $inventoryItem)
    {
        $this->authorizePermission('inventory.manage');
        $inventoryItem->delete();
        return $this->successRedirect('inventory-items.index', 'Item deleted.');
    }
}