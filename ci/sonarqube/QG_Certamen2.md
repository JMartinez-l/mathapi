# QG_Certamen2

Crear en SonarQube un Quality Gate llamado `QG_Certamen2`, dejarlo como predeterminado y agregar estas condiciones:

| Metrica | Operador | Valor |
| --- | --- | --- |
| Blocker Issues | Mayor que | 0 |
| Bugs | Mayor que | 5 |
| Code Smells | Mayor que | 50 |
| Coverage | Menor que | 60 |
| Coverage on New Code | Menor que | 50 |
| Critical Issues | Mayor que | 10 |
| Duplicated Lines on New Code | Mayor que | 15% |
| Maintainability Rating | Peor que | C |
| Maintainability Rating on New Code | Peor que | B |
| Major Issues | Mayor que | 20 |
| New Blocker Issues | Mayor que | 0 |
| Reliability Rating | Peor que | C |
| Reliability Rating on New Code | Peor que | B |
| Security Rating | Peor que | C |
| Security Rating on New Code | Peor que | B |
