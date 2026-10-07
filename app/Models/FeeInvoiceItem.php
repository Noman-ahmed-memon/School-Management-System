<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FeeInvoiceItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'fee_invoice_id', 'fee_type_id', 'amount', 'description'
    ];

    protected $casts = [
        'amount' => 'decimal:2',
    ];

    public function feeInvoice()
    {
        return $this->belongsTo(FeeInvoice::class);
    }

    public function feeType()
    {
        return $this->belongsTo(FeeType::class);
    }
}