<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Member extends Model
{
    protected $primaryKey = 'identificationNumber';
    public $timestamps = false;
    protected $table = 'users';
    use HasFactory;
    protected $fillable = ['name', 'teamName', 'phoneNumber'];
}
