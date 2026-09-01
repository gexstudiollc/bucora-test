# Bucora Desktop App

App de escritorio que muestra https://bucora.app/ejemplo/ en una ventana nativa, con pantalla de "sin conexión" si falla la carga.

## Cómo generar el .dmg (Mac) y el .exe (Windows)

Esta app se compila automáticamente en la nube con GitHub Actions (no necesitás una Mac).

### Pasos:

1. Creá un repositorio nuevo en GitHub (puede ser privado).
2. Subí todo el contenido de esta carpeta a ese repositorio:

   ```bash
   cd bucora-app
   git init
   git add .
   git commit -m "Bucora desktop app"
   git branch -M main
   git remote add origin https://github.com/TU-USUARIO/TU-REPO.git
   git push -u origin main
   ```

3. Andá a la pestaña **Actions** de tu repositorio en GitHub. El workflow "Build Bucora Desktop App" se va a ejecutar solo.
4. Cuando termine (2-5 minutos), entrá al run terminado y bajá a **Artifacts**: ahí vas a encontrar dos zips, uno con el `.dmg` y otro con el `.exe`.

Si necesitás volver a generar los instaladores sin subir cambios nuevos, andá a Actions → "Build Bucora Desktop App" → **Run workflow**.

## Cambiar la URL o el nombre de la app

- URL: editar `APP_URL` en `src/main.js`.
- Nombre: editar `productName` en `package.json`.
- Ícono: reemplazar `build/icon.png` (idealmente 512x512 o más, cuadrado, fondo transparente o sólido).

## Nota sobre firma de código (code signing)

Estos instaladores se generan **sin firma digital**. Esto significa:
- En Windows, es posible que aparezca un aviso de "Editor desconocido" (SmartScreen) al abrir el instalador. El usuario puede darle a "Más información" → "Ejecutar de todas formas".
- En Mac, Gatekeeper puede bloquear la app la primera vez. Hay que hacer clic derecho → "Abrir" en vez de doble clic, o habilitarlo en Preferencias del Sistema → Seguridad.

Para eliminar estos avisos hace falta firmar la app con un certificado de desarrollador (Apple Developer Program ~$99/año, y un certificado de code signing de Windows). Si en algún momento querés dar ese paso, avisame y lo armamos.

## Probar localmente (opcional, requiere Node.js instalado)

```bash
npm install
npm start
```
