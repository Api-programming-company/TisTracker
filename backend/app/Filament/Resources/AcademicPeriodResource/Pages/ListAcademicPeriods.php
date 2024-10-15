<?php

namespace App\Filament\Resources\AcademicPeriodResource\Pages;

use App\Filament\Resources\AcademicPeriodResource;
use Filament\Pages\Actions;
use Filament\Resources\Pages\ListRecords;

class ListAcademicPeriods extends ListRecords
{
    protected static string $resource = AcademicPeriodResource::class;

    protected function getActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
