-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 20-01-2025 a las 23:05:14
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `corpomemo`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cargos`
--

CREATE TABLE `cargos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(20) NOT NULL,
  `status` enum('activo','inactivo') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `cargos`
--

INSERT INTO `cargos` (`id`, `nombre`, `status`) VALUES
(1, 'Coordinador', 'activo'),
(2, 'Gerente', 'activo'),
(3, 'Obrero', 'activo'),
(4, 'Analista', 'activo'),
(5, 'Secretaria', 'activo'),
(6, 'test', 'activo'),
(7, 'pruebaelimn', 'activo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `departamentos`
--

CREATE TABLE `departamentos` (
  `id` int(11) NOT NULL,
  `nombre_departamento` varchar(100) NOT NULL,
  `codigo_departamento` varchar(3) NOT NULL,
  `status` enum('activo','inactivo') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `departamentos`
--

INSERT INTO `departamentos` (`id`, `nombre_departamento`, `codigo_departamento`, `status`) VALUES
(1, 'Talento Humano', 'CTH', 'activo'),
(2, 'Gerencia Desarrollo Territorial', 'GDT', 'activo'),
(3, 'Gerencia Desarrollo Comunal', 'GDC', 'activo'),
(4, 'Gerencia Vivienda Y Urbanismo', 'GVU', 'activo'),
(5, 'Coordinacion Sistema y Tecnologia', 'CST', 'activo'),
(6, 'Oficina Gestion Administrativa', 'OGA', 'activo'),
(7, 'pruebaelimn', 'OCG', 'activo'),
(8, 'Oficina Planificacion Estrategica', 'OPE', 'activo'),
(9, 'Unidad de Bienes', 'UB', 'activo'),
(10, 'Gerencia de Finaciamiento', 'GF', 'activo'),
(11, 'Gerencia General', 'GG', 'activo'),
(12, 'Coordinacion Comunicacion Institucional', 'CCI', 'activo'),
(13, 'Presidencia ', 'P', 'activo'),
(14, 'Directorio', 'D', 'activo'),
(15, 'Oficina Atencion Ciudadana', 'OAC', 'activo'),
(16, 'Coordinacion Administracion y finanzas', 'CAF', 'activo'),
(17, 'Servicios Generales', 'SC', 'activo'),
(18, 'test', 'te', 'activo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `firmas`
--

CREATE TABLE `firmas` (
  `id` int(11) NOT NULL,
  `nombre` varchar(400) NOT NULL,
  `direccion` varchar(400) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `firmas`
--

INSERT INTO `firmas` (`id`, `nombre`, `direccion`) VALUES
(1, 'sinfirma.jpg', '../../../../assets/firmas/sinfirma.jpg'),
(2, 'admin.jpg', '../../../../assets/firmas/admin.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `memos`
--

CREATE TABLE `memos` (
  `id` int(11) NOT NULL,
  `codigo_memo` varchar(50) NOT NULL,
  `de` varchar(200) NOT NULL,
  `copia_para` varchar(11) NOT NULL,
  `asunto` varchar(500) NOT NULL,
  `contenido` text NOT NULL,
  `fecha` datetime NOT NULL,
  `fromDepartamento` int(11) NOT NULL,
  `toDepartamento` int(11) NOT NULL,
  `status` enum('ATENDIDO','EN PROCESO','SIN ATENDER') NOT NULL,
  `status_delete` enum('activo','inactivo') NOT NULL,
  `id_user` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `memos`
--

INSERT INTO `memos` (`id`, `codigo_memo`, `de`, `copia_para`, `asunto`, `contenido`, `fecha`, `fromDepartamento`, `toDepartamento`, `status`, `status_delete`, `id_user`) VALUES
(3, 'P- 001-2024', 'josue ramirez', '0', 'prueba', 'prueba', '2024-12-27 01:03:40', 13, 1, 'ATENDIDO', 'activo', 47),
(6, 'P-001-2025', 'josue ramirez', '0', 'asdasd', 'asdasd', '2025-01-02 21:59:46', 13, 18, 'EN PROCESO', 'activo', 47),
(7, 'CTH-001-2025', 'josue test', '0', 'prueba', 'jajashahaha', '2025-01-07 14:59:44', 1, 18, 'EN PROCESO', 'activo', 48),
(8, 'P-001-2025', 'josue ramirez', '0', 'prueba de cambio de estado ', 'esta es una prueba para verificar el cambio de estado con la vista ', '2025-01-07 17:36:37', 13, 1, 'EN PROCESO', 'activo', 47),
(9, 'P-001-2025', 'josue ramirez', '0', 'adasd', 'asdasd', '2025-01-11 18:10:32', 13, 18, 'SIN ATENDER', 'activo', 47),
(10, 'P-001-2025', 'josue ramirez', '0', 'sdfsdf', 'sdfsdf', '2025-01-11 18:12:17', 13, 18, 'SIN ATENDER', 'activo', 47),
(11, 'P-005-2025', 'josue ramirez', '0', 'asdasd', 'asdasdas', '2025-01-11 18:21:36', 13, 18, 'SIN ATENDER', 'activo', 47),
(12, 'P-006-2025', 'josue ramirez', '1', 'asdasd', 'eerrrasdasdasdas asdasd asd asd ', '2025-01-17 19:00:23', 13, 18, 'SIN ATENDER', 'activo', 47);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `role_name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`id`, `role_name`) VALUES
(1, 'admin'),
(2, 'normal');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `seg_nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `seg_apellido` varchar(50) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(32) NOT NULL,
  `correo` varchar(320) NOT NULL,
  `grado_academico` varchar(100) NOT NULL,
  `id_role` int(11) NOT NULL,
  `status` enum('activo','inactivo') NOT NULL,
  `id_firma` int(11) NOT NULL,
  `id_depart` int(11) NOT NULL,
  `id_cargo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `seg_nombre`, `apellido`, `seg_apellido`, `username`, `password`, `correo`, `grado_academico`, `id_role`, `status`, `id_firma`, `id_depart`, `id_cargo`) VALUES
(47, 'josue', 'samuel', 'ramirez', 'gomez', 'admin', '25d55ad283aa400af464c76d713c07ad', 'josue.ramirez2912@gmail.com', 'Ingeniero', 1, 'activo', 2, 13, 6),
(48, 'josue', 'sadasd', 'test', 'test', 'test', '25d55ad283aa400af464c76d713c07ad', 'testtest', '', 2, 'activo', 1, 1, 1),
(63, 'josue', 'samuel', 'ramirez', 'gomez ', 'prueba', '25d55ad283aa400af464c76d713c07ad', 'josue.ramirez2912@gmail.com', 'Ingeniero', 2, 'activo', 1, 18, 6),
(64, 'jasjdj', 'aksdasjkd', 'kaljaskldj', 'asdasd', 'prueba2', '25d55ad283aa400af464c76d713c07ad', 'asdasd', '', 2, 'activo', 1, 14, 2);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cargos`
--
ALTER TABLE `cargos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `departamentos`
--
ALTER TABLE `departamentos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `firmas`
--
ALTER TABLE `firmas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `memos`
--
ALTER TABLE `memos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_user` (`id_user`),
  ADD KEY `fromDepartamento` (`fromDepartamento`,`toDepartamento`),
  ADD KEY `toDepartamento` (`toDepartamento`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_role` (`id_role`),
  ADD KEY `id_depart` (`id_depart`),
  ADD KEY `id_cargo` (`id_cargo`),
  ADD KEY `id_firma` (`id_firma`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `cargos`
--
ALTER TABLE `cargos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `departamentos`
--
ALTER TABLE `departamentos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT de la tabla `firmas`
--
ALTER TABLE `firmas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `memos`
--
ALTER TABLE `memos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=65;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `memos`
--
ALTER TABLE `memos`
  ADD CONSTRAINT `memos_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `memos_ibfk_2` FOREIGN KEY (`fromDepartamento`) REFERENCES `departamentos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `memos_ibfk_3` FOREIGN KEY (`toDepartamento`) REFERENCES `departamentos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `cargos_cargo_id` FOREIGN KEY (`id_cargo`) REFERENCES `cargos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`id_role`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `usuarios_ibfk_5` FOREIGN KEY (`id_depart`) REFERENCES `departamentos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `usuarios_ibfk_6` FOREIGN KEY (`id_firma`) REFERENCES `firmas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
