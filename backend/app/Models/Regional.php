<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Regional extends Model
{
    public $guarded = [];

    public function society() {
        return $this->hasOne(Society::class);
    }
}
