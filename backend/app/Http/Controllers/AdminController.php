<?php

namespace App\Http\Controllers;

use App\Models\Application;
use App\Models\Society;
use App\Models\Validation;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function getAllSociety(Request $request)
    {
        $validator = $request->user();
        if (!$validator) {
            return response()->json([
                "message" => "Unauthorize User"
            ], 401);
        }

        $society = Society::with("validation", "application.instalment", "regional")->get();

        return response()->json($society, 200);
    }

    public function getSocietyById(Request $request, $id)
    {
        $validator = $request->user();
        if (!$validator) {
            return response()->json([
                "message" => "Unauthorize User"
            ], 401);
        }

        $society = Society::with("validation", "application.instalment", "regional")->where("id", $id)->first();

        return response()->json($society, 200);
    }

    public function updateStatusValidation(Request $request) {
         $validator = $request->user();
        if (!$validator) {
            return response()->json([
                "message" => "Unauthorize User"
            ], 401);
        }

        $validation = Validation::where("id", $request->validation_id)->first();
        $validation->status = $request->status;
        $validation->save();

        return response()->json([
            "message" => "success"
        ], 200);

    }


    public function updateStatusApplication(Request $request) {
            $validator = $request->user();
        if (!$validator) {
            return response()->json([
                "message" => "Unauthorize User"
            ], 401);
        }

        Application::where("id", $request->application_id)->update([
            "apply_status" => $request->apply_status
        ]);

        return response()->json([
            "message" => "succes"
        ], 200);
    }

    public function addNotes(Request $request) {
        $validator = $request->user();
        if (!$validator) {
            return response()->json([
                "message" => "Unauthorize User"
            ], 401);
        }

        Validation::where("id", $request->validation_id)->update([
            "validator_notes" => $request->notes
        ]);

                return response()->json([
            "message" => "succes"
        ], 200);
    }
}
