<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Código de Verificación</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            color: #333;
            margin: 0;
            padding: 20px;
        }
        .container {
            max-width: 600px;
            margin: auto;
            background: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        h1 {
            font-size: 24px;
            color: #333;
            text-align: center;
        }
        p {
            font-size: 16px;
            line-height: 1.5;
        }
        .code {
            display: block;
            padding: 10px;
            font-size: 20px;
            font-weight: bold;
            color: #fff;
            background: #007bff;
            border-radius: 5px;
            text-align: center;
            margin: 20px auto; /* Centra el bloque con un margen superior e inferior */
            width: fit-content; /* Ajusta el ancho del bloque al contenido */
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Código de Verificación</h1>
        <p>Estimado/a usuario/a,</p>
        <p>Para completar el proceso de verificación, por favor utiliza el siguiente código:</p>
        <p class="code">{{ $code }}</p>
        <p>Si no has solicitado este código, por favor ignora este mensaje.</p>
        <p>Atentamente,</p>
        <p>El equipo de soporte</p>
    </div>
</body>
</html>
