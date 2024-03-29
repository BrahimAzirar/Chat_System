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
        Schema::create('posts', function (Blueprint $table) {
            $table->id('PostId') -> nullable(false) -> unsigned();
            $table -> bigInteger('UserId') -> unsigned() -> nullable(false);
            $table -> longText('PostActicle') -> nullable(false);
            $table -> binary('PostData') -> nullable();
            $table -> date('PostDate') -> nullable(false);
            $table -> foreign('UserId') -> references('UserId') -> on('members') -> onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('posts');
    }
};
