<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Instalment extends Model
{
    public $guarded = [];

    public function month() {
        return $this->belongsToMany(Month::class, "month_instalment");
    }

    public function application() {
        return $this->hasOne(Application::class);
    }
}
