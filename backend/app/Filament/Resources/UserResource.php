<?php

namespace App\Filament\Resources;

use App\Filament\Resources\UserResource\Pages;
use App\Models\User;
use Filament\Forms;
use Filament\Resources\Form;
use Filament\Resources\Resource;
use Filament\Resources\Table;
use Filament\Tables;

class UserResource extends Resource
{
    protected static ?string $model = User::class;

    protected static ?string $navigationIcon = 'heroicon-o-collection';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('first_name')
                    ->required()
                    ->label('Nombre'),
                Forms\Components\TextInput::make('last_name')
                    ->required()
                    ->label('Apellido'),
                Forms\Components\TextInput::make('email')
                    ->email()
                    ->required()
                    ->label('Correo Electrónico'),
                Forms\Components\TextInput::make('password')
                    ->password()
                    ->required()
                    ->label('Contraseña'),
                Forms\Components\Select::make('user_type')
                    ->options([
                        'E' => 'Estudiante',
                        'D' => 'Docente',
                    ])
                    ->required()
                    ->label('Tipo de Usuario'),
                Forms\Components\Select::make('academic_period_id')
                    ->relationship('academicPeriod', 'name')
                    ->label('Periodo Académico'),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('first_name')
                    ->label('Nombre'),
                Tables\Columns\TextColumn::make('last_name')
                    ->label('Apellido'),
                Tables\Columns\TextColumn::make('email')
                    ->label('Correo Electrónico'),
                Tables\Columns\TextColumn::make('user_type')
                    ->label('Tipo de Usuario')
                    ->formatStateUsing(fn ($state) => $state === 'E' ? 'Estudiante' : 'Docente'),
                Tables\Columns\TextColumn::make('academicPeriod.name')
                    ->label('Periodo Académico'),
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\DeleteBulkAction::make(),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListUsers::route('/'),
            'create' => Pages\CreateUser::route('/create'),
            'edit' => Pages\EditUser::route('/{record}/edit'),
        ];
    }
}
