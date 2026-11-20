# MesaYa - Dashboard de Gestión de Restaurantes

Dashboard operativo para restaurantes. Gestión de menú, mesas, clientes y pedidos.

## Stack Tecnológico

- **Backend**: Spring Boot 3.2.5 (Java 17)
- **Base de Datos**: SQLite (mediante Hibernate ORM)
- **Frontend**: Angular 18 (standalone components, Atomic Design)
- **Seguridad**: BCrypt para hash de contraseñas

## Instalación y Ejecución

### Backend

```bash
cd mesaya
mvn clean package -DskipTests
java -jar target/mesaya-0.0.1-SNAPSHOT.jar
```

API disponible en `http://localhost:9000/api`

### Frontend (próximamente)

```bash
cd mesaya-view
npm install
ng serve
```

Aplicación disponible en `http://localhost:4200`

## Estructura del Proyecto - Backend

```
mesaya/
├── src/main/java/com/mesaya/
│   ├── entity/          ← 6 entidades JPA (Mesa, Cliente, Usuario, Producto, Pedido, DetallePedido)
│   ├── repository/      ← 6 repositorios Spring Data JPA
│   ├── config/          ← Configuración (CORS, Security, etc.)
│   ├── exception/       ← Manejo global de excepciones
│   ├── auth/            ← Módulo de autenticación
│   ├── producto/        ← Módulo de productos
│   ├── mesa/            ← Módulo de mesas
│   ├── cliente/         ← Módulo de clientes
│   ├── pedido/          ← Módulo de pedidos (más complejo)
│   └── dashboard/       ← Módulo de dashboard
├── src/main/resources/
│   ├── application.properties
│   └── application-dev.properties
└── pom.xml
```

## Endpoints API

### Auth
- `POST /api/auth/registro` - Registrar usuario
- `POST /api/auth/login` - Iniciar sesión

### Productos
- `GET /api/productos` - Listar (con filtros: categoria, disponible)
- `GET /api/productos/{id}` - Obtener
- `POST /api/productos` - Crear
- `PUT /api/productos/{id}` - Actualizar
- `DELETE /api/productos/{id}` - Eliminar

### Mesas
- `GET /api/mesas` - Listar (con filtro: estado)
- `GET /api/mesas/{id}` - Obtener
- `POST /api/mesas` - Crear
- `PUT /api/mesas/{id}` - Actualizar
- `DELETE /api/mesas/{id}` - Eliminar

### Clientes
- `GET /api/clientes` - Listar (con búsqueda: busqueda)
- `GET /api/clientes/{id}` - Obtener
- `POST /api/clientes` - Crear
- `PUT /api/clientes/{id}` - Actualizar
- `DELETE /api/clientes/{id}` - Eliminar

### Pedidos
- `GET /api/pedidos` - Listar (con filtro: estado)
- `GET /api/pedidos/{id}` - Obtener detalle
- `POST /api/pedidos` - Crear
- `DELETE /api/pedidos/{id}` - Eliminar
- `PATCH /api/pedidos/{id}/estado` - Avanzar estado
- `POST /api/pedidos/{id}/detalles` - Agregar producto
- `DELETE /api/pedidos/{id}/detalles/{detalleId}` - Quitar producto

### Dashboard
- `GET /api/dashboard/resumen` - Estadísticas principales

## Arquitectura

### Model View Controller (MVC)
- **Model**: Entidades JPA en `entity/`
- **View**: Frontend Angular (próximamente)
- **Controller**: REST controllers en cada módulo

### Patrones de Diseño
- **Service + Repository**: Separación de capas
- **DTO (Data Transfer Objects)**: Request/Response bien tipados
- **Interfaces (I-prefijo)**: Inyección de dependencias
- **Global Exception Handler**: Manejo centralizado de errores

### Estados de Pedido (Máquina de Estados)
```
CREADA → EN_PREPARACION → ENTREGADA
```

### Estados de Mesa
```
DISPONIBLE ↔ OCUPADA
```

## Base de Datos

SQLite con esquema automático. La BD se crea en `mesaya.db` en el directorio de ejecución.

### Entidades
1. **Usuario** - Credenciales de sistema
2. **Mesa** - Mesas del restaurante
3. **Cliente** - Clientes registrados
4. **Producto** - Menú disponible
5. **Pedido** - Órdenes (relación central)
6. **DetallePedido** - Ítems de cada pedido

## Flujo de Negocio Principal

1. Usuario se autentica (login/registro)
2. Sistema obtiene resumen del dashboard
3. Usuario crea un pedido:
   - Selecciona mesa (pasa a OCUPADA)
   - Agrega cliente (opcional)
   - Selecciona productos
4. Pedido fluye por estados: CREADA → EN_PREPARACION → ENTREGADA
5. Al entregar → Mesa vuelve a DISPONIBLE

## Testing

Utiliza Postman o similar para probar los endpoints:

1. Registrar usuario
2. Login con credenciales
3. Crear productos
4. Crear mesas
5. Crear pedidos
6. Probar flujos completos

## Notas Desarrollador

- Todos los servicios son `@Transactional` para consistencia
- Validación automática con `@Valid` y anotaciones Jakarta Validation
- CORS configurado para `localhost:4200`
- BCrypt para seguridad de contraseñas
- Hibernate DDL en modo `update` (crea tablas automáticamente)

---

**Institución**: Universidad El Bosque  
**Curso**: DSI3 (Desarrollo de Sistemas de Información)  
**Año**: 2026
