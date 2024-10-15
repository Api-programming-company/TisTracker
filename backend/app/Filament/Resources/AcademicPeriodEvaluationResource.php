<?php

namespace App\Filament\Resources;

use App\Filament\Resources\AcademicPeriodEvaluationResource\Pages;
use App\Models\AcademicPeriodEvaluation;
use App\Models\Evaluation; // Importar el modelo Evaluation
use App\Models\AcademicPeriod; // Importar el modelo AcademicPeriod
use Filament\Forms;
use Filament\Resources\Form;
use Filament\Resources\Resource;
use Filament\Resources\Table;
use Filament\Tables;

class AcademicPeriodEvaluationResource extends Resource
{
    protected static ?string $model = AcademicPeriodEvaluation::class;

    protected static ?string $navigationIcon = 'heroicon-o-collection';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Select::make('evaluation_id')
                    ->relationship('evaluation', 'title') // Cambia 'name' por el atributo que quieres mostrar
                    ->required(),
                Forms\Components\Select::make('academic_period_id')
                    ->relationship('academicPeriod', 'name') // Cambia 'name' por el atributo que quieres mostrar
                    ->required(),
                Forms\Components\Select::make('evaluation_type')
                    ->options([
                        'A' => 'Self evaluation',
                        'C' => 'Company',
                        'U' => 'User',
                    ])
                    ->required(),
                Forms\Components\DatePicker::make('start_date')
                    ->required(),
                Forms\Components\DatePicker::make('end_date')
                    ->required(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('evaluation.title') // Cambia 'name' por el atributo que quieres mostrar
                    ->label('Evaluation')
                    ->sortable()
                    ->searchable(),
                Tables\Columns\TextColumn::make('academicPeriod.name') // Cambia 'name' por el atributo que quieres mostrar
                    ->label('Academic Period')
                    ->sortable()
                    ->searchable(),
                Tables\Columns\TextColumn::make('evaluation_type')
                    ->formatStateUsing(fn ($state) => match ($state) {
                        'A' => 'Self evaluation',
                        'C' => 'Company',
                        'U' => 'User',
                        default => 'Unknown',
                    })
                    ->sortable(),
                Tables\Columns\TextColumn::make('start_date')
                    ->date()
                    ->sortable(),
                Tables\Columns\TextColumn::make('end_date')
                    ->date()
                    ->sortable(),
            ])
            ->filters([
                // Puedes agregar filtros si lo deseas
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
            'index' => Pages\ListAcademicPeriodEvaluations::route('/'),
            'create' => Pages\CreateAcademicPeriodEvaluation::route('/create'),
            'edit' => Pages\EditAcademicPeriodEvaluation::route('/{record}/edit'),
        ];
    }
}
