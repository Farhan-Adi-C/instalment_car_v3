<?php

namespace App\Http\Controllers;

use App\Models\Application;
use App\Models\Instalment;
use App\Models\Society;
use Illuminate\Http\Request;

class ApplicationController extends Controller
{
    public function apply(Request $request) {
        $societyLogin = $request->user();

        if(!$societyLogin) {
            return response()->json([
                "message" => "Invalid Token"
            ], 401);
        }

        $request->validate([
            "instalment_id" => "required",
            "month" => "required"
        ]);

        $society = Society::with("validation")->where("id", $societyLogin->id)->first();
        $instalment = Instalment::where("id", $request->instalment_id)->first();


        if($society->validation->status !== "accepted") {
            return response()->json([
                "message" => "your data validator must be accepted by validator before"
            ], 401);
        }

       if(Application::where("society_id", $societyLogin->id)->first()) {
        return response()->json([
            "message" => "Application for a instalment can only be once"
        ], 401);
       }

       Application::create([
            "society_id" => $societyLogin->id,
            "instalment_id" => $request->instalment_id,
            "month" => $request->month,
            "notes" => $request->notes,
            "nominal" => $instalment->price / $request->month
       ]);

        return response()->json([
           "message" => "applying for Instalment successful"
        ], 200);

    }

    public function getApplication(Request $request) {
          $societyLogin = $request->user();

        if(!$societyLogin) {
            return response()->json([
                "message" => "Invalid Token"
            ], 401);
        }
        $application = Application::where("society_id", $societyLogin->id)->first();
        $instalment = Instalment::with("application")->where("id", $application->instalment_id)->first();

        return response()->json([
            "instalments" => $instalment
        ], 200);
    }
}
