-- Tabla de **Usuarios** (usuarios)
CREATE TABLE usuarios (
    id_usuario INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,  -- Identificador único del usuario
    nombre VARCHAR(100) NOT NULL,                        -- Nombre completo del usuario
    email VARCHAR(100) UNIQUE NOT NULL,                  -- Correo electrónico del usuario
    rol ENUM('administrador', 'usuario') NOT NULL,  -- Rol del usuario
    contrasena VARCHAR(255) NOT NULL               -- Contraseña del usuario (almacenada de forma segura)
);

-- Tabla de **Salas** (salas)
CREATE TABLE salas (
    id_sala INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,     -- Identificador único de la sala
    nombre VARCHAR(100) NOT NULL,                        -- Nombre de la sala (por ejemplo, "Sala A")
    capacidad INT NOT NULL,                              -- Capacidad máxima de la sala x personas
    descripcion TEXT,                                    -- Descripción adicional sobre la sala
    estado ENUM('disponible', 'no disponible', 'mantenimiento') NOT NULL,  -- Estado de la sala
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP   -- Fecha de creación de la sala
);

-- Tabla de **Reservas** (reservas)
CREATE TABLE reservas (
    id_reserva INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT UNSIGNED NOT NULL,
    id_sala INT UNSIGNED NOT NULL,  -- Mantener como NOT NULL
    fecha_inicio DATETIME NOT NULL,
    fecha_fin DATETIME NOT NULL,
    estado ENUM('confirmada', 'pendiente', 'cancelada') NOT NULL,
    motivo_cancelacion TEXT,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) 
        ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (id_sala) REFERENCES salas(id_sala) 
        ON DELETE CASCADE ON UPDATE CASCADE  -- Cambiar a CASCADE o RESTRICT
);


-- Tabla de **Recursos de Salas** (recursos_salas)
CREATE TABLE recursos_salas (
    id_recurso INT UNSIGNED AUTO_INCREMENT PRIMARY KEY, -- Identificador único del recurso
    id_sala INT UNSIGNED NOT NULL,                     -- Sala a la que pertenece el recurso (relacionado con `salas`)
    nombre VARCHAR(100) NOT NULL,                      -- Nombre del recurso (ej. proyector, pizarra)
    descripcion TEXT,                                  -- Descripción del recurso
    FOREIGN KEY (id_sala) REFERENCES salas(id_sala) 
        ON DELETE CASCADE ON UPDATE CASCADE            -- Relación con la tabla de salas
);

-- Tabla de **Historial de Reservas** (historial_reservas)
CREATE TABLE historial_reservas (
    id_historial INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,  -- Identificador único del historial
    id_reserva INT UNSIGNED NOT NULL,                     -- Reserva a la que pertenece este historial
    accion ENUM('creación', 'modificación', 'cancelación') NOT NULL,  -- Tipo de acción realizada
    fecha_accion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,      -- Fecha en que se realizó la acción
    id_usuario INT UNSIGNED NOT NULL,                     -- Usuario que realizó la acción
    FOREIGN KEY (id_reserva) REFERENCES reservas(id_reserva) 
        ON DELETE CASCADE ON UPDATE CASCADE,               -- Relación con la tabla de reservas
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) 
        ON DELETE CASCADE ON UPDATE CASCADE               -- Cambiar a CASCADE o RESTRICT
);

