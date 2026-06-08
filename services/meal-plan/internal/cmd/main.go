package main

import (
	"log"

	"github.com/foodier/app/services/meal-plan/internal/config"
	"github.com/foodier/app/services/meal-plan/internal/handler"
	"github.com/gin-gonic/gin"
)

func main() {
	cfg := config.Load()
	router := gin.New()
	router.Use(gin.Logger(), gin.Recovery())
	handler.HealthHandler{ServiceName: cfg.ServiceName}.Register(router)

	if err := router.Run(":" + cfg.Port); err != nil {
		log.Fatalf("start %s service: %v", cfg.ServiceName, err)
	}
}
