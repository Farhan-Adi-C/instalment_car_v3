<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Month extends Model
{
    public $guarded = [];

    public function instalment() {
        return $this->belongsToMany(Instalment::class, "month_instalment");
    }
}
