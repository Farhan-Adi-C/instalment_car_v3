<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;

class Validator extends Authenticatable
{
    use HasApiTokens;
    public $guarded = [];

    public function validation() {
        return $this->hasMany(Validation::class);
    }

    public function user() {
        return $this->belongsTo(User::class);
    }
}
