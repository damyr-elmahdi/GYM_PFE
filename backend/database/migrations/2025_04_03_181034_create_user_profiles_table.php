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
        Schema::table('users', function (Blueprint $table) {
            $table->string('phone')->nullable();
            $table->text('address')->nullable();
            $table->float('height')->nullable()->comment('in cm');
            $table->float('weight')->nullable()->comment('in kg');
            $table->string('fitness_goal')->nullable();
            $table->text('medical_conditions')->nullable();
            $table->date('date_of_birth')->nullable();
            $table->enum('gender', ['male', 'female', 'other'])->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'phone',
                'address',
                'height',
                'weight',
                'fitness_goal',
                'medical_conditions',
                'date_of_birth',
                'gender'
            ]);
        });
    }
};