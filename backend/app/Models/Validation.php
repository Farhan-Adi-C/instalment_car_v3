<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Validation extends Model
{
    public $guarded = [];

    public function validator() {
        return $this->belongsTo(Validator::class);
    }

    public function society() {
        return $this->belongsTo(Society::class);
    }
}
