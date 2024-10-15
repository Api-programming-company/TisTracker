<?php

namespace App\Filament\Resources\AcademicPeriodEvaluationResource\Pages;

use App\Filament\Resources\AcademicPeriodEvaluationResource;
use Filament\Pages\Actions;
use Filament\Resources\Pages\ListRecords;

class ListAcademicPeriodEvaluations extends ListRecords
{
    protected static string $resource = AcademicPeriodEvaluationResource::class;

    protected function getActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
