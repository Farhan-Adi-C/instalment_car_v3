<?php

namespace App\Http\Controllers;

use App\Models\Society;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthSocietyController extends Controller
{
    public function login(Request $request) {
        $society = Society::with("regional")->where("id_card_number", $request->id_card_number)->first();

        if(!$society || !Hash::check($request->password, $society->password)) {
            return response()->json([
                "message" => "ID Card Number or Password Incorrect"
            ], 401);
        }

        $token = $society->createToken("token")->plainTextToken;
        $society->token = $token;
        $society->save();

        return response()->json($society, 200);
    }

    public function logout(Request $request) {
        $society = $request->user();

        if(!$society) {
            return response()->json([
                "message" => "Invalid Token"
            ], 401);
        }

        $society->currentAccessToken()->delete();
        $society->token = null;
        $society->save();

        return response()->json([
            "message" => "logout success"
        ], 200);
    }

    public function getSocietyLogin(Request $request) {
          $societyLogin = $request->user();

        if(!$societyLogin) {
            return response()->json([
                "message" => "Invalid Token"
            ], 401);
        }

        $society = Society::with("regional", 'validation.validator', 'application')->where("id", $societyLogin->id)->first();
        return response()->json($society, 200);
    }
}
