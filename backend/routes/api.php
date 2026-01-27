<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\ApplicationController;
use App\Http\Controllers\AuthAdminController;
use App\Http\Controllers\AuthSocietyController;
use App\Http\Controllers\InstalmentController;
use App\Http\Controllers\ValidationController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post("/login", [AuthSocietyController::class, "login"]);
Route::post("/logout", [AuthSocietyController::class, "logout"])->middleware("auth:sanctum");
Route::get("/get-society", [AuthSocietyController::class, "getSocietyLogin"])->middleware("auth:sanctum");

Route::post("/validation/store", [ValidationController::class, "store"])->middleware("auth:sanctum");
Route::get("/validation/get", [ValidationController::class, "get"])->middleware("auth:sanctum");

Route::get("/instalment_cars", [InstalmentController::class, "getAll"])->middleware("auth:sanctum");
Route::get("/instalment_cars/{id}", [InstalmentController::class, "getById"])->middleware("auth:sanctum");

Route::post("/applications", [ApplicationController::class, "apply"])->middleware("auth:sanctum");
Route::get("/applications", [ApplicationController::class, "getApplication"])->middleware("auth:sanctum");


Route::post("/admin/login", [AuthAdminController::class, "login"]);
Route::post("/admin/logout", [AuthAdminController::class, "logout"])->middleware("auth:sanctum");
Route::get("/admin/get-validator", [AuthAdminController::class, "getValidator"])->middleware("auth:sanctum");

Route::get("/admin/get-society", [AdminController::class, 'getAllSociety'])->middleware("auth:sanctum");
Route::get("/admin/get-society/{id}", [AdminController::class, 'getSocietyById'])->middleware("auth:sanctum");
Route::post("/admin/update-validation", [AdminController::class, 'updateStatusValidation'])->middleware("auth:sanctum");
Route::post("/admin/update-application", [AdminController::class, 'updateStatusApplication'])->middleware("auth:sanctum");
