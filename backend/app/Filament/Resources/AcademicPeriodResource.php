<?php

namespace App\Filament\Resources;

use App\Filament\Resources\AcademicPeriodResource\Pages;
use App\Models\AcademicPeriod;
use Filament\Forms;
use Filament\Resources\Form;
use Filament\Resources\Resource;
use Filament\Resources\Table;
use Filament\Tables;

class AcademicPeriodResource extends Resource
{
    protected static ?string $model = AcademicPeriod::class;

    protected static ?string $navigationIcon = 'heroicon-o-collection';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('name')
                    ->required()
                    ->maxLength(255),
                Forms\Components\DatePicker::make('start_date')
                    ->required(),
                Forms\Components\DatePicker::make('end_date')
                    ->required(),
                Forms\Components\Textarea::make('description')
                    ->maxLength(65535),
                Forms\Components\Select::make('user_id')
                    ->relationship('creator', 'full_name')
                    ->required()
                    ->options(function () {
                        return \App\Models\User::where('user_type', 'D')
                            ->get()
                            ->mapWithKeys(function ($user) {
                                return [$user->id => "{$user->full_name}"]; 
                            });
                    }),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('name')
                    ->sortable()
                    ->searchable(),
                Tables\Columns\TextColumn::make('start_date')
                    ->date()
                    ->sortable(),
                Tables\Columns\TextColumn::make('end_date')
                    ->date()
                    ->sortable(),
                Tables\Columns\TextColumn::make('description')
                    ->limit(50),
                Tables\Columns\TextColumn::make('creator.full_name')
                    ->label('Creator')
                    ->sortable()
                    ->searchable(),
            ])
            ->filters([
                // Add any filters if needed
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
            // Define any relations if needed
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListAcademicPeriods::route('/'),
            'create' => Pages\CreateAcademicPeriod::route('/create'),
            'edit' => Pages\EditAcademicPeriod::route('/{record}/edit'),
        ];
    }
}
