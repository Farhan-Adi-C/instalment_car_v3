<?php

namespace App\Http\Controllers;

use App\Models\Validation;
use Illuminate\Http\Request;

class ValidationController extends Controller
{
    public function store(Request $request) {
         $society = $request->user();

        if(!$society) {
            return response()->json([
                "message" => "Invalid Token"
            ], 401);
        }

        Validation::create([
            "job" => $request->job,
            "job_description" => $request->job_description,
            "income" => $request->income,
            "reason_accepted" => $request->reason_accepted,
            "society_id" => $society->id
        ]);

        return response()->json([
            "message" => "Request data validation sent successfull"
        ], 200);
    }

    public function get(Request $request) {
        $society = $request->user();

        if(!$society) {
            return response()->json([
                "message" => "Invalid Token"
            ], 401);
        }

       $validation = Validation::with("validator")->where("society_id", $society->id)->first();
        return response()->json([
            "validation" => $validation
        ]);
    }
}
