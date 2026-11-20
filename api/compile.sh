#!/bin/bash
echo "========================================"
echo "MesaYa - Spring Boot Build Script"
echo "========================================"
echo ""
echo "Limpiando y compilando..."
mvn clean package -DskipTests
echo ""
echo "✓ Build completado!"
echo "✓ JAR generado en: target/mesaya-0.0.1-SNAPSHOT.jar"
echo ""
echo "Para ejecutar:"
echo "  java -jar target/mesaya-0.0.1-SNAPSHOT.jar"
echo ""
