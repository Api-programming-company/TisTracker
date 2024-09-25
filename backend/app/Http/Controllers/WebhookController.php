<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Symfony\Component\Process\Process;
use Symfony\Component\Process\Exception\ProcessFailedException;


class WebhookController extends Controller
{
    public function handle(Request $request)
    {
        // Verifica que el evento sea un push
        $payload = json_decode($request->getContent(), true);

        if (isset($payload['ref']) && $payload['ref'] === 'refs/heads/deployment') {
            // Ejecutar el git pull y cambiar permisos
            try {
                // Directorio de tu aplicación
                $path = '/home/ubuntu/TIS';

                // Ejecutar el pull
                $process = new Process(['git', 'pull'], $path);
                $process->run();

                if (!$process->isSuccessful()) {
                    throw new ProcessFailedException($process);
                }

                // Cambiar los permisos de los archivos si es necesario
                $process = new Process(['chmod', '-R', '755', $path]);
                $process->run();

                if (!$process->isSuccessful()) {
                    throw new ProcessFailedException($process);
                }

                return response('Pull y permisos actualizados.', 200);
            } catch (\Exception $e) {
                return response('Error: ' . $e->getMessage(), 500);
            }
        }

        return response('No es la rama correcta.', 400);
    }
}
