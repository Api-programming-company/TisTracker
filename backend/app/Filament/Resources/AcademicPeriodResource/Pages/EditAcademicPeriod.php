<?php

namespace App\Filament\Resources\AcademicPeriodResource\Pages;

use App\Filament\Resources\AcademicPeriodResource;
use Filament\Pages\Actions;
use Filament\Resources\Pages\EditRecord;

class EditAcademicPeriod extends EditRecord
{
    protected static string $resource = AcademicPeriodResource::class;

    protected function getActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
