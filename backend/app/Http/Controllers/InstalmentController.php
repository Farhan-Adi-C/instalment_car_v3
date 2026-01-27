<?php

namespace App\Http\Controllers;

use App\Models\Instalment;
use Illuminate\Http\Request;

class InstalmentController extends Controller
{
    public function getAll(Request $request) {
          $society = $request->user();

        if(!$society) {
            return response()->json([
                "message" => "Invalid Token"
            ], 401);
        }

        $instalments = Instalment::with("month")->get();

        return response()->json([
            "cars" => $instalments
        ], 200);
    }

    public function getById(Request $request, $id) {
           $society = $request->user();

        if(!$society) {
            return response()->json([
                "message" => "Invalid Token"
            ], 401);
        }

        $instalment = Instalment::with("month")->where("id", $id)->first();

        return response()->json([
            "instalment" => $instalment
        ], 200);
    }
}
