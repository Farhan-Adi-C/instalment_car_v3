<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Application extends Model
{
    public $guarded = [];

    public function instalment() {
        return $this->belongsTo(Instalment::class);
    }
}
