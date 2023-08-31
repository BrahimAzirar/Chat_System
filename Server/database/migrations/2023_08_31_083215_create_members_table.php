<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('members', function (Blueprint $table) {
            $table->id('UserId');
            $table -> string('FirstName', 15) -> nullable(false);
            $table -> string('LastName', 15) -> nullable(false);
            $table -> string('Thel', 15) -> nullable(false);
            $table -> string('Email', 50) -> nullable(false);
            $table -> string('_Password', 30) -> nullable(false);
            $table -> binary('_Profile') -> nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('members');
    }
};
