<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Verificación de Correo Electrónico</title>
</head>
<body>
    <h1>Hola, {{ $user->first_name }}!</h1>
    <p>Por favor, verifica tu dirección de correo electrónico haciendo clic en el siguiente enlace:</p>
    <a href="{{ $url }}">Verificar Correo Electrónico</a>
    <p>Este enlace expira en 15 minutos.</p>
</body>
</html>
