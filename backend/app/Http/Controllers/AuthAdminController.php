<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthAdminController extends Controller
{
    public function login(Request $request) {

        $user = User::where("email", $request->email)->first();

        if(!$user || !Hash::check($request->password, $user->password)){
            return response()->json([
                "message" => "Email or Password Incorrect"
            ], 401);
        }

        $validator = Validator::with("user")->where("user_id", $user->id)->first();
        $token = $validator->createToken("admin-token")->plainTextToken;
        
        return response()->json([
            "validator" => $validator,
            "token" => $token
        ], 200); 
    }

    public function logout(Request $request) {
        $validator = $request->user();
        if(!$validator) {
            return response()->json([
                "message" => "invalid token"
            ], 401);
        }

        $validator->currentAccessToken()->delete();

        return response()->json([
            "message" => "Logout success"
        ], 200);
    }

    public function getValidator(Request $request) {
        $validatorLogin = $request->user();
         if(!$validatorLogin) {
            return response()->json([
                "message" => "invalid token"
            ], 401);    
        }

        $validator = Validator::with("user", "validation")->where("id", $validatorLogin->id)->first();
        return response()->json($validator, 200);
    }
}
