<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 'campus_id', 'admission_number', 'roll_number',
        'first_name', 'last_name', 'date_of_birth', 'gender',
        'blood_group', 'nationality', 'religion', 'address',
        'phone', 'email', 'previous_school', 'admission_date',
        'student_photo', 'status', 'is_active'
    ];

    protected $casts = [
        'date_of_birth' => 'date',
        'admission_date' => 'date',
        'is_active' => 'boolean',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function campus()
    {
        return $this->belongsTo(Campus::class);
    }

    public function studentGuardians()
    {
        return $this->hasMany(StudentGuardian::class);
    }

    public function guardians()
    {
        return $this->belongsToMany(Guardian::class, 'student_guardians')
                    ->withPivot('is_primary_contact')
                    ->withTimestamps();
    }

    public function studentAcademicRecords()
    {
        return $this->hasMany(StudentAcademicRecord::class);
    }

    public function currentAcademicRecord()
    {
        return $this->hasOne(StudentAcademicRecord::class)
                    ->whereHas('academicSession', function($query) {
                        $query->where('is_current', true);
                    });
    }

    public function studentAttendances()
    {
        return $this->hasMany(StudentAttendance::class);
    }

    public function results()
    {
        return $this->hasMany(Result::class);
    }

    public function resultSummaries()
    {
        return $this->hasMany(ResultSummary::class);
    }

    public function feeInvoices()
    {
        return $this->hasMany(FeeInvoice::class);
    }

    public function feePayments()
    {
        return $this->hasMany(FeePayment::class);
    }

    public function libraryTransactions()
    {
        return $this->hasMany(LibraryTransaction::class);
    }

    public function studentTransport()
    {
        return $this->hasMany(StudentTransport::class);
    }

    public function healthRecords()
    {
        return $this->hasMany(HealthRecord::class);
    }

    public function studentDocuments()
    {
        return $this->hasMany(StudentDocument::class);
    }

    // Accessors
    public function getFullNameAttribute()
    {
        return $this->first_name . ' ' . $this->last_name;
    }

    public function getCurrentStandardAttribute()
    {
        $record = $this->currentAcademicRecord;
        return $record ? $record->standard : null;
    }

    public function getCurrentSectionAttribute()
    {
        $record = $this->currentAcademicRecord;
        return $record ? $record->section : null;
    }
}