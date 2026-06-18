# Certamen 2 - CI/CD mathapi

Solucion preparada sobre la fuente `https://github.com/saferayar/mathapi`.

## Archivos agregados o ajustados

- `Dockerfile`: imagen oficial `node:22-alpine`, expone `3000` y arranca con `npm start`.
- `docker-compose.yml`: despliegue de la API con Docker Compose.
- `sonar-project.properties`: configuracion base para analisis SonarQube y cobertura Jest.
- `ci/jenkins/certamen2_qa.Jenkinsfile`: pipeline QA desde rama `qa`.
- `ci/jenkins/certamen2_prod.Jenkinsfile`: pipeline productivo desde rama `main`.
- `ci/sonarqube/QG_Certamen2.md`: condiciones del Quality Gate solicitado.

La infraestructura Jenkins + SonarQube + PostgreSQL queda en:

- `../base_sonar/docker-compose.yml`

La imagen Jenkins base queda en:

- `../jenkins/jenkins/Dockerfile`

## Pasos manuales obligatorios

Estas tareas requieren tu cuenta, credenciales o configuracion en interfaces web:

1. Crear un fork publico de `https://github.com/saferayar/mathapi`.
2. Reemplazar `TU_USUARIO` por tu usuario GitHub en:
   - `ci/jenkins/certamen2_qa.Jenkinsfile`
   - `ci/jenkins/certamen2_prod.Jenkinsfile`
3. Confirmar y subir los cambios a tu fork:

```bash
git checkout main
git add .
git commit -m "Add certamen2 CI/CD configuration"
git branch qa
git push origin main qa
```

4. Levantar la infraestructura desde la carpeta `base_sonar`:

```bash
docker compose up -d --build
```

5. Entrar a SonarQube en `http://localhost:9000`, crear un token y guardarlo.
6. En Jenkins `http://localhost:8080`, instalar/configurar:
   - SonarQube Scanner plugin.
   - Servidor SonarQube con nombre exacto `SonarQube`.
   - Credencial Secret Text con el token de SonarQube.
7. Configurar webhook en SonarQube hacia Jenkins:

```text
http://jenkins:8080/sonarqube-webhook/
```

8. Crear el Quality Gate `QG_Certamen2` con las condiciones listadas en `ci/sonarqube/QG_Certamen2.md` y dejarlo como predeterminado.
9. Crear dos jobs Pipeline en Jenkins:
   - `certamen2_qa`, usando `ci/jenkins/certamen2_qa.Jenkinsfile`.
   - `certamen2_prod`, usando `ci/jenkins/certamen2_prod.Jenkinsfile`.
10. Ejecutar ambos pipelines y guardar capturas para el PDF de entrega:
   - Build y Tests.
   - Dependency Check report.
   - SonarQube Analysis y Quality Gate.
   - Docker Build, Deploy y Logs.

## Comandos locales utiles

```bash
npm ci
npm test -- --coverage --runInBand
docker compose build
docker compose up -d
docker compose logs --no-color mathapi
docker compose down
```
