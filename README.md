
# 🛍️ Frontend Web Store

Una tienda online simple y funcional creada con HTML, CSS y JavaScript puro. Ideal como ejercicio de maquetado, consumo de APIs REST, diseño responsive y lógica de carrito local con persistencia.

---

## 📦 Funcionalidades

- ✅ Catálogo de productos dinámico usando [FakeStore API](https://fakestoreapi.com/)
- 🏷️ Filtro de productos destacados (Top 10 por rating)
- 🛒 Carrito de compras persistente con `localStorage`
- 🔍 Navegación por páginas: inicio, productos, carrito, contacto
- 🎯 Diseño responsive (mobile-first)
- 📌 Navbar fijo con contador de carrito
- 🌫️ Efecto translúcido en header al hacer scroll
- ⭐ Interacción fluida con botones: ver detalle, agregar al carrito

---

## 🚀 Estructura del proyecto

```
web-store/
├── index.html
├── productos.html
├── producto.html
├── carrito.html
├── contacto.html
├── css/
│   └── styles.css
├── js/
│   ├── store.js
│   ├── utils.js
│   └── detalle.js
└── data/
    └── productos.json (opcional)
```

---

## 🧪 Tecnologías usadas

- HTML5
- CSS3
- JavaScript ES6
- REST API externa
- `localStorage` (persistencia de carrito)
- VSC + REST Client (para pruebas de API)

---

## 🔧 Cómo usar

1. Cloná el repositorio:
   ```bash
   git clone https://github.com/tuusuario/web-store.git
   cd web-store
   ```

2. Abrí `index.html` con Live Server o desde tu navegador.

3. Explorá y probá las páginas. El carrito se guarda entre recargas gracias a `localStorage`.

---

## 🧠 Ideas para seguir expandiendo

- Autenticación de usuario (login/signup)
- Sistema de favoritos
- Backend real con Node.js o Firebase
- Integración de pagos simulados
- Panel de administración para agregar productos

---

## 👨‍💻 Autor

**Sergio Aguilar**  
Frontend + Backend Developer  
[LinkedIn](https://www.linkedin.com/in/sergioaguilarsoria/) – [Portfolio](#) – [Mail](mailto:infosergio2020@gmail.com)

---

## 📝 Licencia

Este proyecto es de uso libre para fines educativos y demostrativos. ¡Usalo como base y mejoralo!
