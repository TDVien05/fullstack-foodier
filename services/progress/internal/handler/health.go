package handler

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type HealthHandler struct {
	ServiceName string
}

func (h HealthHandler) Register(router gin.IRoutes) {
	router.GET("/healthz", h.health)
	router.GET("/readyz", h.ready)
}

func (h HealthHandler) health(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"service": h.ServiceName, "status": "ok"})
}

func (h HealthHandler) ready(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"service": h.ServiceName, "status": "ready"})
}
