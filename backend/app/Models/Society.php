<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;

class Society extends Authenticatable
{

    use HasApiTokens;

    public $guarded = [];

    public $hidden = [
        "password"
    ];

    public function regional() {
        return $this->belongsTo(Regional::class);
    }

    public function validation() {
        return $this->hasOne(Validation::class);
    }

     public function application() {
        return $this->hasOne(Application::class);
    }
}
