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
        Schema::create('chat', function (Blueprint $table) {
            $table -> bigInteger('UserId') -> nullable(false) -> unsigned();
            $table -> bigInteger('FriendId') -> nullable(false) -> unsigned();
            $table -> longText('Message') -> nullable(false);
            $table -> dateTime('MessageDate') -> nullable(false);
            $table -> foreign('UserId') -> references('UserId') -> on('members') -> onDelete('cascade');
            $table -> foreign('FriendId') -> references('UserId') -> on('members') -> onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('chat');
    }
};
