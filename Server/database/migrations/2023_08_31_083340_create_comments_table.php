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
        Schema::create('comments', function (Blueprint $table) {
            $table -> bigInteger('PostId') -> unsigned() -> nullable(false);
            $table -> bigInteger('userId') -> unsigned() -> nullable(false);
            $table -> longText('_Comment') -> nullable(false);
            $table -> foreign('PostId') -> references('PostId') -> on('posts') -> onDelete('cascade');
            $table -> foreign('UserId') -> references('UserId') -> on('members') -> onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('comments');
    }
};
